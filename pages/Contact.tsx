
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Get In Touch</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" rows={5} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-700 transition duration-300">
                Submit
              </button>
            </form>
          </div>

          {/* Contact Details & Map */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Clinic Information</h2>
            <div className="text-gray-700 space-y-2">
                <p><strong>Address:</strong> 123 Health St, Wellness City, 90210</p>
                <p><strong>Phone:</strong> (123) 456-7890</p>
                <p><strong>Email:</strong> contact@physiocare.com</p>
                <p><strong>Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM</p>
            </div>
            
            <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.719694084532!2d-118.4019313847849!3d34.05149998060696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d642b311%3A0x13d80a31a9a4b3b1!2sBeverly%20Hills%2C%20CA%2C%20USA!5e0!3m2!1sen!2suk!4v1626359253540!5m2!1sen!2suk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="Clinic Location"
                ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;