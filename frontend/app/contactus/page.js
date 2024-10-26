"use client"; // This line makes the component a Client Component

export default function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 md:px-8">
      <div className="bg-white shadow-lg rounded-3xl p-8 max-w-xl w-full space-y-6">
        <h1 className="text-4xl font-bold text-center text-blue-600" id="contact-us-header">
          Get in Touch
        </h1>
        <p className="text-center text-gray-600" id="contact-intro">
          We’d love to hear from you! Fill out the form below, and we’ll get back to you shortly.
        </p>

        {/* Contact Form */}
        <form className="space-y-6" id="contact-form">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="contact-name" // ID for backend mapping
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="contact-email" // ID for backend mapping
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out"
              placeholder="Your Email"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="contact-message" // ID for backend mapping
              required
              rows="4"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out"
              placeholder="Your Message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-700 transform hover:scale-105"
            id="submit-button" // ID for backend mapping
          >
            Send Message
          </button>
        </form>

        {/* Contact Information Section */}
        <div className="border-t border-gray-300 pt-6" id="contact-info">
          <h2 className="text-2xl font-bold text-center text-blue-600">Contact Information</h2>
          <p className="text-center text-gray-700 mt-2">You can reach us at:</p>
          <p className="text-center text-gray-700">📧 support@educonnect.com</p>
          <p className="text-center text-gray-700">📞 +1 (555) 123-4567</p>
          <p className="text-center text-gray-700">🌍 123 EduConnect St, Knowledge City</p>
        </div>
      </div>
    </div>
  );
}
