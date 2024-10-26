"use client"; // Declare this component as a Client Component

import { useState, useEffect } from 'react';
import Link from 'next/link';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000'); // Establish a WebSocket connection

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Handle incoming responses from the backend
    socket.on('response_message', (data) => {
      const aiMessage = {
        type: 'text',
        content: data.response,
        sender: 'ai'
      };
      setOutput((prevOutput) => [...prevOutput, aiMessage]);
    });

    // Cleanup the socket connection on component unmount
    return () => {
      socket.off('response_message');
    };
  }, []);

  const handleSearch = () => {
    if (input.trim() === '' && !file) return; // Prevent sending empty messages

    const messages = [];

    if (input.trim() !== '') {
      const userMessage = input;
      messages.push({ type: 'text', content: userMessage, sender: 'user' });
      setInput(''); // Clear the input field

      // Send the message to the backend via WebSocket
      socket.emit('send_message', { message: userMessage });
    }

    if (file) {
      messages.push({ type: 'file', content: URL.createObjectURL(file), fileName: file.name, sender: 'user' });
      messages.push({ type: 'text', content: `Received file: ${file.name}`, sender: 'ai' });
      setFile(null); // Clear the file input
    }

    setOutput((prevOutput) => [...prevOutput, ...messages]);

    const chatArea = document.getElementById('outputArea');
    if (chatArea) {
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 lg:p-8">
      {/* Welcome Message */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to EduConnect!</h1>
        <div className="relative overflow-hidden mt-6">
          <blockquote className="text-lg text-black animate-marquee whitespace-nowrap">
            "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
          </blockquote>
        </div>
      </div>

      {/* AI Assistant Section */}
      <section
        id="studyBuddyAI"
        className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col mb-6 "
        style={{ height: '600px' }}
      >
        <h2 className="text-2xl font-bold text-purple-600 mb-4 text-center">🎓 Study Buddy AI Assistant</h2>

        {/* Output Area */}
        <div
          id="outputArea"
          className="p-4 border border-purple-700 rounded-md h-full overflow-y-auto bg-white mb-4 flex flex-col"
        >
          {output.length > 0 ? (
            output.map((item, index) => (
              <div key={index} className={`mb-2 ${item.sender === 'user' ? 'text-right' : 'text-left'}`}>
                {item.type === 'text' ? (
                  <>
                    <strong>{item.sender === 'user' ? 'User:' : 'AI:'}</strong> {item.content}
                  </>
                ) : (
                  <div>
                    <strong>User:</strong> Uploaded a file:{' '}
                    <a href={item.content} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {item.fileName}
                    </a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-700">Ask me anything!</p>
          )}
        </div>

        {/* Input Area */}
        <div className="flex flex-col md:flex-row items-center">
          <input
            id="userInput"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask your question..."
            className="flex-grow p-3 mb-2 md:mb-0 border border-purple-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSearch}
              className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              <span className="text-lg">➤</span>
            </button>
            <button
              className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              onClick={() => alert('Voice input feature coming soon!')}
            >
              🎤
            </button>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,application/pdf"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="flex items-center p-3 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition"
            >
              Upload File
            </label>
            <button
              onClick={handleSearch}
              className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              title="Send File"
            >
              <span className="text-lg">+</span>
            </button>
          </div>
        </div>
      </section>

      {/* Options Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Current To-Do Task', description: 'Complete your assignments!', link: '/todowork' },
          { title: 'Personalized Study', description: 'Get study materials tailored for you.', link: '/' },
          { title: 'Connect Globally', description: 'Join our global study community.', link: '/connect' },
          { title: 'Quiz', description: 'Test your knowledge with our quizzes.', link: '/quiz' },
          { title: 'Interview Preparation', description: 'Prepare for your upcoming interviews.', link: '/interview' },
          { title: 'Resource', description: 'All you need here.', link: '/' }
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
            <p className="mt-2 text-gray-600">{item.description}</p>
            <Link href={item.link} className="mt-4 inline-block py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              Learn More
            </Link>
          </div>
        ))}
      </section>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
