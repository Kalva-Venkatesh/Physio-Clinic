import React, { useState, useEffect } from 'react';
import { getReviews } from '../services/api';
import { Review } from '../types';
import { StarIcon } from '../components/icons';

const DoctorDetails: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const fetchedReviews = await getReviews();
        setReviews(fetchedReviews);
      } catch (err) {
        setError('Could not load patient feedback.');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="space-y-12">
      {/* Profile Header */}
      <section className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img src="https://picsum.photos/400/400?image=823" alt="Dr. Emily Carter" className="w-40 h-40 rounded-full object-cover shadow-xl"/>
          <div>
            <h1 className="text-4xl font-bold">Dr. Emily Carter</h1>
            <p className="text-xl text-teal-600 font-semibold mt-1">Doctor of Physical Therapy, Orthopedic Clinical Specialist</p>
          </div>
        </div>
      </section>
      
      {/* Details Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">About Dr. Carter</h2>
                <p className="text-gray-700 leading-relaxed">
                    Dr. Emily Carter has been a licensed physiotherapist for over 15 years, with a deep passion for helping individuals overcome physical challenges. She earned her Doctorate in Physical Therapy from the University of Health Sciences and is a board-certified Orthopedic Clinical Specialist (OCS). Her approach is rooted in evidence-based practice, personalized care plans, and patient education. She believes in empowering her patients with the knowledge and tools they need to manage their conditions and prevent future injuries.
                </p>
            </div>

            {/* Qualifications & Specializations */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Qualifications & Specializations</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Doctor of Physical Therapy (DPT)</li>
                    <li>Orthopedic Clinical Specialist (OCS)</li>
                    <li>Certified in Dry Needling</li>
                    <li>Specialization in Sports Injury Rehabilitation</li>
                    <li>Advanced Training in Manual Therapy Techniques</li>
                </ul>
            </div>
            
            {/* Equipment & Achievements */}
             <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Equipment Used</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Ultrasound Imaging</li>
                            <li>Laser Therapy Units</li>
                            <li>Spinal Decompression Tables</li>
                            <li>Kinesio Taping</li>
                        </ul>
                    </div>
                     <div>
                        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Physical Therapist of the Year (2021)</li>
                            <li>Published in the Journal of Orthopaedic & Sports Physical Therapy</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Patient Reviews */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Patient Feedback</h2>
            <div className="space-y-6">
                {loading && <p>Loading reviews...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && reviews.length > 0 && reviews.map(review => (
                    <div key={review._id} className="border-b pb-4 last:border-b-0">
                         <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold">{review.user.name}</p>
                            <div className="flex">
                                {[...Array(review.rating)].map((_, i) => <StarIcon key={i} className="w-4 h-4 text-yellow-400" />)}
                                {[...Array(5 - review.rating)].map((_, i) => <StarIcon key={i} className="w-4 h-4 text-gray-300" />)}
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm">"{review.comment}"</p>
                    </div>
                ))}
                {!loading && !error && reviews.length === 0 && <p className="text-gray-500">No feedback yet. Be the first to leave a review!</p>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;