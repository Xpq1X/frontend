import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-8">
          Have any questions? We'd love to hear from you. Reach out to us using the form below.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-700">Your Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 text-white py-3 px-8 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
