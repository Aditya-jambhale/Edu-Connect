

"use client"; // Declare this component as a Client Component

import { useState, useEffect } from 'react'; // Importing hooks from React
import Link from 'next/link'; // Importing Link from Next.js for navigation

const OptionsSection = () => {
  // Sample data for options
  const options = [
    { title: 'Current To-Do Task', description: 'Complete your assignments!', link: '/todowork' },
    { title: 'Study Buddy', description: 'Find a study partner!', link: '/' },
    { title: 'Boost Mind', description: 'Enhance your learning experience!', link: '/boostmind' },
    { title: 'Study Materials', description: 'Access study materials here!', link: '/' },
    // Additional options can be added here
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {options.map((item, index) => (
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
  );
};

export default OptionsSection;
