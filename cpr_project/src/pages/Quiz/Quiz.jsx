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
                <span className="info-number">~5</span>
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

            <div className="score-details">
              <h3>Review Your Answers</h3>
              <div className="answers-review">
                {userAnswers.map((answer, index) => (
                  <div key={index} className={`review-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="review-header">
                      <span className="question-number">Q{index + 1}</span>
                      <span className={`result-badge ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                        {answer.isCorrect ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="review-content">
                      <p className="review-question">{quizData[index].question}</p>
                      <div className="review-answers">
                        <div className={`review-answer your-answer ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                          <span className="answer-label">Your answer:</span>
                          <span className="answer-text">{answer.selectedAnswer}</span>
                        </div>
                        {!answer.isCorrect && (
                          <div className="review-answer correct-answer">
                            <span className="answer-label">Correct answer:</span>
                            <span className="answer-text">{answer.correctAnswer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="score-actions">
              <button className='restart-button' onClick={handleStartQuiz}>
                Retake Quiz
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

              {showFeedback && (
                <div className={`feedback ${selectedAnswer === quizData[currentQuestionIndex].correctAnswer ? 'correct' : 'incorrect'}`}>
                  {selectedAnswer === quizData[currentQuestionIndex].correctAnswer ? (
                    <div className="feedback-content">
                      <span className="feedback-icon">🎉</span>
                      <span className="feedback-text">Correct! Well done.</span>
                    </div>
                  ) : (
                    <div className="feedback-content">
                      <span className="feedback-icon">💡</span>
                      <span className="feedback-text">
                        The correct answer is: {quizData[currentQuestionIndex].correctAnswer}
                      </span>
                    </div>
                  )}
                </div>
              )}
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