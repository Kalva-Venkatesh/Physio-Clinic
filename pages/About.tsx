
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">About PhysioCare Connect</h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-center my-12">
            <img src="https://picsum.photos/600/400?image=106" alt="Clinic interior" className="rounded-lg shadow-md object-cover w-full h-full"/>
            <div>
                 <h2 className="text-3xl font-semibold text-teal-700 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                Our mission is to provide the highest standard of physiotherapy care by combining evidence-based practices with a personalized, patient-first approach. We are committed to helping you achieve your health and wellness goals, empowering you to live a life free from pain and physical limitations.
                </p>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center my-12">
            <div className="md:order-2">
                 <img src="https://picsum.photos/600/400?image=317" alt="Physiotherapist with patient" className="rounded-lg shadow-md object-cover w-full h-full"/>
            </div>
            <div className="md:order-1">
                 <h2 className="text-3xl font-semibold text-teal-700 mb-4">Patient Care Philosophy</h2>
                <p className="text-gray-700 leading-relaxed">
                We believe that effective treatment starts with listening. We take the time to understand your unique story, condition, and goals. Our philosophy is built on three pillars:
                <br/><br/>
                <strong className="block mt-2">Personalized Treatment:</strong> No two patients are the same. We create customized treatment plans tailored to your specific needs.
                <br/>
                <strong className="block mt-2">Patient Education:</strong> We empower you with the knowledge to understand your condition and take an active role in your recovery.
                <br/>
                <strong className="block mt-2">Holistic Wellness:</strong> We look beyond the symptoms to address the root cause, promoting long-term health and preventing future injuries.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default About;