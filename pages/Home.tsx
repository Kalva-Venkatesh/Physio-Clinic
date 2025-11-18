import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices, getReviews } from '../services/api';
import { Service, Review } from '../types';
import { StarIcon, serviceIcons } from '../components/icons';

const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedServices, fetchedReviews] = await Promise.all([
          getServices(),
          getReviews()
        ]);
        setServices(fetchedServices);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative text-center rounded-lg overflow-hidden">
          <img src="https://picsum.photos/1200/500?image=20" alt="Physiotherapy session" className="w-full h-96 object-cover"/>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Empowering Your Movement</h1>
              <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">Personalized physiotherapy to help you recover, regain strength, and live pain-free.</p>
              <Link to="/book-appointment" className="bg-teal-600 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-700 transition duration-300 text-lg">
                Book an Appointment
              </Link>
          </div>
      </section>

      {/* Services Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          {services.map(service => {
            const Icon = serviceIcons[service.iconName];
            return (
              <div key={service._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-teal-100 p-4 rounded-full">
                      {Icon && <Icon className="h-8 w-8 text-teal-600" />}
                    </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm">{service.description.substring(0, 70)}...</p>
              </div>
            );
          })}
        </div>
         <div className="text-center mt-8">
            <Link to="/services" className="text-teal-600 font-semibold hover:underline">View All Services →</Link>
        </div>
      </section>

      {/* Meet the Doctor Section */}
      <section className="bg-white p-12 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <img src="https://picsum.photos/300/300?image=823" alt="Dr. Emily Carter" className="w-48 h-48 rounded-full object-cover shadow-md"/>
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">Meet Dr. Emily Carter</h2>
                <p className="text-teal-600 font-semibold mb-4">Lead Physiotherapist, DPT, OCS</p>
                <p className="text-gray-600 mb-6 max-w-2xl">With over 15 years of experience, Dr. Carter is dedicated to providing patient-centered care. She specializes in sports injuries and post-operative rehabilitation, combining evidence-based techniques with a compassionate approach.</p>
                <Link to="/doctor" className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition duration-300">
                    Learn More
                </Link>
            </div>
          </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">What Our Patients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map(review => (
            <div key={review._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex">
                    {[...Array(review.rating)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-yellow-400" />)}
                    {[...Array(5 - review.rating)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-gray-300" />)}
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">"{review.comment}"</p>
              <p className="font-semibold text-right">- {review.user.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;