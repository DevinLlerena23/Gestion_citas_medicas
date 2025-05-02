"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateAppointment = void 0;
const express_validator_1 = require("express-validator");
exports.validateAppointment = [
    (0, express_validator_1.body)('patientName').notEmpty().withMessage('El nombre del paciente es obligatorio'),
    (0, express_validator_1.body)('doctorName').notEmpty().withMessage('El nombre del doctor es obligatorio'),
    (0, express_validator_1.body)('appointmentDate').notEmpty().withMessage('La fecha de la cita es obligatoria'),
    (0, express_validator_1.body)('reason').notEmpty().withMessage('El motivo es obligatorio'),
    (0, express_validator_1.body)('status').isIn(['pendiente', 'confirmada', 'cancelada']).withMessage('Estado inválido')
];
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
