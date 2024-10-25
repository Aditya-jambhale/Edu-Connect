// components/Footer.js
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-400 via-blue-300 to-blue-100  py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          
          {/* Quick Links */}
          <div className="flex flex-col mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:underline">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">Contact</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          {/* Social Media Links */}
          <div className="flex flex-col mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" className="hover:text-blue-500">
                <FaFacebookF size={20} />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-blue-400">
                <FaTwitter size={20} />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="hover:text-pink-500">
                <FaInstagram size={20} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="hover:text-blue-700">
                <FaLinkedinIn size={20} />
              </Link>
            </div>
          </div>
          
          {/* Help & Support */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Help & Support</h3>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Get Assistance
            </button>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} EduConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
