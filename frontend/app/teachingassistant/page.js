// frontend/app/teachingassistant/page.js
"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Assistant() {
    const [topic, setTopic] = useState('');
    const [studentLevel, setStudentLevel] = useState('high school');
    const [explanation, setExplanation] = useState('');

    const handleGenerateExplanation = async () => {
        try {
            const response = await axios.post('http://localhost:5000/generate_explanation', {
                topic: topic,
                student_level: studentLevel
            });
            setExplanation(response.data.explanation);
        } catch (error) {
            console.error("Error generating explanation:", error);
        }
    };

    return (
        <div>
            <h1>AI Teaching Assistant</h1>
            <input
                type="text"
                placeholder="Enter topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <select value={studentLevel} onChange={(e) => setStudentLevel(e.target.value)}>
                <option value="high school">High School</option>
                <option value="college">College</option>
            </select>
            <button onClick={handleGenerateExplanation}>Get Explanation</button>
            
            {explanation && (
                <div>
                    <h2>Explanation:</h2>
                    <p>{explanation}</p>
                </div>
            )}
        </div>
    );
}
