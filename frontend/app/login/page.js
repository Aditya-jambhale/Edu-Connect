"use client"; // This is necessary for using client-side hooks like useState
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function Login() {
  const [userType, setUserType] = useState(''); // User type: mentor or student
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Initialize router for navigation

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from submitting the traditional way

    if (!userType) {
      setError('Please select a user type.');
      return;
    }

    setLoading(true); // Start loading when the form is submitted
    setError(null); // Clear previous errors

    // Determine the login endpoint based on userType
    const endpoint = userType === 'mentor' ? '/professional/login' : '/user/login';

    try {
      // Send POST request to Flask backend
      const response = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": email,
          "password": password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Login successful, handle the parsed data
        console.log('Login successful!', data);
        localStorage.setItem('token', data.token);
        // setSuccessMessage('Login successful! Redirecting...');
        setError("Login Sucess")
        router.push('/'); // Redirect to homepage
      } else if (response.status === 401) {
        // Handle invalid email or password
        setError(data.message || 'Invalid email or password');
      } 
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Stop loading after the request is finished
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      
      {/* Left Side: Logo and EduConnect Text */}
      <div className="absolute top-4 left-4 flex items-center space-x-4">
        {/* Logo */}
        {/* <Image src="/sun.jpg" alt="EduConnect Logo" width={20} height={20} /> */}

        {/* EduConnect */}
        <span className="font-bold text-purple-600">EduConnect</span>
      </div>

      {/* Left Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-r from-indigo-50 to-indigo-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg">
          <h2 className="text-4xl font-bold text-center mb-6 text-black">Sign in</h2>
          <p className="text-center text-purple-800 mb-4">Please login to continue to your account.</p>

          {/* Error message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Login As Options */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Login as:</label>
            <div className="flex justify-around mt-2">
              <button
                id="mentor-option"
                onClick={() => setUserType('mentor')}
                className={`w-1/2 py-2 rounded-lg ${userType === 'mentor' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-purple-600 hover:text-white transition`}
              >
                Mentor
              </button>
              <button
                id="student-option"
                onClick={() => setUserType('student')}
                className={`w-1/2 py-2 rounded-lg ${userType === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-purple-600 hover:text-white transition`}
              >
                Student
              </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email-input"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password-input"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center">
                <input type="checkbox" id="remember-me" className="form-checkbox h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-sm text-gray-600">Keep me logged in</span>
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            {/* Divider */}
            <div className="text-center text-sm text-gray-500 my-4">or</div>

            {/* Sign in with Google */}
            <button
              type="button"
              className="w-full py-2 px-4 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-green-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center"
            >
              <img 
                src="/google.jpg" 
                alt="Google Logo" 
                className="w-5 h-5 mr-2" 
              />
              Sign in with Google
            </button>
          </form>

          {/* Create account link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Need an account? <a href="#" className="text-indigo-600 font-medium hover:text-indigo-500">Create one</a>
          </p>
        </div>
      </div>

      {/* Right Side: Image */}
      <div 
        className="w-full lg:w-1/2 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("/edu1.jpg")', height: '100vh' }}
      >
        {/* The image will always be visible on all screens */}
      </div>
    </div>
  );
}
