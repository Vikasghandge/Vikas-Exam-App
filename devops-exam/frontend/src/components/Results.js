import React from 'react';

const Results = ({ results, student }) => {
  const percentage = Math.round((results.score / results.total) * 100);
  
  const getResultColor = () => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 65) return 'text-blue-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getResultEmoji = () => {
    if (percentage >= 85) return '🎉';
    if (percentage >= 65) return '👍';
    if (percentage >= 50) return '🙂';
    return '💪';
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Exam Results {getResultEmoji()}
      </h1>
      
      <div className="bg-gray-50 rounded-xl p-8 mb-8 border border-gray-200">
        <div className="text-center mb-6">
          <div className="text-2xl font-semibold mb-2">Student: {student.name}</div>
          <div className="text-lg text-gray-600">DevOps Certification Exam</div>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 stroke-current"
                strokeWidth="8"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className={`${getResultColor()} stroke-current`}
                strokeWidth="8"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray={`${percentage} ${100 - percentage}`}
                strokeDashoffset="25"
                transform="rotate(-90 50 50)"
              ></circle>
              <text
                x="50"
                y="50"
                className="text-2xl font-bold"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {results.score}/{results.total}
              </text>
            </svg>
          </div>
        </div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold mb-4 ${getResultColor()}`}>
            {percentage}% - {results.message}
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-green-100 p-4 rounded-lg">
              <div className="text-xl font-bold text-green-700">{results.score}</div>
              <div className="text-gray-600">Correct</div>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <div className="text-xl font-bold text-red-700">{results.wrong}</div>
              <div className="text-gray-600">Wrong</div>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <div className="text-xl font-bold text-blue-700">{results.total}</div>
              <div className="text-gray-600">Total</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-10">
        <div className="text-2xl font-bold text-gray-800 mb-6">
          This exam application developed by Vikas G. Patil
        </div>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <p className="text-yellow-700">
            {percentage >= 85 
              ? "You've demonstrated exceptional DevOps knowledge! Consider pursuing AWS certifications."
              : percentage >= 65 
                ? "Solid understanding! Review the questions you missed to improve further."
                : percentage >= 50 
                  ? "Good effort! Focus on your weaker areas and try again."
                  : "DevOps is a journey! Review the fundamentals and practice more."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;
