// layout.js

"use client"; // This marks the component as a Client Component

import './globals.css'; 
import Header from './components/Header'; // Import Header component
import Footer from './components/Footer'; // Import Footer component
import { usePathname } from 'next/navigation'; // Use Next.js hook for pathname detection

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current route

  // List of routes where the Header and Footer should not be displayed
  const noHeaderFooterRoutes = ['/login', '/register'];

  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-purple-400 via-blue-300 to-blue-100 min-h-screen">
        {/* Conditionally render Header */}
        {!noHeaderFooterRoutes.includes(pathname) && <Header />}

        {/* The rest of the page will render below the header */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Conditionally render Footer */}
        {!noHeaderFooterRoutes.includes(pathname) && <Footer />}
      </body>
    </html>
  );
}