import { body, ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateAppointment: ValidationChain[] = [
  body('patientName').notEmpty().withMessage('El nombre del paciente es obligatorio'),
  body('doctorName').notEmpty().withMessage('El nombre del doctor es obligatorio'),
  body('appointmentDate').notEmpty().withMessage('La fecha de la cita es obligatoria'),
  body('reason').notEmpty().withMessage('El motivo es obligatorio'),
  body('status').isIn(['pendiente', 'confirmada', 'cancelada']).withMessage('Estado inválido')
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
