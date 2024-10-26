// app/layout.js

"use client";
import './globals.css'; 
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import { usePathname } from 'next/navigation'; 

export default function RootLayout({ children }) {
  const pathname = usePathname(); 

  // List of routes where the Header and Footer should not be displayed
  const noHeaderFooterRoutes = ['/login', '/register'];

  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-purple-400 via-blue-300 to-blue-100 min-h-screen">
        {/* Conditionally render Header */}
        {!noHeaderFooterRoutes.includes(pathname) && <Header />}

        {/* Main content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Conditionally render Footer */}
        {!noHeaderFooterRoutes.includes(pathname) && <Footer />}
      </body>
    </html>
  );
}
