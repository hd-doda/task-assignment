import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { auth } from '../firebase';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Icons for correct and incorrect answers

const StudentDashboardPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // Track selected answers
  const [submittedQuestions, setSubmittedQuestions] = useState(null); // Track submitted questions and answers
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch questions and submitted answers from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch questions
        const questionsResponse = await fetch('https://assignment-backend-ejto.onrender.com/api/questions/get-questions');
        const questionsData = await questionsResponse.json();
        setQuestions(questionsData);

        // Fetch submitted answers
        const submittedResponse = await fetch(
          `https://assignment-backend-ejto.onrender.com/api/results/get-result?studentId=${auth.currentUser.uid}`
        );
        const submittedData = await submittedResponse.json();
        console.log('Submitted Data:', submittedData); // Debugging log

        if (submittedData.answers) {
          setSubmittedQuestions(submittedData.answers); // Track submitted question IDs and answers
        } else {
          setSubmittedQuestions({}); // Initialize as empty object if no answers exist
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle answer selection
  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  // Handle form submission for a single question
  const handleSubmit = async (questionId) => {
    if (!answers[questionId]) {
      alert('Please select an answer before submitting.');
      return;
    }

    try {
      const response = await fetch('https://assignment-backend-ejto.onrender.com/api/results/save-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: auth.currentUser.uid,
          answers: { [questionId]: answers[questionId] }, // Submit only the selected question
        }),
      });

      const data = await response.json();
      console.log('Submit Response:', data); // Debugging log

      if (response.ok) {
        alert('Answer submitted successfully!');
        setSubmittedQuestions((prev) => ({ ...prev, [questionId]: answers[questionId] })); // Update submitted questions
        setAnswers((prevAnswers) => {
          const updatedAnswers = { ...prevAnswers };
          delete updatedAnswers[questionId]; // Remove the submitted answer from the state
          return updatedAnswers;
        });
      } else if (response.status === 400 && data.duplicateQuestions) {
        alert('You have already submitted an answer for this question.');
      } else {
        alert('Failed to submit answer.');
      }
    } catch (err) {
      console.error('Error submitting answer:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <p className="text-lg text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Navbar />
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Student Dashboard</h1>
          <p className="text-lg text-gray-200">Answer the questions and track your progress.</p>
        </div>

        {/* Questions Container */}
        <div className="max-w-4xl mx-auto space-y-6">
          {questions.map((question) => {
            const isSubmitted = submittedQuestions && submittedQuestions[question._id]; // Check if the question is submitted
            const studentAnswer = submittedQuestions && submittedQuestions[question._id]; // Get the student's answer
            const correctAnswer = question.correct_answer; // Get the correct answer

            return (
              <div
                key={question._id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-800">{question.question_text}</h2>
                {isSubmitted ? (
                  <>
                    <ul className="space-y-3">
                      {question.options.map((option, idx) => {
                        const isCorrect = option === correctAnswer;
                        const isStudentAnswer = option === studentAnswer;
                        const isIncorrect = isStudentAnswer && !isCorrect;

                        return (
                          <li
                            key={idx}
                            className={`p-3 rounded-md flex items-center ${
                              isCorrect
                                ? 'bg-green-50 border border-green-500'
                                : isIncorrect
                                ? 'bg-red-50 border border-red-500'
                                : 'bg-gray-50'
                            }`}
                          >
                            {isCorrect && <FaCheck className="text-green-600 mr-2" />}
                            {isIncorrect && <FaTimes className="text-red-600 mr-2" />}
                            <span className="text-gray-700">{option}</span>
                            {isCorrect && (
                              <span className="ml-2 text-green-600 font-medium">(Correct Answer)</span>
                            )}
                            {isIncorrect && (
                              <span className="ml-2 text-red-600 font-medium">(Your Answer)</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <>
                    <ul className="space-y-3">
                      {question.options.map((option, idx) => (
                        <li key={idx} className="flex items-center">
                          <input
                            type="radio"
                            name={`question-${question._id}`}
                            value={option}
                            onChange={() => handleAnswerChange(question._id, option)}
                            className="mr-3 h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                            disabled={isSubmitted} // Disable if already submitted
                          />
                          <span className="text-gray-700">{option}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleSubmit(question._id)}
                      className="mt-4 w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={isSubmitted} // Disable if already submitted
                    >
                      Submit Answer
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
