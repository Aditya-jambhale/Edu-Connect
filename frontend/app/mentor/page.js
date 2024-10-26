// app/mentor/page.js

"use client";

import { useState, useEffect } from "react";

export default function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [showOnlyLive, setShowOnlyLive] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    // Replace with actual API call
    setMentors([
      { id: 1, name: "John Doe", expertise: "AI Specialist", isLive: true },
      { id: 2, name: "Jane Smith", expertise: "Web Developer", isLive: false },
      { id: 3, name: "Alex Johnson", expertise: "Data Scientist", isLive: true },
    ]);
  }, []);

  const openChat = (mentor) => {
    setSelectedMentor(mentor);
    setMessages([]); // Reset messages when opening a new chat
  };

  const closeChat = () => {
    setSelectedMentor(null);
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "student", text: chatInput },
      ]);
      setChatInput("");

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "mentor", text: "Hello! How can I help you?" },
        ]);
      }, 1000);
    }
  };

  const filteredMentors = showOnlyLive
    ? mentors.filter((mentor) => mentor.isLive)
    : mentors;

  return (
    <div id="mentors-section" idname="mentorsSection" className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 id="mentors-title" idname="mentorsTitle" className="text-5xl font-bold text-center text-blue-600">
          Our Mentors
        </h1>
        <p id="mentors-description" idname="mentorsDescription" className="text-lg text-center text-gray-700 max-w-2xl mx-auto">
          Connect with our mentors for personalized guidance. Toggle to see only those who are currently live and available for chat.
        </p>

        <div id="filter-toggle" idname="filterToggle" className="flex justify-center">
          <label htmlFor="show-live-toggle" className="flex items-center space-x-2">
            <input
              id="show-live-toggle"
              idname="showLiveToggle"
              type="checkbox"
              checked={showOnlyLive}
              onChange={() => setShowOnlyLive(!showOnlyLive)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-800">Show Only Live Mentors</span>
          </label>
        </div>

        <div id="mentor-cards-container" idname="mentorCardsContainer" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              id={`mentor-card-${mentor.id}`}
              idname={`mentorCard${mentor.id}`}
              className={`border rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 ${
                mentor.isLive ? "border-green-500" : "border-gray-300"
              }`}
            >
              <h2 id={`mentor-name-${mentor.id}`} idname={`mentorName${mentor.id}`} className="text-2xl font-semibold text-gray-800">
                {mentor.name}
              </h2>
              <p id={`mentor-expertise-${mentor.id}`} idname={`mentorExpertise${mentor.id}`} className="text-gray-600">
                {mentor.expertise}
              </p>
              <span
                id={`mentor-status-${mentor.id}`}
                idname={`mentorStatus${mentor.id}`}
                className={`mt-2 inline-block text-sm font-medium ${
                  mentor.isLive ? "text-green-600" : "text-gray-500"
                }`}
              >
                {mentor.isLive ? "Live Now" : "Offline"}
              </span>
              {mentor.isLive && (
                <button
                  id={`chat-button-${mentor.id}`}
                  idname={`chatButton${mentor.id}`}
                  onClick={() => openChat(mentor)}
                  className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-700 transform hover:scale-105"
                >
                  Chat Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Modal */}
      {selectedMentor && (
        <div id="chat-modal" idname="chatModal" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div id="chat-box" idname="chatBox" className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 id="chat-title" idname="chatTitle" className="text-xl font-semibold text-gray-800">
              Chat with {selectedMentor.name}
            </h3>
            <div id="chat-messages" idname="chatMessages" className="border-t border-gray-200 mt-4 overflow-y-auto max-h-60 p-4 space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  id={`message-${index}`}
                  idname={`message${index}`}
                  className={`flex ${msg.sender === "student" ? "justify-end" : "justify-start"}`}
                >
                  <span
                    className={`inline-block px-4 py-2 rounded-lg ${
                      msg.sender === "student" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <div id="chat-input" idname="chatInput" className="flex mt-4">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none"
                placeholder="Type a message..."
              />
              <button
                id="send-message-button"
                idname="sendMessageButton"
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
            <button
              id="close-chat-button"
              idname="closeChatButton"
              onClick={closeChat}
              className="mt-4 w-full text-center text-blue-600 underline"
            >
              Close Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
