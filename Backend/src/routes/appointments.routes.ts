import { Router, RequestHandler } from 'express';
import { body } from 'express-validator';
import {
  getAppointments,
  getAppointment, 
  createAppointment,
  updateAppointment,
  deleteAppointment,
  updateStatus
} from '../controllers/appointments.controller';
import { validateAppointment } from '../validators/appointment.validator';

const router = Router();

router.get('/', getAppointments as RequestHandler);
router.get('/:id', getAppointment as RequestHandler);
router.post('/', validateAppointment, createAppointment as RequestHandler);
router.put('/:id', validateAppointment, updateAppointment as RequestHandler);
router.delete('/:id', deleteAppointment as RequestHandler);
router.patch('/:id/status', body('status').isIn(['pendiente', 'confirmada', 'cancelada']), updateStatus as RequestHandler);

export default router;