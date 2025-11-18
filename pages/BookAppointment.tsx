import React, { useState, useEffect } from 'react';
import { AppointmentType, Service } from '../types';
import { getAvailableSlots, bookAppointment, getServices } from '../services/api';
import { useNavigate } from 'react-router-dom';

const BookAppointment: React.FC = () => {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [appointmentType, setAppointmentType] = useState<AppointmentType>(AppointmentType.CLINIC_VISIT);
  const [address, setAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchServices = async () => {
        try {
            const fetchedServices = await getServices();
            setServices(fetchedServices);
        } catch (err) {
            setError('Could not load services.');
        }
    }
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setIsLoadingSlots(true);
      setError('');
      getAvailableSlots(selectedDate)
        .then(slots => {
          setAvailableSlots(slots);
          setSelectedSlot('');
        })
        .catch(() => setError('Could not fetch available slots.'))
        .finally(() => setIsLoadingSlots(false));
    }
  }, [selectedDate]);

  const handleBooking = async () => {
    setIsBooking(true);
    setError('');
    try {
      await bookAppointment({
        service: selectedService,
        type: appointmentType,
        date: selectedDate,
        time: selectedSlot,
        address: appointmentType === AppointmentType.HOME_VISIT ? address : undefined,
      });
      setBookingSuccess(true);
    } catch (err) {
      console.error("Booking failed", err);
      setError('There was an error booking your appointment. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-teal-600 mb-4">Appointment Booked!</h2>
        <p className="text-gray-700">Your appointment for <strong>{selectedService}</strong> on <strong>{new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong> at <strong>{selectedSlot}</strong> has been confirmed.</p>
        <button onClick={() => navigate('/dashboard')} className="mt-6 bg-teal-600 text-white font-bold py-2 px-6 rounded-full hover:bg-teal-700 transition duration-300">View My Appointments</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Book an Appointment</h1>
      
      {/* Step 1: Service and Type */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">1. Select a Service</label>
            <select value={selectedService} onChange={e => setSelectedService(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
              <option value="" disabled>-- Choose a service --</option>
              {services.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">2. Choose Appointment Type</label>
            <div className="flex space-x-4">
              <button onClick={() => setAppointmentType(AppointmentType.CLINIC_VISIT)} className={`flex-1 p-3 rounded-md border text-center ${appointmentType === AppointmentType.CLINIC_VISIT ? 'bg-teal-600 text-white border-teal-600' : 'bg-gray-100'}`}>Clinic Visit</button>
              <button onClick={() => setAppointmentType(AppointmentType.HOME_VISIT)} className={`flex-1 p-3 rounded-md border text-center ${appointmentType === AppointmentType.HOME_VISIT ? 'bg-teal-600 text-white border-teal-600' : 'bg-gray-100'}`}>Home Visit</button>
            </div>
          </div>
          {appointmentType === AppointmentType.HOME_VISIT && (
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Home Address</label>
              <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="Enter your full address"/>
            </div>
          )}
          <button 
            onClick={() => setStep(2)} 
            disabled={!selectedService || (appointmentType === AppointmentType.HOME_VISIT && !address)}
            className="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-700 transition duration-300 disabled:bg-gray-400">
            Next
          </button>
        </div>
      )}

      {/* Step 2: Date and Time */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">3. Select a Date</label>
            <input type="date" id="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full p-2 border border-gray-300 rounded-md"/>
          </div>
          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">4. Select an Available Time</label>
              {isLoadingSlots ? <p>Loading slots...</p> : (
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.length > 0 ? availableSlots.map(slot => (
                    <button key={slot} onClick={() => setSelectedSlot(slot)} className={`p-2 rounded-md border ${selectedSlot === slot ? 'bg-teal-600 text-white border-teal-600' : 'bg-gray-100'}`}>{slot}</button>
                  )) : <p className="col-span-3 text-gray-500">No available slots for this date. Please try another day.</p>}
                </div>
              )}
            </div>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300">Back</button>
            <button 
                onClick={handleBooking} 
                disabled={!selectedSlot || isBooking}
                className="bg-teal-600 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-700 transition duration-300 disabled:bg-gray-400">
                {isBooking ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;