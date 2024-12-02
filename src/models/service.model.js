import pool from "../config/conection.js";
export const getAllService = async () => {
    try {
        // Obtener todos los servicios
        const [servicios] = await pool.query(`SELECT * FROM servicios`);

        // Mapear los servicios para incluir imágenes y horarios
        const serviciosConDetalles = await Promise.all(
            servicios.map(async (servicio) => {
                const [imagenes] = await pool.query(`SELECT * FROM imagenes WHERE servicio_ID = ?`, [servicio.ID]);
                const [horarios] = await pool.query(`SELECT * FROM horarios WHERE servicio_ID = ?`, [servicio.ID]);

                return {
                    ...servicio,
                    imagenes,
                    horarios
                };
            })
        );

        return serviciosConDetalles;
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

        // Obtener los horarios del servicio
        const [horarios] = await pool.query(`SELECT * FROM horarios WHERE servicio_ID = ?`, [id]);

        return {
            ...servicio[0],
            imagenes,
            horarios
        };
    } catch (error) {
        throw new Error("Error al obtener el servicio: " + error.message);
    }
};

export const createService = async (dataService) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Insertar el servicio
        const { nombre, precio, descripcion, categoria, direccion, ciudad, telefono, estado, usuario_ID } = dataService;
        const [result] = await connection.query(
            `INSERT INTO servicios (nombre, precio, descripcion, categoria, direccion, ciudad, telefono, estado, usuario_ID) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, precio, descripcion, categoria, direccion, ciudad, telefono, estado, usuario_ID]
        );
        const servicio_ID = result.insertId;

        // Insertar imágenes
        if (dataService.imagenes) {
            for (const imagen of dataService.imagenes) {
                await connection.query(
                    `INSERT INTO imagenes (url, descripcion, servicio_ID) VALUES (?, ?, ?)`,
                    [imagen.url, imagen.descripcion, servicio_ID]
                );
            }
        }

        // Insertar horarios
        if (dataService.horarios) {
            for (const horario of dataService.horarios) {
                await connection.query(
                    `INSERT INTO horarios (dia_semana, hora_inicio, hora_fin, servicio_ID) VALUES (?, ?, ?, ?)`,
                    [horario.dia_semana, horario.hora_inicio, horario.hora_fin, servicio_ID]
                );
            }
        }

        await connection.commit();
        return servicio_ID;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

export const updateService = async (id, dataService) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Actualizar servicio
        const { nombre, precio, descripcion, categoria, direccion, ciudad, telefono, estado } = dataService;
        await connection.query(
            `UPDATE servicios SET nombre = ?, precio = ?, descripcion = ?, categoria = ?, direccion = ?, ciudad = ?, telefono = ?, estado = ? 
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