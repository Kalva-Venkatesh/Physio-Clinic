import React, { useState, useEffect } from 'react';
import { getServices } from '../services/api';
import { Service } from '../types';
import { serviceIcons } from '../components/icons';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const fetchedServices = await getServices();
        setServices(fetchedServices);
      } catch (err) {
        setError('Could not load services.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-4">Our Services</h1>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">We offer a comprehensive range of physiotherapy services to address your specific needs and help you on your journey to recovery and wellness.</p>
      
      {loading && <p className="text-center">Loading services...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="space-y-10">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.iconName];
              return (
                <div key={service._id} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/3 flex justify-center">
                      <div className="bg-teal-100 p-6 rounded-full">
                          {Icon && <Icon className="h-20 w-20 text-teal-600" />}
                      </div>
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-semibold mb-3">{service.name}</h2>
                    <p className="text-gray-700 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
              <Link to="/book-appointment" className="bg-teal-600 text-white font-bold py-3 px-10 rounded-full hover:bg-teal-700 transition duration-300 text-lg">
                Ready to Start? Book Now
              </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Services;