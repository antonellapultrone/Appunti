import pool from "../config/conection.js";

export const getAllReservas = async () => {
    const [rows] = await pool.query('SELECT * FROM reservas');
    return rows;
};
export const getReservaById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM reservas WHERE id = ?', [id]);
    return rows[0];
};
export const getAllReservasByUserId = async (id) => {
    const [rows] = await pool.query('SELECT * FROM reservas WHERE usuario_ID = ?', [id]);
    return rows;
};

export const createReserva = async (data) => {
    const {fecha_reserva, hora_inicio, duracion, pago_total, estado, usuario_ID,servicio_ID} = data;
    
    const [result] = await pool.query(
        "INSERT INTO reservas (fecha_reserva, hora_inicio, duracion, pago_total, estado, usuario_ID, servicio_ID) VALUES(?, ?, ?, ?, ?, ? , ?)",
        [fecha_reserva, hora_inicio, duracion, pago_total, estado, usuario_ID, servicio_ID]
    );
    console.log("Reserva Registrada Correctamente");
    return result.insertId;
};

export const updateReserva = async (id,data) => {
    const {fecha_reserva, hora_inicio, duracion,pago_total, estado, usuario_ID,servicio_ID} = data;
    await pool.query('UPDATE reservas SET fecha_reserva = ?, hora_inicio = ?, duracion = ? , pago_total = ?, estado = ?, usuario_ID = ?, servicio_ID = ? WHERE ID = ?', [fecha_reserva, hora_inicio, duracion,pago_total, estado, usuario_ID, servicio_ID, id]);
};

export const deleteReserva = async (id) => {
    await pool.query('DELETE FROM reservas WHERE id = ?', [id]);
};