import React, { useState, useEffect } from 'react';
import { AppointmentWithUser, AppointmentStatus } from '../types';
import { getAllAppointmentsForAdmin, updateAppointmentByAdmin } from '../services/api';
import DelayUpdateModal from '../components/DelayUpdateModal';

const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
        case AppointmentStatus.UPCOMING: return 'bg-blue-100 text-blue-800';
        case AppointmentStatus.COMPLETED: return 'bg-green-100 text-green-800';
        case AppointmentStatus.CANCELLED: return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

const AdminDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for filters
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState<AppointmentStatus | 'all'>('all');

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentWithUser | null>(null);

  const fetchAllAppointments = async () => {
    try {
      setLoading(true);
      setError('');
      const allAppointments = await getAllAppointmentsForAdmin();
      setAppointments(allAppointments);
    } catch (err) {
      setError('Failed to fetch appointments. You may not have administrative rights.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAppointments();
  }, []);
  
  const handleStatusChange = async (appointmentId: string, status: AppointmentStatus) => {
    try {
        const updatedAppointment = await updateAppointmentByAdmin(appointmentId, { status });
        setAppointments(prev => 
            prev.map(appt => appt._id === appointmentId ? { ...appt, status: updatedAppointment.status } : appt)
        );
    } catch (err) {
        alert('Failed to update status.');
    }
  };
  
  const handleDelayUpdate = async (newDelay: string) => {
    if (!selectedAppointment) return;
    try {
        const updatedAppointment = await updateAppointmentByAdmin(selectedAppointment._id, { doctorArrivalDelay: newDelay });
        setAppointments(prev => 
            prev.map(appt => appt._id === selectedAppointment._id ? { ...appt, doctorArrivalDelay: updatedAppointment.doctorArrivalDelay } : appt)
        );
        setIsModalOpen(false);
        setSelectedAppointment(null);
    } catch (err) {
        alert('Failed to update delay.');
    }
  };

  const filteredAppointments = appointments.filter(appt => {
    // Defensively handle cases where a user might have been deleted but their appointments remain.
    if (!appt.user) {
      return false;
    }
    const nameMatch = appt.user.name.toLowerCase().includes(filterName.toLowerCase()) || appt.user.email.toLowerCase().includes(filterName.toLowerCase());
    const statusMatch = filterStatus === 'all' || appt.status === filterStatus;
    return nameMatch && statusMatch;
  });

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage all patient appointments.</p>
        </div>
        <button
          onClick={fetchAllAppointments}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-400"
        >
          {loading ? 'Refreshing...' : 'Refresh List'}
        </button>
      </div>
      
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input 
          type="text"
          placeholder="Search by patient name or email..."
          value={filterName}
          onChange={e => setFilterName(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
        />
        <div className="flex space-x-2">
            <button onClick={() => setFilterStatus('all')} className={`px-3 py-2 rounded-md text-sm font-medium ${filterStatus === 'all' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>All</button>
            <button onClick={() => setFilterStatus(AppointmentStatus.UPCOMING)} className={`px-3 py-2 rounded-md text-sm font-medium ${filterStatus === AppointmentStatus.UPCOMING ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Upcoming</button>
            <button onClick={() => setFilterStatus(AppointmentStatus.COMPLETED)} className={`px-3 py-2 rounded-md text-sm font-medium ${filterStatus === AppointmentStatus.COMPLETED ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Completed</button>
            <button onClick={() => setFilterStatus(AppointmentStatus.CANCELLED)} className={`px-3 py-2 rounded-md text-sm font-medium ${filterStatus === AppointmentStatus.CANCELLED ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Cancelled</button>
        </div>
      </div>

      {loading && <p>Loading all appointments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service & Date</th>
                <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{appt.user.name}</div>
                    <div className="text-sm text-gray-500">{appt.user.email}</div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                    <div>{appt.service}</div>
                    <div>{new Date(appt.date + 'T00:00:00').toLocaleDateString()} at {appt.time}</div>
                     {appt.doctorArrivalDelay && <div className="text-xs text-yellow-700 mt-1">Delay: {appt.doctorArrivalDelay}</div>}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{appt.type}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appt.status)}`}>
                        {appt.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm font-medium space-x-2">
                     <select 
                        value={appt.status} 
                        onChange={(e) => handleStatusChange(appt._id, e.target.value as AppointmentStatus)}
                        className="text-xs border-gray-300 rounded-md"
                      >
                       <option value={AppointmentStatus.UPCOMING}>Upcoming</option>
                       <option value={AppointmentStatus.COMPLETED}>Completed</option>
                       <option value={AppointmentStatus.CANCELLED}>Cancelled</option>
                     </select>
                     <button 
                        onClick={() => { setSelectedAppointment(appt); setIsModalOpen(true); }}
                        className="text-teal-600 hover:text-teal-900 text-xs"
                      >
                       Set Delay
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAppointments.length === 0 && <p className="mt-4 text-center text-gray-500">No appointments match the current filters.</p>}
        </div>
      )}
      {isModalOpen && selectedAppointment && (
        <DelayUpdateModal 
            initialDelay={selectedAppointment.doctorArrivalDelay || ''}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleDelayUpdate}
        />
      )}
    </div>
  );
};

export default AdminDashboard;