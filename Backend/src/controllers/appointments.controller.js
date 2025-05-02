"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointment = exports.updateStatus = exports.deleteAppointment = exports.updateAppointment = exports.createAppointment = exports.getAppointments = void 0;
const db_1 = require("../database/db");
const getAppointments = (_req, res) => {
    const appointments = db_1.db.prepare('SELECT * FROM appointments').all();
    res.json(appointments);
};
exports.getAppointments = getAppointments;
const createAppointment = (req, res) => {
    const { patientName, doctorName, appointmentDate, reason, status } = req.body;
    const createdAt = new Date().toISOString();
    const stmt = db_1.db.prepare(`INSERT INTO appointments 
    (patientName, doctorName, appointmentDate, reason, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)`);
    const result = stmt.run(patientName, doctorName, appointmentDate, reason, status, createdAt);
    const newAppointment = { id: result.lastInsertRowid, patientName, doctorName, appointmentDate, reason, status, createdAt };
    res.status(201).json(newAppointment);
};
exports.createAppointment = createAppointment;
const updateAppointment = (req, res) => {
    const { id } = req.params;
    const { patientName, doctorName, appointmentDate, reason, status } = req.body;
    const stmt = db_1.db.prepare(`UPDATE appointments SET patientName=?, doctorName=?, appointmentDate=?, reason=?, status=? WHERE id=?`);
    stmt.run(patientName, doctorName, appointmentDate, reason, status, id);
    res.json({ message: 'Cita actualizada correctamente' });
};
exports.updateAppointment = updateAppointment;
const deleteAppointment = (req, res) => {
    const { id } = req.params;
    db_1.db.prepare('DELETE FROM appointments WHERE id=?').run(id);
    res.json({ message: 'Cita eliminada' });
};
exports.deleteAppointment = deleteAppointment;
const updateStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db_1.db.prepare('UPDATE appointments SET status=? WHERE id=?').run(status, id);
    res.json({ message: 'Estado actualizado' });
};
exports.updateStatus = updateStatus;
const getAppointment = (req, res) => {
    const { id } = req.params;
    const stmt = db_1.db.prepare('SELECT * FROM appointments WHERE id = ?');
    const appointment = stmt.get(id);
    if (!appointment) {
        return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.json(appointment);
};
exports.getAppointment = getAppointment;
