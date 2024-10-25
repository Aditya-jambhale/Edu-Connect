"use client";

import { useState } from "react";
import Link from "next/link";

export default function CareerPathComponent() {
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState("");
  const [goals, setGoals] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/career/get_routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interests, skills, goals }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setApiResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setApiResponse("An error occurred while fetching the data.");
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (text) => {
    // Replace * with <strong> tags for bold text
    let formattedText = text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    
    // Replace # with <h3> tags for headers
    formattedText = formattedText.replace(/^#\s(.*)$/gm, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>');
    
    // Convert newlines to <br> tags
    formattedText = formattedText.replace(/\n/g, '<br>');

    return formattedText;
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-blue-600">Explore Career Paths</h2>
          <p className="text-gray-700 mt-2">Discover your ideal career and connect with relevant resources.</p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="interests" className="block font-semibold text-gray-800">What are your interests?</label>
              <textarea
                id="interests"
                placeholder="e.g., technology, design, healthcare, etc."
                className="mt-2 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="skills" className="block font-semibold text-gray-800">What are your key skills?</label>
              <textarea
                id="skills"
                placeholder="e.g., problem-solving, creativity, communication, etc."
                className="mt-2 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="goals" className="block font-semibold text-gray-800">What are your career goals?</label>
              <textarea
                id="goals"
                placeholder="e.g., high income, work-life balance, making an impact, etc."
                className="mt-2 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white rounded-lg p-2 transition duration-200 hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Recommendations'}
            </button>
          </form>
        </div>

        {/* API Response Section */}
        {apiResponse && (
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Career Recommendations</h3>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: formatResponse(apiResponse) }}
            />
          </div>
        )}
      </div>
    </div>
  );
}