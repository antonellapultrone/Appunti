import pool from "../config/conection.js";

export const getAllService = async () => {
    try {
        // Obtener todos los servicios con sus imágenes
        const [servicios] = await pool.query(`
            SELECT s.*, 
                    (SELECT url FROM imagenes WHERE servicio_ID = s.ID LIMIT 1) as imagen_url 
            FROM servicios s;
        `);

        return servicios.map(servicio => ({
            ...servicio,
            imagenes: servicio.imagen_url ? [servicio.imagen_url] : []
        }));
    } catch (error) {
        throw new Error("Error al obtener los servicios: " + error.message);
    }
};

export const getServiceById = async (id) => {
    try {
        // Obtener los datos básicos del servicio
        const [servicio] = await pool.query(`SELECT * FROM servicios WHERE ID = ?`, [id]);

        if (servicio.length === 0) return null; // Si no existe el servicio

        // Obtener las imágenes del servicio
        const [imagenes] = await pool.query(`SELECT * FROM imagenes WHERE servicio_ID = ?`, [id]);


        return {
            ...servicio[0],
            imagenes
        };
    } catch (error) {
        throw new Error("Error al obtener el servicio: " + error.message);
    }
};

export const getServiceByCategory = async (categoria) => {
    try {
        // Obtener todos los servicios con sus imágenes
        const [servicios] = await pool.query(`
            SELECT s.*, 
                    (SELECT url FROM imagenes WHERE servicio_ID = s.ID LIMIT 1) as imagen_url 
            FROM servicios s WHERE categoria like ?;
        `, [categoria]);

        return servicios.map(servicio => ({
            ...servicio,
            imagenes: servicio.imagen_url ? [servicio.imagen_url] : []
        }));
    } catch (error) {
        throw new Error("Error al obtener los servicios: " + error.message);
    }
};


export const getServiceByNombreCategoriaCiudad = async (data) => {
    try {
        // Obtener los datos básicos del servicio
        const keywords = data.split(' ');
        const conditions = keywords.map(() => `nombre LIKE ? OR categoria LIKE ? OR ciudad LIKE ?`).join(' OR ');
        const params = keywords.flatMap(keyword => [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`]);

        const query = `SELECT * FROM servicios WHERE ${conditions}`;
        const [servicios] = await pool.query(query, params);

        if (servicios.length === 0) return null; // Si no existen servicios


        // Mapear los servicios para incluir imágenes y horarios
        const serviciosConDetalles = await Promise.all(
            servicios.map(async (servicio) => {
                const [imagenes] = await pool.query(`SELECT * FROM imagenes WHERE servicio_ID = ?`, [servicio.ID]);

                return {
                    ...servicio,
                    imagenes
                };
            })
        );
        return serviciosConDetalles;
    } catch (error) {
        throw new Error("Error al obtener el servicio: " + error.message);
    }
};

export const createService = async (dataService) => {
    try {
        // Iniciar transacción
        await pool.query('START TRANSACTION');

        // Insertar servicio
        const [serviceResult] = await pool.query(
            `INSERT INTO servicios 
            (nombre, precio, duracion_hora, descripcion, categoria, ubicacion, ciudad, telefono, dia_semana, hora_inicio, hora_fin, estado, usuario_ID) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                dataService.nombre, 
                dataService.precio, 
                dataService.duracion_hora,
                dataService.descripcion,
                dataService.categoria,
                dataService.ubicacion,
                dataService.ciudad,
                dataService.telefono,
                dataService.dia_semana,
                dataService.hora_inicio,
                dataService.hora_fin,
                true,
                dataService.usuario_ID
            ]
        );

        const serviceId = serviceResult.insertId;

        // Insertar imágenes con validación
        if (dataService.imagenes && dataService.imagenes.length > 0) {
            const validImages = dataService.imagenes.filter(imagen => 
                imagen.url && imagen.url.trim() !== ''
            );

            if (validImages.length > 0) {
                const imageInsertPromises = validImages.map(imagen => 
                    pool.query(
                        `INSERT INTO imagenes (url, descripcion, servicio_ID) VALUES (?, ?, ?)`,
                        [
                            imagen.url, 
                            imagen.descripcion || 'Imagen de servicio', 
                            serviceId  // Aquí se usa el ID del servicio recién creado
                        ]
                    )
                );

                await Promise.all(imageInsertPromises);
            } else {
                throw new Error('No hay imágenes válidas para subir');
            }
        } else {
            throw new Error('Debe subir al menos una imagen');
        }

        // Confirmar transacción
        await pool.query('COMMIT');

        return serviceId;
    } catch (error) {
        // Revertir transacción en caso de error
        await pool.query('ROLLBACK');
        console.error('Error en createService:', error);
        throw error;
    }
};

export const updateService = async (id, dataService) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Actualizar servicio
        const { nombre, precio, descripcion, categoria, direccion, ciudad, telefono, estado } = dataService;
        console.log(direccion);
        await connection.query(
            `UPDATE servicios SET nombre = ?, precio = ?, descripcion = ?, categoria = ?, ubicacion = ?, ciudad = ?, telefono = ?, estado = ? 
            WHERE ID = ?`,
            [nombre, precio, descripcion, categoria, direccion, ciudad, telefono, estado, id]
        );

        // Eliminar imágenes y horarios existentes
        await connection.query(`DELETE FROM imagenes WHERE servicio_ID = ?`, [id]);
        await connection.query(`DELETE FROM horarios WHERE servicio_ID = ?`, [id]);

        // Insertar nuevas imágenes
        if (dataService.imagenes) {
            for (const imagen of dataService.imagenes) {
                await connection.query(
                    `INSERT INTO imagenes (url, descripcion, servicio_ID) VALUES (?, ?, ?)`,
                    [imagen.url, imagen.descripcion, id]
                );
            }
        }

        // Insertar nuevos horarios
        if (dataService.horarios) {
            for (const horario of dataService.horarios) {
                await connection.query(
                    `INSERT INTO horarios (dia_semana, hora_inicio, hora_fin, servicio_ID) VALUES (?, ?, ?, ?)`,
                    [horario.dia_semana, horario.hora_inicio, horario.hora_fin, id]
                );
            }
        }

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

export const deleteService = async (id) => {
    await pool.query('DELETE FROM servicios WHERE id = ?', [id]);
};