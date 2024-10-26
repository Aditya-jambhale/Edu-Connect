// File: app/interview/ai/page.js
"use client";  // Mark this file as a Client Component

import Image from 'next/image';
import { useState } from 'react';

export default function AIInterviewPage() {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleHangup = () => {
    console.log('Call ended');
    setIsSpeaking(false); // End speaking animation if call ends
  };

  const handleInterrupt = () => {
    setIsSpeaking(true);
    setTimeout(() => {
      setIsSpeaking(false);
    }, 1000); // Short animation for interruption
  };

  return (
    <div id="ai-interview-container" className="flex flex-col items-center justify-center min-h-screen p-4 ">
      {/* Interview.AI Heading */}
      <h1 id="interview-heading" className="text-5xl font-bold text-gray-800 z-10 text-center mb-4">Interview.AI</h1>

      {/* AI Image with Speaking Animation */}
      <div id="ai-avatar" className={`relative bg-white w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg z-10 ${isSpeaking ? 'animate-pulse' : ''}`}>
        <Image
          src="/aiavtar.png" // Ensure this path is correct
          alt="AI Avatar"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Tap to Interrupt Button */}
      <button
        id="interrupt-button"
        onClick={handleInterrupt}
        className="mt-6 px-8 py-3 text-lg font-semibold border border-blue-600 text-blue-600 rounded-md shadow-md hover:bg-blue-600 hover:text-white transition duration-200 z-10"
      >
        Tap to Interrupt
      </button>

      {/* Call Controls */}
      <div id="controls" className="flex space-x-8 mt-10 z-10">
        {/* Mute Button */}
        <button
          id="mute-button"
          className={`w-20 h-20 flex items-center justify-center rounded-full transition duration-200 shadow-lg ${isMuted ? 'bg-gray-400' : 'bg-blue-600'}`}
          onClick={handleMute}
        >
          <span className="text-white font-semibold">{isMuted ? 'Unmute' : 'Mute'}</span>
        </button>

        {/* Hang Up Button */}
        <button
          id="hangup-button"
          className="w-20 h-20 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition duration-200 shadow-lg"
          onClick={handleHangup}
        >
          <span className="text-white font-semibold">Hang Up</span>
        </button>
      </div>
    </div>
  );
}
