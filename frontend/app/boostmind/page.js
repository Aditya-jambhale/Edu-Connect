"use client"; // Declare this component as a Client Component

import { useState } from 'react';

const BoostMind = () => {
  const [activeSection, setActiveSection] = useState('brainExercises');

  const sections = {
    brainExercises: {
      title: "Brain Exercises",
      description: "Engage users with fun and challenging exercises to improve cognitive skills.",
      content: (
        <>
          <h3 className="text-xl font-semibold">Content Ideas:</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>
              <a href="https://www.sudoku.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Puzzles and Riddles: Online Sudoku
              </a>
            </li>
            <li>Interactive memory games that challenge recall and pattern recognition.</li>
            <li>Daily brain teasers: Find a new brain teaser each day.</li>
          </ul>
        </>
      )
    },
    mindfulness: {
      title: "Mindfulness and Meditation",
      description: "Provide resources to help users develop mindfulness and meditation practices for improved focus and relaxation.",
      content: (
        <>
          <h3 className="text-xl font-semibold">Content Ideas:</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>Embed audio or video guided meditations (e.g., 5-minute, 10-minute sessions).</li>
            <li>Step-by-step instructions for breathing techniques like the 4-7-8 method or box breathing.</li>
            <li>Weekly challenges encouraging users to practice mindfulness (e.g., a week of gratitude journaling).</li>
          </ul>
        </>
      )
    },
    healthyLifestyle: {
      title: "Healthy Lifestyle Tips",
      description: "Share advice on nutrition and lifestyle changes that support cognitive health.",
      content: (
        <>
          <h3 className="text-xl font-semibold">Content Ideas:</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>Articles or infographics detailing foods that enhance brain function (e.g., berries, fish, nuts).</li>
            <li>Tips on incorporating physical activity into daily routines (e.g., short workouts, yoga).</li>
            <li>Information on the importance of sleep for cognitive function, including tips for better sleep.</li>
          </ul>
        </>
      )
    },
    studyTechniques: {
      title: "Study Techniques",
      description: "Equip users with effective study methods to improve retention and understanding of material.",
      content: (
        <>
          <h3 className="text-xl font-semibold">Content Ideas:</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>A guide explaining the Pomodoro Technique with examples.</li>
            <li>Explanation of spaced repetition and tools/apps to implement it (e.g., Anki).</li>
            <li>Tutorials on creating mind maps for better organization of thoughts and ideas.</li>
          </ul>
        </>
      )
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Boost Mind</h1>

      {/* Navigation Links */}
      <div className="flex justify-center space-x-4 mb-6">
        {Object.keys(sections).map((sectionKey) => (
          <button
            key={sectionKey}
            onClick={() => setActiveSection(sectionKey)}
            className={`py-2 px-4 rounded-md text-white transition-colors ${
              activeSection === sectionKey ? 'bg-blue-500' : 'bg-blue-400 hover:bg-blue-500'
            }`}
          >
            {sections[sectionKey].title}
          </button>
        ))}
      </div>

      {/* Content Display */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">{sections[activeSection].title}</h2>
        <p className="mb-4">{sections[activeSection].description}</p>
        {sections[activeSection].content}
      </div>
    </div>
  );
};

export default BoostMind;
