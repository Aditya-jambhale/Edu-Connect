"use client";
import { useState } from 'react';

export default function TeachingAssistant() {
    const [inputType, setInputType] = useState(''); // To manage the choice between voice and text
    const [topic, setTopic] = useState(''); // To store the typed topic
    const [response, setResponse] = useState(''); // Store AI response

    const handleTextSubmit = async (e) => {
        e.preventDefault();
        // Fetch response from the AI API
        try {
            const res = await fetch('http://localhost:5000/ask', { // Update to full URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic }),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            console.log(data, 'this is json response');
            // Extract the generated_text from the first item in the response array
            setResponse(data.response[0].generated_text);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            setResponse('Failed to fetch response. Please try again later.'); // Handle error response
        }
    };

    const handleVoiceSubmit = () => {
        // Call the voice recording function
        alert('Voice input feature coming soon!');
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
            <h1 className="text-4xl font-bold text-center">Teaching AI Assistant</h1>
            <div className="flex space-x-4">
                <button
                    className={`py-2 px-4 rounded-lg ${inputType === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setInputType('text')}
                >
                    Type Topic
                </button>
                <button
                    className={`py-2 px-4 rounded-lg ${inputType === 'voice' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setInputType('voice')}
                >
                    Speak Topic
                </button>
            </div>

            {inputType === 'text' && (
                <form onSubmit={handleTextSubmit} className="flex flex-col items-center space-y-4">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter a topic..."
                        className="border-2 border-gray-300 rounded-md p-2 w-64"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Ask AI
                    </button>
                </form>
            )}

            {inputType === 'voice' && (
                <button
                    onClick={handleVoiceSubmit}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Record Voice
                </button>
            )}

            {response && (
                <div className="text-center mt-4">
                    <h2 className="text-2xl font-bold">AI Response:</h2>
                    <p className="mt-2 text-lg">{response}</p>
                </div>
            )}
        </div>
    );
}
