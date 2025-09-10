import React, { useState } from 'react';
import './quiz.css'
import quizData from '../../data/quizData';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    const isCorrect = answer === quizData[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Store the user's answer
    const newAnswer = {
      questionIndex: currentQuestionIndex,
      selectedAnswer: answer,
      correctAnswer: quizData[currentQuestionIndex].correctAnswer,
      isCorrect: isCorrect
    };
    setUserAnswers([...userAnswers, newAnswer]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setSelectedAnswer(null);
      setShowFeedback(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 90) return { message: "Excellent! You're well-prepared for emergencies!", emoji: "🏆", color: "#059669" };
    if (percentage >= 70) return { message: "Good job! You have solid knowledge of CPR.", emoji: "👏", color: "#0891B2" };
    if (percentage >= 50) return { message: "Not bad! Consider reviewing the instructions.", emoji: "📚", color: "#EA580C" };
    return { message: "Keep learning! Practice makes perfect.", emoji: "💪", color: "#DC2626" };
  };

  const scoreData = getScoreMessage();

  return (
    <div className='quiz-container'>
      <div className="quiz-wrapper">
        {!quizStarted ? (
          <div className="start-screen">
            <div className="start-icon">🧠</div>
            <h1>CPR Knowledge Test</h1>
            <p>Test your understanding of CPR and first aid procedures with our interactive quiz.</p>
            <div className="quiz-info">
              <div className="info-item">
                <span className="info-number">{quizData.length}</span>
                <span className="info-label">Questions</span>
              </div>
              <div className="info-item">
                <span className="info-number">~20</span>
                <span className="info-label">Minutes</span>
              </div>
            </div>
            <button className='start-button' onClick={handleStartQuiz}>
              Start Quiz
            </button>
          </div>
        ) : showScore ? (
          <div className="score-screen">
            <div className="score-header">
              <div className="score-icon" style={{ color: scoreData.color }}>
                {scoreData.emoji}
              </div>
              <h1>Quiz Complete!</h1>
              <div className="score-display">
                <span className="score-number" style={{ color: scoreData.color }}>
                  {score}
                </span>
                <span className="score-total">/ {quizData.length}</span>
              </div>
              <div className="score-percentage" style={{ color: scoreData.color }}>
                {Math.round((score / quizData.length) * 100)}%
              </div>
              <p className="score-message" style={{ color: scoreData.color }}>
                {scoreData.message}
              </p>
            </div>

            <div className="score-actions">
              <button className='restart-button' onClick={handleStartQuiz}>
                Retake Quiz
              </button>
              <button
                className='restart-button'
                onClick={() => {
                  handleStartQuiz(); // restart the quiz
                  window.location.href = 'https://lifesaver.nightingale.uni-mainz.de'; // redirection to Home Page
                }}
              >
                Home
              </button>
            </div>
          </div>
        ) : (
          <div className="question-screen">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}
              ></div>
            </div>
            
            <div className="question-header">
              <span className="question-counter">
                Question {currentQuestionIndex + 1} of {quizData.length}
              </span>
            </div>

            <div className="question-content">
              <h2 className="question-text">{quizData[currentQuestionIndex].question}</h2>
              
              <div className="options-container">
                {quizData[currentQuestionIndex].options.map((option, index) => {
                  let buttonClass = 'option-button';
                  
                  if (showFeedback) {
                    if (option === quizData[currentQuestionIndex].correctAnswer) {
                      buttonClass += ' correct';
                    } else if (option === selectedAnswer && option !== quizData[currentQuestionIndex].correctAnswer) {
                      buttonClass += ' incorrect';
                    } else if (option !== selectedAnswer) {
                      buttonClass += ' disabled';
                    }
                  } else if (selectedAnswer === option) {
                    buttonClass += ' selected';
                  }

                  return (
                    <button
                      key={index}
                      className={buttonClass}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showFeedback}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="option-text">{option}</span>
                      {showFeedback && option === quizData[currentQuestionIndex].correctAnswer && (
                        <span className="option-icon correct-icon">✓</span>
                      )}
                      {showFeedback && option === selectedAnswer && option !== quizData[currentQuestionIndex].correctAnswer && (
                        <span className="option-icon incorrect-icon">✗</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="question-actions">
              <button 
                className='next-button' 
                onClick={handleNext} 
                disabled={!showFeedback}
              >
                {currentQuestionIndex === quizData.length - 1 ? 'View Results' : 'Next Question'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;