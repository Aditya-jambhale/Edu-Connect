"use client";
import { useState } from 'react';

export default function TeachingAssistant() {
    const [inputType, setInputType] = useState(''); // To manage the choice between voice and text
    const [topic, setTopic] = useState(''); // To store the typed topic
    const [response, setResponse] = useState(''); // Store AI response
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error state

    const handleTextSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear previous errors

        const controller = new AbortController(); // Create an AbortController instance
        const signal = controller.signal;

        // Set a timeout for the fetch call
        const timeoutId = setTimeout(() => {
            controller.abort(); // Abort the request after 10 seconds
            setError('Request timed out. Please try again.'); // Update error state
            setLoading(false); // Stop loading
        }, 10000); 

        try {
            const res = await fetch('/api/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic }),
                signal, // Attach the signal to the fetch request
            });

            clearTimeout(timeoutId); // Clear the timeout if the request completes in time

            if (!res.ok) {
                throw new Error('Network response was not ok'); // Throw an error for bad responses
            }
            const data = await res.json(); // Parse JSON response
            setResponse(data.response); // Update response state
        } catch (err) {
            if (err.name === 'AbortError') {
                setError('Request aborted. Please try again later.'); // Handle abort error
            } else {
                setError('Failed to fetch response. Please try again later.'); // Generic error message
                console.error(err); // Log error for debugging
            }
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    const handleVoiceSubmit = () => {
        alert('Voice input feature coming soon!'); // Placeholder for voice feature
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

            {loading && (
                <div className="mt-4">
                    <p className="text-lg">Loading response...</p>
                </div>
            )}

            {error && (
                <div className="mt-4">
                    <p className="text-red-500">{error}</p>
                </div>
            )}

            {response && !loading && (
                <div className="text-center mt-4">
                    <h2 className="text-2xl font-bold">AI Response:</h2>
                    <p className="mt-2 text-lg">{response}</p>
                </div>
            )}
        </div>
    );
}
