import { useEffect, useState } from 'react';
import { 
  Box,
  Typography,
  Chip,
  IconButton,
  CircularProgress,
  Button,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar
} from '@mui/material';
import { 
  Person as PersonIcon,
  MedicalServices as DoctorIcon,
  AccessTime as TimeIcon,
  EventNote as EmptyIcon,
  MoreVert as MoreIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom'; 
import { getAppointments, deleteAppointment, updateStatus } from '../services/api';
import { Appointment, AppointmentStatus } from '../types/appointment';

const statusColors: Record<AppointmentStatus, 'warning' | 'success' | 'error'> = {
  pendiente: 'warning',
  confirmada: 'success',
  cancelada: 'error'
};

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Fecha inválida';
    
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return 'Fecha inválida';
  }
};

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await getAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deleteAppointment(id);
      await loadAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handleStatusChange = async (status: AppointmentStatus): Promise<void> => {
    if (!selectedAppointment) return;
    
    try {
      await updateStatus(selectedAppointment, status);
      await loadAppointments();
      handleCloseMenu();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: number) => {
    event.stopPropagation(); 
    setAnchorEl(event.currentTarget);
    setSelectedAppointment(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedAppointment(null);
  };

  const handleRowClick = (id: number) => {
    navigate(`/appointments/${id}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {appointments.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: '50vh',
          textAlign: 'center'
        }}>
          <EmptyIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No hay citas programadas
          </Typography>
          <Button 
            variant="contained" 
            component={Link} 
            to="/create"
            startIcon={<EditIcon />}
            size="medium"
          >
            Crear Nueva Cita
          </Button>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="lista de citas">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Paciente</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Médico</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Motivo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((app) => (
                <TableRow
                  key={app.id}
                  hover
                  onClick={() => handleRowClick(app.id)} 
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer', 
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ 
                        bgcolor: 'primary.light', 
                        width: 32, 
                        height: 32 
                      }}>
                        <PersonIcon sx={{ color: 'primary.contrastText', fontSize: '1rem' }} />
                      </Avatar>
                      {app.patientName}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ 
                        bgcolor: 'secondary.light', 
                        width: 32, 
                        height: 32 
                      }}>
                        <DoctorIcon sx={{ color: 'secondary.contrastText', fontSize: '1rem' }} />
                      </Avatar>
                      {app.doctorName}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <TimeIcon color="action" fontSize="small" />
                      {formatDate(app.appointmentDate)}
                    </Box>
                  </TableCell>
                  <TableCell>{app.reason}</TableCell>
                  <TableCell>
                    <Chip 
                      label={app.status.toUpperCase()} 
                      color={statusColors[app.status]} 
                      size="small"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </TableCell>
                  <TableCell align="right" onClick={(e) => e.stopPropagation()}> 
                    <IconButton 
                      size="small"
                      onClick={(e) => handleOpenMenu(e, app.id)}
                    >
                      <MoreIcon />
                    </IconButton>
                    <IconButton 
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(app.id);
                      }}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Menú de estado */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {selectedAppointment && appointments.find(a => a.id === selectedAppointment)?.status !== 'confirmada' && (
          <MenuItem onClick={() => handleStatusChange('confirmada')} dense>
            <Typography variant="body2">Confirmar</Typography>
          </MenuItem>
        )}
        {selectedAppointment && appointments.find(a => a.id === selectedAppointment)?.status !== 'cancelada' && (
          <MenuItem onClick={() => handleStatusChange('cancelada')} dense>
            <Typography variant="body2">Cancelar</Typography>
          </MenuItem>
        )}
        {selectedAppointment && appointments.find(a => a.id === selectedAppointment)?.status !== 'pendiente' && (
          <MenuItem onClick={() => handleStatusChange('pendiente')} dense>
            <Typography variant="body2">Poner como Pendiente</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}