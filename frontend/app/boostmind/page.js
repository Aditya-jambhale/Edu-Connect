<<<<<<< HEAD
"use client"; // Mark this component as a client component

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BoostMindPage() {
  const [mood, setMood] = useState("😊");
  const [recommendations, setRecommendations] = useState([]);
  const [personalizedContent, setPersonalizedContent] = useState("");
  const [moodAnalysis, setMoodAnalysis] = useState("");
  const [interactiveExercise, setInteractiveExercise] = useState("");
  const [dailyAffirmation, setDailyAffirmation] = useState("");
  const [moodJournal, setMoodJournal] = useState("");
  const [gratitudeList, setGratitudeList] = useState([]);
  const [studyBreakSuggestion, setStudyBreakSuggestion] = useState("");

  // Mood to Recommendation Mapping
  const moodRecommendations = {
    "😊": [
      "Keep your spirits high with an uplifting podcast!",
      "Try a new hobby or craft to keep the positive vibes going.",
      "Connect with friends and share your happy moments."
    ],
    "😌": [
      "Practice mindfulness with a meditation session.",
      "Read a book or listen to relaxing music.",
      "Take a nature walk to rejuvenate your mind."
    ],
    "😟": [
      "Engage in light exercise to relieve stress.",
      "Listen to a calming audio or a motivational speech.",
      "Journaling can help organize your thoughts and feelings."
    ]
  };

  // Update recommendations based on mood
  useEffect(() => {
    setRecommendations(moodRecommendations[mood]);
    fetchPersonalizedContent(mood);
    analyzeMood(mood);
    fetchInteractiveExercise(mood);
    fetchDailyAffirmation(mood);
    fetchStudyBreakSuggestion(mood);
  }, [mood]);

  // Fetch personalized content from AI
  const fetchPersonalizedContent = async (mood) => {
    try {
      const response = await axios.post('/api/getPersonalizedContent', { mood });
      setPersonalizedContent(response.data.content);
    } catch (error) {
      console.error("Error fetching personalized content:", error);
    }
  };

  // Analyze mood with AI
  const analyzeMood = async (mood) => {
    try {
      const response = await axios.post('/api/analyzeMood', { mood });
      setMoodAnalysis(response.data.analysis);
    } catch (error) {
      console.error("Error analyzing mood:", error);
    }
  };

  // Fetch interactive exercise based on mood
  const fetchInteractiveExercise = async (mood) => {
    try {
      const response = await axios.post('/api/getInteractiveExercise', { mood });
      setInteractiveExercise(response.data.exercise);
    } catch (error) {
      console.error("Error fetching interactive exercise:", error);
    }
  };

  // Fetch daily affirmation
  const fetchDailyAffirmation = async (mood) => {
    try {
      const response = await axios.post('/api/getDailyAffirmation', { mood });
      setDailyAffirmation(response.data.affirmation);
    } catch (error) {
      console.error("Error fetching daily affirmation:", error);
    }
  };

  // Fetch study break suggestion
  const fetchStudyBreakSuggestion = async (mood) => {
    try {
      const response = await axios.post('/api/getStudyBreakSuggestion', { mood });
      setStudyBreakSuggestion(response.data.suggestion);
    } catch (error) {
      console.error("Error fetching study break suggestion:", error);
    }
  };

  // Handle mood journal submission
  const handleMoodJournalSubmit = () => {
    setMoodJournal("");
    // Save the mood journal entry (You can implement backend functionality to save this)
  };

  // Handle gratitude list submission
  const handleGratitudeSubmit = (item) => {
    setGratitudeList((prev) => [...prev, item]);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Boost Your Mind</h1>

      {/* Mood Tracking */}
      <section className="bg-yellow-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold">How's Your Mood Today?</h2>
        <p>{mood}</p>
        <div className="flex space-x-2">
          <button onClick={() => setMood("😊")} className="p-2 bg-yellow-300 rounded">😊 Happy</button>
          <button onClick={() => setMood("😌")} className="p-2 bg-yellow-300 rounded">😌 Relaxed</button>
          <button onClick={() => setMood("😟")} className="p-2 bg-yellow-300 rounded">😟 Stressed</button>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="bg-green-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold">Recommendations for You</h2>
        {recommendations.length ? (
          <ul className="list-disc pl-5">
            {recommendations.map((rec, index) => (
              <li key={index} className="mt-2">{rec}</li>
            ))}
          </ul>
        ) : (
          <p>No recommendations available.</p>
        )}
      </section>

      {/* Daily Affirmation Section */}
      <section className="bg-purple-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold">Daily Affirmation</h2>
        <p>{dailyAffirmation || "Loading affirmation..."}</p>
      </section>

      {/* Mood Journal Section */}
      <section className="bg-blue-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold">Mood Journal</h2>
        <textarea
          value={moodJournal}
          onChange={(e) => setMoodJournal(e.target.value)}
          className="w-full h-24 p-2 border rounded"
          placeholder="Write about your feelings..."
        />
        <button onClick={handleMoodJournalSubmit} className="mt-2 p-2 bg-blue-300 rounded">Submit</button>
      </section>

      {/* Gratitude List Section */}
      <section className="bg-orange-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold">Gratitude List</h2>
        <input
          type="text"
          placeholder="What are you grateful for?"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value) {
              handleGratitudeSubmit(e.target.value);
              e.target.value = '';
            }
          }}
          className="w-full p-2 border rounded mb-2"
        />
        <ul className="list-disc pl-5">
          {gratitudeList.map((item, index) => (
            <li key={index} className="mt-2">{item}</li>
          ))}
        </ul>
      </section>

      {/* Personalized Content Section */}
      <section className="bg-blue-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold">Personalized Content</h2>
        <p>{personalizedContent || "Loading personalized content..."}</p>
      </section>

      {/* Mood Analysis Section */}
      <section className="bg-purple-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold">Mood Analysis</h2>
        <p>{moodAnalysis || "Analyzing mood..."}</p>
      </section>

      {/* Interactive Exercise Section */}
      <section className="bg-orange-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold">Interactive Exercise</h2>
        <p>{interactiveExercise || "Fetching interactive exercise..."}</p>
      </section>

      {/* Study Break Suggestion Section */}
      <section className="bg-teal-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold">Study Break Suggestion</h2>
        <p>{studyBreakSuggestion || "Fetching study break suggestion..."}</p>
      </section>
    </div>
  );
}
=======
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
>>>>>>> fe157ef3a22dfe6f84d7dd71c4af917708ce4cc0
