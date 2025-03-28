import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const InstructorDashboardPage = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting question:', { question_text: question, options, correct_answer: correctAnswer });
      const response = await fetch('https://assignment-backend-ejto.onrender.com/api/questions/create-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question_text: question, options, correct_answer: correctAnswer }),
      });
      if (response.ok) {
        alert('Question created successfully!');
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('');
      } else {
        console.error('Failed to create question:', await response.text());
        alert('Failed to create question.');
      }
    } catch (err) {
      console.error('Error creating question:', err);
      alert('An error occurred while creating the question.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Navbar />
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Instructor Dashboard</h1>
          <p className="text-lg text-gray-200">Create questions for your students.</p>
        </div>

        {/* Form Card */}
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the question"
                required
              />
            </div>

            {/* Options Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
              {options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  placeholder={`Option ${index + 1}`}
                  required
                />
              ))}
            </div>

            {/* Correct Answer Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
              <input
                type="text"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the correct answer"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Create Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboardPage;
