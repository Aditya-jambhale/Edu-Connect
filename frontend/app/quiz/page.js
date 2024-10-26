// 'use client';

// import { useState } from 'react';

// export default function QuizPage() {
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [score, setScore] = useState(0);
//   const [feedback, setFeedback] = useState('');
//   const [numQuestions, setNumQuestions] = useState(5); // Default number of questions
//   const [quizLevel, setQuizLevel] = useState('Easy'); // Default quiz level
//   const [quizTitle, setQuizTitle] = useState('Html'); // Default quiz title

//   // Sample quizzes with questions
//   const quizOptions = [
//     {
//       id: 'Html',
//       title: 'HTML Quiz',
//       level: 'Easy',
//       questions: [
//         {
//           id: 1,
//           question: 'What does HTML stand for?',
//           options: ['Hyper Text Markup Language', 'High Text Markup Language', 'Hyper Tabular Markup Language', 'None of these'],
//           correct: 0,
//         },
//         {
//           id: 2,
//           question: 'Which HTML element defines the title of a document?',
//           options: ['<meta>', '<title>', '<head>', '<body>'],
//           correct: 1,
//         },
//       ],
//     },
//     {
//       id: 'Java',
//       title: 'Java Quiz',
//       level: 'Medium',
//       questions: [
//         {
//           id: 1,
//           question: 'Which of these is not a Java feature?',
//           options: ['Object-Oriented', 'Use of pointers', 'Portable', 'Dynamic'],
//           correct: 1,
//         },
//         {
//           id: 2,
//           question: 'Which Java keyword is used to create a subclass?',
//           options: ['extends', 'super', 'implements', 'this'],
//           correct: 0,
//         },
//       ],
//     },
//     {
//       id: 'Css',
//       title: 'CSS Quiz',
//       level: 'Hard',
//       questions: [
//         {
//           id: 1,
//           question: 'What does CSS stand for?',
//           options: ['Colorful Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets'],
//           correct: 1,
//         },
//         {
//           id: 2,
//           question: 'Which property is used to change the font of an element?',
//           options: ['font-family', 'font-size', 'text-style', 'font-weight'],
//           correct: 0,
//         },
//       ],
//     },
//     // Add other quizzes similarly...
//   ];

//   // Start the quiz with the selected quiz category
//   const startQuiz = () => {
//     const quiz = quizOptions.find((q) => q.id === quizTitle);
//     if (!quiz) return; // If no quiz found, do nothing

//     setSelectedQuiz(quiz);
//     setQuizStarted(true);
//     setCurrentQuestion(0);
//     setScore(0);
//     setSelectedOption(null);
//     setFeedback('');
//   };

//   // Submit the answer
//   const submitAnswer = () => {
//     if (selectedOption === null) return; // If no option selected, do nothing

//     const currentQues = selectedQuiz.questions[currentQuestion];

//     // Provide feedback based on the correct answer
//     if (selectedOption === currentQues.correct) {
//       setScore(score + 1);
//       setFeedback('Correct!');
//     } else {
//       setFeedback(`Wrong! The correct answer was: ${currentQues.options[currentQues.correct]}`);
//     }

//     // After a delay, move to the next question or finish the quiz
//     setTimeout(() => {
//       if (currentQuestion < selectedQuiz.questions.length - 1) {
//         setCurrentQuestion(currentQuestion + 1);
//         setSelectedOption(null); // Reset selected option
//         setFeedback(''); // Reset feedback for the next question
//       } else {
//         alert(`Quiz finished! Your score is: ${score + 1}/${selectedQuiz.questions.length}`);
//         setQuizStarted(false); // End the quiz
//       }
//     }, 1500); // Delay to show feedback for 1.5 seconds
//   };

//   // Restart the quiz
//   const restartQuiz = () => {
//     setQuizStarted(false);
//     setCurrentQuestion(0);
//     setSelectedOption(null);
//     setScore(0);
//     setFeedback('');
//   };

//   // Filter questions based on selected level and number
//   const getFilteredQuestions = (quiz) => {
//     return quiz.questions.slice(0, numQuestions);
//   };

//   return (
//     <div id="quiz-container" className="min-h-screen flex flex-col items-center justify-center p-4">
//       {/* Quiz Selection Page */}
//       {!quizStarted && !selectedQuiz && (
//         <div id="quiz-selection" className="text-center">
//           <h1 id="quiz-title" className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6">
//             Choose Your Quiz
//           </h1>

//           {/* Quiz Title Selection */}
//           <div className="mb-6">
//             <label className="mr-4">Quiz Title:</label>
//             <select value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} className="border rounded p-2">
//               {quizOptions.map((quiz) => (
//                 <option key={quiz.id} value={quiz.id}>
//                   {quiz.title}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Number of Questions Selection */}
//           <div className="mb-6">
//             <label className="mr-4">Number of Questions:</label>
//             <input
//               type="number"
//               value={numQuestions}
//               onChange={(e) => setNumQuestions(Math.min(Math.max(1, e.target.value), 30))} // Limit to 1-30
//               className="border rounded p-2"
//               min="1"
//               max="30"
//             />
//           </div>

//           {/* Quiz Level Selection */}
//           <div className="mb-6">
//             <label className="mr-4">Quiz Level:</label>
//             <select value={quizLevel} onChange={(e) => setQuizLevel(e.target.value)} className="border rounded p-2">
//               <option value="Easy">Easy</option>
//               <option value="Medium">Medium</option>
//               <option value="Hard">Hard</option>
//             </select>
//           </div>

//           <button
//             onClick={startQuiz}
//             className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
//           >
//             Start Quiz
//           </button>
//         </div>
//       )}

//       {/* Quiz Content */}
//       {quizStarted && selectedQuiz && (
//         <div id="quiz-question-section" className="w-full h-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
//           <h2 id="question-number" className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
//             {selectedQuiz.title} - Question {currentQuestion + 1} of {numQuestions}
//           </h2>
//           <p id="question-text" className="text-lg text-gray-700 mb-6">
//             {getFilteredQuestions(selectedQuiz)[currentQuestion].question}
//           </p>

//           {/* Progress Bar */}
//           <div id="progress-bar" className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
//             <div
//               className="bg-blue-600 h-2.5 rounded-full"
//               style={{
//                 width: `${((currentQuestion + 1) / numQuestions) * 100}%`,
//               }}
//             ></div>
//           </div>

//           {/* Options */}
//           <div id="quiz-options" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             {getFilteredQuestions(selectedQuiz)[currentQuestion].options.map((option, index) => (
//               <label
//                 key={index}
//                 id={`option-${index}`}
//                 className={`p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition ${
//                   selectedOption === index ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="option"
//                   value={index}
//                   checked={selectedOption === index}
//                   onChange={() => setSelectedOption(index)}
//                   className="mr-2"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>

//           {/* Feedback */}
//           {feedback && (
//             <div id="feedback-message" className="text-center mb-4 text-lg text-green-600">
//               {feedback}
//             </div>
//           )}

//           {/* Submit Button */}
//           <div id="quiz-actions" className="flex justify-between">
//             <button
//               id="submit-answer-button"
//               onClick={submitAnswer}
//               className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
//               disabled={selectedOption === null}
//             >
//               {currentQuestion < getFilteredQuestions(selectedQuiz).length - 1 ? 'Next Question' : 'Submit Answer'}
//             </button>
//             <button
//               id="restart-quiz-button"
//               onClick={restartQuiz}
//               className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
//             >
//               Restart Quiz
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import axios from 'axios';

// const response = await axios.get(`/api/generateQuiz?subject=${subject}&numQuestions=${numQuestions}`);
// const response = await axios.get(`http://localhost:5000/api/generateQuiz?subject=${subject}&numQuestions=${numQuestions}`);


export default function QuizPage() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [numQuestions, setNumQuestions] = useState(5); // Default number of questions
  const [subject, setSubject] = useState('Math'); // Default subject

  const subjects = ['Math', 'Science', 'History', 'Geography', 'Literature'];

  // Fetch dynamic questions from the API
  const fetchDynamicQuestions = async () => {
    try {
      const response = await axios.get(`/api/generateQuiz?subject=${subject}&numQuestions=${numQuestions}`);
      setQuizQuestions(response.data.questions);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    }
  };

  // Start the quiz
  const startQuiz = async () => {
    await fetchDynamicQuestions();
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setFeedback('');
  };

  // Submit the answer
  const submitAnswer = () => {
    if (selectedOption === null) return; // If no option selected, do nothing

    const currentQues = quizQuestions[currentQuestion];

    // Provide feedback based on the correct answer
    if (selectedOption === currentQues.correct) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback(`Wrong! The correct answer was: ${currentQues.options[currentQues.correct]}`);
    }

    // After a delay, move to the next question or finish the quiz
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null); // Reset selected option
        setFeedback(''); // Reset feedback for the next question
      } else {
        alert(`Quiz finished! Your score is: ${score + 1}/${quizQuestions.length}`);
        setQuizStarted(false); // End the quiz
      }
    }, 1500); // Delay to show feedback for 1.5 seconds
  };

  // Restart the quiz
  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setFeedback('');
  };

  return (
    <div id="quiz-container" className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Quiz Selection Page */}
      {!quizStarted && (
        <div id="quiz-selection" className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6">
            Choose Your Quiz
          </h1>

          {/* Subject Selection */}
          <div className="mb-6">
            <label className="mr-4">Select Subject:</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="border rounded p-2">
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Number of Questions Selection */}
          <div className="mb-6">
            <label className="mr-4">Number of Questions (Max 25):</label>
            <input
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Math.min(Math.max(1, e.target.value), 25))} // Limit to 1-25
              className="border rounded p-2"
              min="1"
              max="25"
            />
          </div>

          <button
            onClick={startQuiz}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Start Quiz
          </button>
        </div>
      )}

      {/* Quiz Content */}
      {quizStarted && quizQuestions.length > 0 && (
        <div id="quiz-question-section" className="w-full h-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            Question {currentQuestion + 1} of {numQuestions}
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            {quizQuestions[currentQuestion].question}
          </p>

          {/* Options */}
          <div id="quiz-options" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <label
                key={index}
                className={`p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition ${selectedOption === index ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
              >
                <input
                  type="radio"
                  name="option"
                  value={index}
                  checked={selectedOption === index}
                  onChange={() => setSelectedOption(index)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="text-center mb-4 text-lg text-green-600">
              {feedback}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-between">
            <button
              onClick={submitAnswer}
              className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
              disabled={selectedOption === null}
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Submit Answer'}
            </button>
            <button
              onClick={restartQuiz}
              className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
