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
  const [activeSection, setActiveSection] = useState("brainExercises");

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
    // Save the mood journal entry (Implement backend functionality to save this)
  };

  // Handle gratitude list submission
  const handleGratitudeSubmit = (item) => {
    setGratitudeList((prev) => [...prev, item]);
  };

  const sections = {
    brainExercises: {
      title: "Brain Exercises",
      description: "Engage users with fun and challenging exercises to improve cognitive skills.",
      content: (
        <ul className="list-disc pl-5 mt-2">
          <li>
            <a href="https://www.sudoku.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Puzzles and Riddles: Online Sudoku
            </a>
          </li>
          <li>Interactive memory games that challenge recall and pattern recognition.</li>
          <li>Daily brain teasers: Find a new brain teaser each day.</li>
        </ul>
      )
    },
    mindfulness: {
      title: "Mindfulness and Meditation",
      description: "Provide resources to help users develop mindfulness and meditation practices.",
      content: (
        <ul className="list-disc pl-5 mt-2">
          <li>Embed audio or video guided meditations (e.g., 5-minute, 10-minute sessions).</li>
          <li>Step-by-step instructions for breathing techniques like the 4-7-8 method.</li>
          <li>Weekly challenges encouraging users to practice mindfulness.</li>
        </ul>
      )
    },
    healthyLifestyle: {
      title: "Healthy Lifestyle Tips",
      description: "Share advice on nutrition and lifestyle changes that support cognitive health.",
      content: (
        <ul className="list-disc pl-5 mt-2">
          <li>Articles or infographics on foods that enhance brain function (e.g., berries, fish, nuts).</li>
          <li>Tips on incorporating physical activity into daily routines.</li>
          <li>Information on the importance of sleep for cognitive function.</li>
        </ul>
      )
    },
    studyTechniques: {
      title: "Study Techniques",
      description: "Equip users with effective study methods to improve retention.",
      content: (
        <ul className="list-disc pl-5 mt-2">
          <li>A guide explaining the Pomodoro Technique with examples.</li>
          <li>Explanation of spaced repetition and tools to implement it.</li>
          <li>Tutorials on creating mind maps for better organization.</li>
        </ul>
      )
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Boost Your Mind</h1>

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
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-2">{sections[activeSection].title}</h2>
        <p className="mb-4">{sections[activeSection].description}</p>
        {sections[activeSection].content}
      </div>

      {/* Rest of your sections, such as Mood Tracking, Recommendations, etc., go here */}
      {/* Feel free to integrate the previously implemented sections within this same layout */}
    </div>
  );
}