// File: app/interview/mentor/page.js

"use client"; // Use client component
import { useState, useEffect } from "react";

export default function MentorInterviewPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    field: "",
    mentor: "",
    dateTime: "",
    interviewType: "Video",
    reason: "",
    resume: null,
    termsAccepted: false,
  });

  const [meetingInfo, setMeetingInfo] = useState(null);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    // Fetch mentors based on field (dummy API call)
    if (formData.field) {
      // Replace with your API endpoint
      const fetchedMentors = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ];
      setMentors(fetchedMentors);
    }
  }, [formData.field]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, resume: e.target.files[0] }));
  };

  const handleCheckboxChange = () => {
    setFormData((prevData) => ({ ...prevData, termsAccepted: !prevData.termsAccepted }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // Replace with your API endpoint for creating a Google Meet
    const response = await fetch("/api/create-meeting", {
      method: "POST",
      body: formDataToSend,
    });

    const data = await response.json();
    setMeetingInfo(data);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-4">Mentor Face-to-Face Interview</h2>
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* WhatsApp Number */}
        <div className="mb-4">
          <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
          <input
            type="tel"
            name="whatsapp"
            id="whatsapp"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.whatsapp}
            onChange={handleChange}
            required
          />
        </div>

        {/* Field of Interest */}
        <div className="mb-4">
          <label htmlFor="field" className="block text-sm font-medium text-gray-700">Field of Interest</label>
          <select
            name="field"
            id="field"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.field}
            onChange={handleChange}
            required
          >
            <option value="">Select a field</option>
            <option value="Engineering">Engineering</option>
            <option value="Science">Science</option>
            <option value="Arts">Arts</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Choose Mentor */}
        <div className="mb-4">
          <label htmlFor="mentor" className="block text-sm font-medium text-gray-700">Choose Mentor</label>
          <select
            name="mentor"
            id="mentor"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.mentor}
            onChange={handleChange}
            required
          >
            <option value="">Select a mentor</option>
            {mentors.map((mentor) => (
              <option key={mentor.id} value={mentor.name}>{mentor.name}</option>
            ))}
          </select>
        </div>

        {/* Interview Date and Time */}
        <div className="mb-4">
          <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">Interview Date and Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            id="dateTime"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.dateTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* Interview Type */}
        <div className="mb-4">
          <label htmlFor="interviewType" className="block text-sm font-medium text-gray-700">Interview Type</label>
          <select
            name="interviewType"
            id="interviewType"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.interviewType}
            onChange={handleChange}
          >
            <option value="Video">Video</option>
            <option value="Voice">Voice</option>
          </select>
        </div>

        {/* Reason for Interview */}
        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Interview</label>
          <textarea
            name="reason"
            id="reason"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        {/* Upload Resume */}
        <div className="mb-4">
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Upload Resume</label>
          <input
            type="file"
            name="resume"
            id="resume"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Terms and Conditions */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={formData.termsAccepted}
              onChange={handleCheckboxChange}
              required
            />
            <span className="ml-2 text-sm text-gray-700">I accept the Terms and Conditions</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600"
          >
            Schedule Interview
          </button>
        </div>
      </form>

      {/* Display Meeting Info After Submission */}
      {meetingInfo && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-md">
          <h3 className="font-semibold">Meeting Scheduled!</h3>
          <p>Meeting ID: {meetingInfo.meetingId}</p>
          <p>Password: {meetingInfo.password}</p>
        </div>
      )}
    </div>
  );
}
