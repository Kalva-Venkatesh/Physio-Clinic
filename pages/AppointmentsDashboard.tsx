import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Appointment, AppointmentStatus } from '../types';
import { getUserAppointments, cancelAppointment, submitReview } from '../services/api';
import FeedbackModal from '../components/FeedbackModal';

const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
        case AppointmentStatus.UPCOMING: return 'bg-blue-100 text-blue-800';
        case AppointmentStatus.COMPLETED: return 'bg-green-100 text-green-800';
        case AppointmentStatus.CANCELLED: return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

const AppointmentCard: React.FC<{ 
    appointment: Appointment, 
    onCancel: (id: string) => void,
    onReview: (id: string) => void,
}> = ({ appointment, onCancel, onReview }) => (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg">{appointment.service}</h3>
                    <p className="text-sm text-gray-500">{appointment.type}</p>
                     {appointment.type === 'Home Visit' && <p className="text-sm text-gray-500">{appointment.address}</p>}
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                </span>
            </div>
            <div className="mt-4 border-t pt-4 text-sm">
                <p><strong>Date:</strong> {new Date(appointment.date + 'T00:00:00').toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
            </div>
            {appointment.status === AppointmentStatus.UPCOMING && appointment.doctorArrivalDelay && (
                <div className="mt-2 text-sm bg-yellow-100 text-yellow-800 p-2 rounded-md">
                    <strong>Update:</strong> Doctor is delayed by approximately {appointment.doctorArrivalDelay}.
                </div>
            )}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
            {appointment.status === AppointmentStatus.UPCOMING && (
                <button 
                    onClick={() => onCancel(appointment._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-xs">
                    Cancel
                </button>
            )}
            {appointment.status === AppointmentStatus.COMPLETED && (
                 <button 
                    onClick={() => onReview(appointment._id)}
                    className="bg-teal-500 text-white px-3 py-1 rounded-md hover:bg-teal-600 text-xs">
                    Leave a Review
                </button>
            )}
        </div>
    </div>
);

const AppointmentsDashboard: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<AppointmentStatus | 'all'>('all');
  const [error, setError] = useState('');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  // We don't need to store the whole appointment, just the ID
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);

  const fetchAppointments = async () => {
    if (user) {
      setLoading(true);
      setError('');
      try {
        const userAppointments = await getUserAppointments();
        setAppointments(userAppointments.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (err) {
        setError('Failed to load appointments.');
      } finally {
        setLoading(false);
      }
    }
  }
  
  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const handleCancel = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
        try {
            await cancelAppointment(id);
            fetchAppointments(); // Refetch appointments to update the list
        } catch (err) {
            setError('Failed to cancel appointment.');
        }
    }
  }

  const handleOpenReviewModal = (id: string) => {
    setSelectedAppointmentId(id);
    setIsFeedbackModalOpen(true);
  }

  const handleFeedbackSubmit = async (rating: number, comment: string) => {
    if (!selectedAppointmentId) return;
    try {
        await submitReview(rating, comment);
        // Maybe add a success message in the future
    } catch (err) {
        throw err; // Propagate error to modal
    }
  }

  const filteredAppointments = appointments.filter(appt => filter === 'all' || appt.status === filter);

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">My Appointments</h1>
        <p className="text-gray-600 mb-6">Welcome back, {user?.name}! Here's a list of your appointments.</p>
        
        <div className="flex space-x-2 mb-6">
          <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>All</button>
          <button onClick={() => setFilter(AppointmentStatus.UPCOMING)} className={`px-3 py-1 rounded-full text-sm ${filter === AppointmentStatus.UPCOMING ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>Upcoming</button>
          <button onClick={() => setFilter(AppointmentStatus.COMPLETED)} className={`px-3 py-1 rounded-full text-sm ${filter === AppointmentStatus.COMPLETED ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>Completed</button>
          <button onClick={() => setFilter(AppointmentStatus.CANCELLED)} className={`px-3 py-1 rounded-full text-sm ${filter === AppointmentStatus.CANCELLED ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>Cancelled</button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <p>Loading appointments...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(appt => 
                <AppointmentCard 
                  key={appt._id} 
                  appointment={appt} 
                  onCancel={handleCancel}
                  onReview={handleOpenReviewModal}
                />
              )
            ) : (
              <p>No {filter !== 'all' ? filter.toLowerCase() : ''} appointments found.</p>
            )}
          </div>
        )}
      </div>
      {isFeedbackModalOpen && (
        <FeedbackModal 
            onClose={() => setIsFeedbackModalOpen(false)}
            onSubmit={handleFeedbackSubmit}
        />
      )}
    </>
  );
};

export default AppointmentsDashboard;