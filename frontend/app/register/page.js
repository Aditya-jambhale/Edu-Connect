"use client"; // Indicate this is a client component

import { useState } from "react";

export default function RegistrationPage() {
  const [userType, setUserType] = useState("student"); // Toggle between student and mentor

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle registration logic (e.g., API call)
    console.log("User registered:", { userType });
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-20 mb-20">
      <div className="w-full max-w-3xl p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Create Your Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Register as:</label>
            <select
              id="userType"
              onChange={(e) => setUserType(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4"
            >
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>

          {/* Common Fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
            />
          </div>

          <div>
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input
              id="profileImage"
              type="file"
              className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-md p-3"
            />
          </div>

          {/* Conditional Fields Based on User Type */}
          {userType === "student" && (
            <>
              <div>
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700">Domain of Study</label>
                <input
                  id="domain"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
                />
              </div>
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Degree</label>
                <input
                  id="degree"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
                />
              </div>
              <div>
                <label htmlFor="stream" className="block text-sm font-medium text-gray-700">Stream</label>
                <input
                  id="stream"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
                />
              </div>
              <div>
                <label htmlFor="university" className="block text-sm font-medium text-gray-700">University</label>
                <input
                  id="university"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
                />
              </div>
              <div>
                <label htmlFor="yearOfCompletion" className="block text-sm font-medium text-gray-700">Year of Completion</label>
                <input
                  id="yearOfCompletion"
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
                />
              </div>
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                <textarea
                  id="skills"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
                  placeholder="e.g., Mobile App Development, ML"
                />
              </div>
              <div>
                <label htmlFor="interests" className="block text-sm font-medium text-gray-700">Interests</label>
                <textarea
                  id="interests"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
                  placeholder="e.g., AI, Data Science"
                />
              </div>
            </>
          )}

          {userType === "mentor" && (
            <>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  id="role"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
                />
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                <input
                  id="industry"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
                />
              </div>
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                  id="jobTitle"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
                />
              </div>
              <div>
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">Expertise</label>
                <textarea
                  id="expertise"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
                  placeholder="e.g., Data Analysis, Python"
                />
              </div>
              <div>
                <label htmlFor="availableForMentorship" className="block text-sm font-medium text-gray-700">
                  <input type="checkbox" id="availableForMentorship" className="mr-2" />
                  Available for Mentorship
                </label>
              </div>
              <div>
                <label htmlFor="mentorInterests" className="block text-sm font-medium text-gray-700">Interests</label>
                <textarea
                  id="mentorInterests"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
                  placeholder="e.g., Data Visualization"
                />
              </div>
              <div>
                <label htmlFor="socialLinks" className="block text-sm font-medium text-gray-700">Social Links (Instagram, LinkedIn, GitHub)</label>
                <input
                  id="socialLinks"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-4"
                  placeholder="Comma-separated URLs"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md p-3 hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
