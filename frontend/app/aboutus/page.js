"use client"; // This line makes the component a Client Component

import { useState } from 'react';

export default function AboutUs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is EduConnect?",
      answer: "EduConnect is a platform that connects students with mentors to provide personalized guidance and resources for academic and career success."
    },
    {
      question: "How can I join EduConnect?",
      answer: "You can join EduConnect by signing up on our website and creating a profile to connect with mentors."
    },
    {
      question: "What services do you offer?",
      answer: "We offer mentorship programs, career guidance, resources for learning, and community support to help students succeed."
    },
    {
      question: "Is there a fee to use EduConnect?",
      answer: "EduConnect is free for students. Our goal is to provide accessible mentorship and resources."
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen  py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-5xl font-bold text-center text-blue-600">About EduConnect</h1>
        <p className="text-lg text-center text-gray-800 max-w-2xl mx-auto mb-8">
          EduConnect is more than just a platform; it’s a community where students and mentors collaborate, innovate, and thrive. Our mission is to provide personalized guidance that helps students reach their academic and career goals.
        </p>

        {/* Our Vision Section */}
        <div className=" rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
          <h2 className="text-3xl font-semibold text-blue-600 text-center">Our Vision</h2>
          <p className="mt-4 text-gray-700 text-center">
            To empower every student with the knowledge, skills, and mentorship necessary to excel in their academic and professional journeys.
          </p>
        </div>

        {/* Image Section with Increased Height and Style */}
          <img
            src="/edu1.jpg" // Replace with your image path
            alt="Vision"
            className="w-full h-[800px] object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          />
         

        {/* Our Mission Section */}
        <div className=" rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
          <h2 className="text-3xl font-semibold text-blue-600 text-center">Our Mission</h2>
          <p className="mt-4 text-gray-700 text-center">
            To connect students with experienced mentors, providing them with the resources and support they need to achieve their aspirations.
          </p>
        </div>

        {/* Frequently Asked Questions Section */}
        <div className=" rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-semibold text-blue-600 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b last:border-b-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full py-4 text-left text-lg font-medium text-gray-800 hover:text-blue-600 focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                    &#9662; {/* Down arrow */}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="pl-6 pb-4 text-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
