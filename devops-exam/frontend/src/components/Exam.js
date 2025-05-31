import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from './Timer';
import Results from './Results';

const Exam = ({ student }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions');
        setQuestions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load questions. Please try again.');
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, []);

  const handleAnswer = (qid, option) => {
    setAnswers(prev => ({ ...prev, [qid]: option }));
  };

  const handleSubmit = async () => {
    if (submitted) return;
    setSubmitted(true);
    
    const answerArray = Object.entries(answers).map(([qid, selectedOption]) => ({
      questionId: parseInt(qid),
      selectedOption
    }));

    try {
      const response = await axios.post('/api/submit', { answers: answerArray });
      setResults(response.data);
    } catch (err) {
      setError('Submission failed. Please try again.');
      setSubmitted(false);
    }
  };

  const handleTimeout = () => {
    if (!submitted) {
      handleSubmit();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {error}
      </div>
    );
  }

  if (submitted && results) {
    return <Results results={results} student={student} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          DevOps Certification Exam
        </h1>
        <div className="text-center text-gray-600 mb-6">
          Student: {student.name} | Questions: 15 | Time: 20 minutes
        </div>
        
        <Timer initialMinutes={20} onTimeout={handleTimeout} />
      </div>
      
      <div className="space-y-8">
        {questions.map((q, index) => (
          <div key={q.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-start mb-4">
              <div className="bg-blue-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{q.question}</h3>
                <span className="inline-block bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full mt-1">
                  {q.category}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
              {Object.entries(JSON.parse(q.options)).map(([key, value]) => (
                <label 
                  key={key} 
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    answers[q.id] === key 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    checked={answers[q.id] === key}
                    onChange={() => handleAnswer(q.id, key)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <span className="ml-3 text-lg">{key}) {value}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-200 shadow-lg"
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
};

export default Exam;
