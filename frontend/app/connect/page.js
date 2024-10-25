"use client"; // Declare this component as a Client Component

import { useState } from 'react';
import Link from 'next/link';

export default function Connect() {
  const [searchTerm, setSearchTerm] = useState('');
  const channels = [
    { id: 1, name: 'AI & Machine Learning', description: 'Discuss the latest in AI technology and machine learning algorithms.' },
    { id: 2, name: 'Web Development', description: 'Join to share and learn about web development best practices and tools.' },
    { id: 3, name: 'Mobile App Development', description: 'Collaborate on mobile app projects and share tips and resources.' },
    { id: 4, name: 'Data Science', description: 'Discuss data analysis, visualization, and machine learning techniques.' },
    { id: 5, name: 'Cybersecurity', description: 'Stay updated on the latest trends in cybersecurity and best practices.' },
    { id: 6, name: 'Blockchain & Crypto', description: 'Explore blockchain technology and cryptocurrency discussions.' },
    { id: 7, name: 'Digital Marketing', description: 'Learn about SEO, PPC, and social media strategies.' },
    { id: 8, name: 'Graphic Design', description: 'Share your design work and get feedback from peers.' },
    { id: 9, name: 'Content Writing', description: 'Discuss content strategies and improve your writing skills.' },
    { id: 10, name: 'Project Management', description: 'Share tips and tools for effective project management.' },
    { id: 11, name: 'Video Production', description: 'Collaborate on video projects and share editing tips.' },
    { id: 12, name: 'Photography', description: 'Discuss photography techniques and share your work.' },
    { id: 13, name: 'Finance & Investing', description: 'Learn about stock market, investments, and financial planning.' },
    { id: 14, name: 'Health & Wellness', description: 'Share tips on fitness, nutrition, and mental health.' },
    { id: 15, name: 'Entrepreneurship', description: 'Discuss business ideas and strategies for startups.' },
    { id: 16, name: 'Game Development', description: 'Collaborate on game design and programming techniques.' },
    { id: 17, name: 'Sustainable Living', description: 'Share tips for eco-friendly living and sustainability practices.' },
    { id: 18, name: 'Educational Technology', description: 'Discuss tools and strategies for modern education.' },
    { id: 19, name: 'Travel & Adventure', description: 'Share travel experiences and tips for adventurers.' },
    { id: 20, name: 'Music & Arts', description: 'Discuss music theory, composition, and share your artwork.' },
  ];

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col p-6 ">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Join Community Channels</h1>
      
      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search channels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-purple-500 rounded-md w-80 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
        />
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredChannels.length > 0 ? (
          filteredChannels.map((channel) => (
            <div key={channel.id} id={`channel-${channel.id}`} className="bg-white rounded-lg shadow-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl font-semibold text-purple-600">{channel.name}</h2>
              <p className="text-gray-700 mt-3">{channel.description}</p>
              <Link href={`/channel/${channel.id}`} className="mt-5 inline-block py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                Join
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center col-span-full">No channels found.</p>
        )}
      </div>
    </div>
  );
}
