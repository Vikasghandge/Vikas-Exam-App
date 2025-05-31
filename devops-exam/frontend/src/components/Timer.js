import React, { useEffect, useState } from 'react';

const Timer = ({ initialMinutes, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Calculate percentage for progress bar
  const percentage = (timeLeft / (initialMinutes * 60)) * 100;
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xl font-bold">
          Time Left: {minutes}:{seconds < 10 ? '0' : ''}{seconds}
        </div>
        <div className={`text-lg font-semibold ${
          minutes < 2 ? 'text-red-600 animate-pulse' : 'text-gray-700'
        }`}>
          {minutes < 1 ? 'HURRY UP!' : 'Keep going!'}
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div 
          className={`h-4 rounded-full ${
            percentage > 50 ? 'bg-green-500' : 
            percentage > 25 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
