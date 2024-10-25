// pages/interview-prep.js
import Link from 'next/link';

export default function InterviewPrep() {
  return (
    <div id="interview-prep-page" className="min-h-screen flex items-center justify-center px-4 md:px-8">
      <div className="w-full max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2">

        {/* AI Interview Section */}
        <Link href="/interview/ai" passHref>
          <div
            id="ai-interview-section"
            className="relative group flex flex-col items-center justify-center p-8 rounded-xl shadow-lg border border-gray-300 cursor-pointer transition transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-blue-600 opacity-10 rounded-xl transition duration-200 group-hover:opacity-30"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <img
                src="/icons/ai-icon.png"  // Add an icon path here for AI Interview
                alt="AI Interview Icon"
                className="w-20 h-20 mb-4"
                id="ai-icon"
              />
              <h2 id="ai-title" className="text-3xl font-semibold text-gray-800 mb-2">AI Interview</h2>
              <p id="ai-description" className="text-gray-600 mb-4">
                Experience a voice-call with AI for interview practice.
              </p>
              <button
                id="ai-button"
                className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium transition hover:bg-blue-600"
              >
                Start AI Interview
              </button>
            </div>
          </div>
        </Link>

        {/* Mentor Interview Section */}
        <Link href="/interview-prep/mentor-interview" passHref>
          <div
            id="mentor-interview-section"
            className="relative group flex flex-col items-center justify-center p-8 rounded-xl shadow-lg border border-gray-300 cursor-pointer transition transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-green-600 opacity-10 rounded-xl transition duration-200 group-hover:opacity-30"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <img
                src="/icons/mentor-icon.png"  // Add an icon path here for Mentor Interview
                alt="Mentor Interview Icon"
                className="w-20 h-20 mb-4"
                id="mentor-icon"
              />
              <h2 id="mentor-title" className="text-3xl font-semibold text-gray-800 mb-2">Mentor Interview</h2>
              <p id="mentor-description" className="text-gray-600 mb-4">
                Connect face-to-face with a mentor for live interview practice.
              </p>
              <button
                id="mentor-button"
                className="px-4 py-2 rounded-md bg-green-500 text-white font-medium transition hover:bg-green-600"
              >
                Start Mentor Interview
              </button>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}
