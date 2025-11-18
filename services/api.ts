import { User, Appointment, Service, Review, AppointmentStatus, AppointmentType, AppointmentWithUser } from '../types';
import apiClient from './apiClient';

// --- LIVE API FUNCTIONS ---

// --- SERVICES ---
export const getServices = async (): Promise<Service[]> => {
  const { data } = await apiClient.get('/services');
  return data;
}

// --- APPOINTMENTS ---
export const getAvailableSlots = async (date: string): Promise<string[]> => {
  const { data } = await apiClient.get(`/appointments/slots?date=${date}`);
  return data;
};

export const bookAppointment = async (newAppointmentData: Omit<Appointment, '_id' | 'user' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Appointment> => {
    const { data } = await apiClient.post('/appointments', newAppointmentData);
    return data;
};

export const getUserAppointments = async (): Promise<Appointment[]> => {
    const { data } = await apiClient.get('/appointments');
    return data;
};

export const cancelAppointment = async (appointmentId: string): Promise<Appointment> => {
    const { data } = await apiClient.put(`/appointments/${appointmentId}`, {
        status: AppointmentStatus.CANCELLED
    });
    return data;
};

// --- FEEDBACK FUNCTIONS ---
export const getReviews = async (): Promise<Review[]> => {
    const { data } = await apiClient.get('/feedback');
    return data;
};

export const submitReview = async (rating: number, comment: string): Promise<Review> => {
    const { data } = await apiClient.post('/feedback', { rating, comment });
    return data;
}

// --- ADMIN FUNCTIONS ---
export const getAllAppointmentsForAdmin = async (): Promise<AppointmentWithUser[]> => {
    const { data } = await apiClient.get('/appointments/all');
    return data;
}

export const updateAppointmentByAdmin = async (
  appointmentId: string, 
  updateData: { status?: AppointmentStatus; doctorArrivalDelay?: string }
): Promise<AppointmentWithUser> => {
    const { data } = await apiClient.put(`/appointments/${appointmentId}`, updateData);
    return data;
};