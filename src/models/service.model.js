import pool from "../config/conection.js";
export const getAllService = async () => {
    const [rows] = await pool.query('SELECT * FROM servicios');
    return rows;
};


export const getServiceById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM servicios WHERE id = ?', [id]);
    return rows[0];
};

export const createService = async (dataService) => {
    const { nombre, precio, descripcion, categoria, direccion, ciudad, telefono, estado, usuario_ID } = dataService;
    const [result] = await pool.query(
        'INSERT INTO servicios (nombre, precio, descripcion, categoria, direccion, ciudad, telefono, estado, usuario_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, precio, descripcion, categoria, direccion, ciudad, telefono, estado, usuario_ID]
    );
    return result.insertId; // Devuelve el ID del nuevo servicio creado
};


export const updateService = async (id, dataService) => {
    const { nombre,precio,descripcion,categoria ,direccion,ciudad,telefono,estado,usuario_ID} = dataService;
    await pool.query('UPDATE servicios SET nombre = ?, precio = ?, descripcion = ?, categoria = ?, direccion = ?, ciudad = ?, telefono = ?,estado = ?, usuario_ID = ? WHERE ID = ?', [nombre,precio,descripcion,categoria ,direccion,ciudad,telefono,estado,usuario_ID,id]);
};

export const deleteService = async (id) => {
    await pool.query('DELETE FROM servicios WHERE id = ?', [id]);
};