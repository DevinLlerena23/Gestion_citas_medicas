import express from 'express';
import cors from 'cors';
import appointmentRoutes from './routes/appointments.routes';
import { connectDB } from './database/db';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/appointments', appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});