import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import { 
  ArrowBack as BackIcon,
  Person as PersonIcon,
  MedicalServices as DoctorIcon,
  AccessTime as TimeIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { getAppointment } from '../services/api';
import { Appointment } from '../types/appointment';


const statusColors = {
  pendiente: 'warning',
  confirmada: 'success',
  cancelada: 'error'
};


const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Fecha inválida';
    
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'     
    });
  } catch {
    return 'Fecha inválida';
  }
};

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        setError(null);
        
      
        if (!id || isNaN(Number(id))) {
          setError('ID de cita inválido');
          return;
        }

        const appointmentData = await getAppointment(Number(id));
        
       
        if (!appointmentData || 
            !appointmentData.id || 
            !appointmentData.patientName || 
            !appointmentData.doctorName || 
            !appointmentData.appointmentDate || 
            !appointmentData.status) {
          setError('Datos de la cita incompletos o inválidos');
          return;
        }
        
        setAppointment(appointmentData);
      } catch (error) {
        console.error('Error fetching appointment:', error);
        setError(error instanceof Error ? error.message : 'Error al cargar la cita');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  
  if (error || !appointment) {
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
        <Card elevation={3}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom>
              {error || 'No se pudo cargar la cita'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {id ? `ID de cita: ${id}` : 'No se proporcionó ID de cita'}
            </Typography>
            <Button
              variant="contained"
              startIcon={<BackIcon />}
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Volver al listado
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

 
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Button 
        startIcon={<BackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Volver
      </Button>

      <Card elevation={3}>
        <CardContent>
      
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}>
            <Typography variant="h4" component="h1">
              Detalles de la Cita
            </Typography>
            <Chip 
              label={appointment.status.toUpperCase()} 
              color={statusColors[appointment.status as keyof typeof statusColors]} 
              sx={{ fontWeight: 'bold' }}
            />
          </Box>

          <Stack spacing={3}>
        
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventIcon color="primary" /> Información General
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                <TimeIcon color="action" />
                <Typography>
                  <strong>Fecha:</strong> {formatDate(appointment.appointmentDate)}
                </Typography>
              </Box>
              <Typography sx={{ mt: 2 }}>
                <strong>Motivo:</strong> {appointment.reason || 'No especificado'}
              </Typography>
            </Box>

            <Divider />

          
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Paciente
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                  <PersonIcon fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="h6">{appointment.patientName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID de cita: {appointment.id}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Médico
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56 }}>
                  <DoctorIcon fontSize="large" />
                </Avatar>
                <Typography variant="h6">{appointment.doctorName}</Typography>
              </Box>
            </Box>

          
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
              <Button 
                variant="outlined"
                onClick={() => navigate('/')}
              >
                Volver al listado
              </Button>
            
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}