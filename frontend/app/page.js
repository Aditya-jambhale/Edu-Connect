"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import io from 'socket.io-client';

let socket;

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [file, setFile] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    // Socket.io connection with error handling
    socket = io('http://localhost:5000', {
      withCredentials: true,
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection event handlers
    socket.on('connect', () => {
      console.log('Connected to Study Buddy server');
      setIsConnected(true);
      setError(null);
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setIsConnected(false);
      setError('Unable to connect to Study Buddy. Please try again later.');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Study Buddy server');
      setIsConnected(false);
    });

    // Message handling
    socket.on('response_message', (data) => {
      setIsLoading(false);
      const aiMessage = {
        type: 'text',
        content: data.response,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setOutput((prevOutput) => [...prevOutput, aiMessage]);
      scrollToBottom();
    });

    // Error handling
    socket.on('error_message', (data) => {
      setIsLoading(false);
      setError(data.error);
      const errorMessage = {
        type: 'text',
        content: `Error: ${data.error}`,
        sender: 'system',
        timestamp: new Date().toISOString()
      };
      setOutput((prevOutput) => [...prevOutput, errorMessage]);
    });

    // Cleanup
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  // Scroll to bottom of chat
  const scrollToBottom = useCallback(() => {
    const chatArea = document.getElementById('outputArea');
    if (chatArea) {
      setTimeout(() => {
        chatArea.scrollTop = chatArea.scrollHeight;
      }, 100);
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (!isConnected) {
      setError('Not connected to server. Please wait or refresh the page.');
      return;
    }

    if (input.trim() === '' && !file) return;

    setIsLoading(true);
    const messages = [];
    const timestamp = new Date().toISOString();

    if (input.trim() !== '') {
      const userMessage = {
        type: 'text',
        content: input,
        sender: 'user',
        timestamp
      };
      messages.push(userMessage);
      
      // Emit message to server
      socket.emit('send_message', { 
        message: input,
        timestamp 
      }, (response) => {
        if (response?.error) {
          setError(response.error);
          setIsLoading(false);
        }
      });
      
      setInput('');
    }

    if (file) {
      handleFileUpload();
    }

    setOutput((prevOutput) => [...prevOutput, ...messages]);
    scrollToBottom();
  }, [input, file, isConnected]);

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const fileMessage = {
        type: 'file',
        content: URL.createObjectURL(file),
        fileName: file.name,
        sender: 'user',
        timestamp: new Date().toISOString()
      };
      setOutput((prevOutput) => [...prevOutput, fileMessage]);

      // Add file processing logic here as needed
      
      setFile(null);
    } catch (err) {
      setError('Error uploading file. Please try again.');
      console.error('File upload error:', err);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size too large. Please upload a file smaller than 5MB.');
        return;
      }
      setFile(selectedFile);
    }
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

      {/* Connection Status */}
      {!isConnected && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p className="font-bold">Connection Status</p>
          <p>Trying to connect to Study Buddy...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button 
            onClick={() => setError(null)} 
            className="text-sm underline mt-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* AI Assistant Section */}
      <section
        id="studyBuddyAI"
        className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col mb-6 "
        style={{ height: '600px' }}
      >
        <h2 className="text-2xl font-bold text-purple-600 mb-4 text-center">
          🎓 Study Buddy AI Assistant
          {isLoading && <span className="ml-2 text-sm">Thinking...</span>}
        </h2>

        {/* Output Area */}
        <div
          id="outputArea"
          className="p-4 border border-purple-700 rounded-md h-full overflow-y-auto bg-white mb-4 flex flex-col"
        >
          {output.length > 0 ? (
            output.map((item, index) => (
              <div 
                key={index} 
                className={`mb-2 p-2 rounded ${
                  item.sender === 'user' 
                    ? 'text-right bg-blue-50' 
                    : item.sender === 'system' 
                    ? 'text-center bg-red-50' 
                    : 'text-left bg-gray-50'
                }`}
              >
                {item.type === 'text' ? (
                  <div>
                    <strong className="text-gray-600">
                      {item.sender === 'user' ? 'You' : item.sender === 'system' ? 'System' : 'Study Buddy'}:
                    </strong>{' '}
                    <span className="whitespace-pre-wrap">{item.content}</span>
                  </div>
                ) : (
                  <div>
                    <strong className="text-gray-600">You:</strong> Uploaded a file:{' '}
                    <a 
                      href={item.content} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 underline"
                    >
                      {item.fileName}
                    </a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center">Ask me anything about your studies!</p>
          )}
        </div>

        {/* Input Area */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0">
          <input
            id="userInput"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isConnected ? "Ask your question..." : "Connecting to Study Buddy..."}
            disabled={!isConnected || isLoading}
            className="flex-grow p-3 mb-2 md:mb-0 md:mr-2 border border-purple-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSearch}
              disabled={!isConnected || isLoading}
              className={`p-3 ${
                isConnected ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'
              } text-white rounded-md transition`}
            >
              <span className="text-lg">➤</span>
            </button>
            <button
              className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              onClick={() => alert('Voice input feature coming soon!')}
              disabled={!isConnected}
            >
              🎤
            </button>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,application/pdf"
              id="fileInput"
              disabled={!isConnected}
            />
            <label
              htmlFor="fileInput"
              className={`flex items-center p-3 ${
                isConnected ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'
              } text-white rounded-md cursor-pointer transition`}
            >
              Upload File
            </label>
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
            <Link 
              href={item.link} 
              className="mt-4 inline-block py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Learn More
            </Link>
          </div>
        ))}
      </section>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
}