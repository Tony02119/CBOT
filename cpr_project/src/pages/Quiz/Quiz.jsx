import React, { useState } from 'react';
import './quiz.css'
import quizData from '../../data/quizData';

const Quiz = () => {

  // Handling the current step
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Handling the selected answer
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Handling the quiz score
  const [score, setScore] = useState(0);

  // End of the quiz handling the final score
  const [showScore, setShowScore] = useState(false);

  //Check if the quiz started or not
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === quizData[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setSelectedAnswer(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
    }
  };


  return (
    <div className='box'>

      <div className="quiz-card">
        {!quizStarted ? (  // If the quiz did not start show the start button
          <button className='start-button' onClick={handleStartQuiz}>Click to Start</button>
        ) : showScore ? (  // If the showscore is true display the result
          <div className='score-div'>
            <h2>Your Score: {score} / {quizData.length}</h2>
            <button className='button' onClick={handleStartQuiz}>Restart Quiz</button>
          </div>
        ) : ( // Else show the current question
          <div className='question-div'>
            <div className="info-div">
              <h2>Question {currentQuestionIndex + 1} of {quizData.length}</h2> {/* Display which question out of total lenght of the quiz */}
              <h3>{quizData[currentQuestionIndex].question}</h3> {/* Display the current question */}
            </div>
            <div className='options-div'> {/* The current question's options div */}
              {quizData[currentQuestionIndex].options.map((option, index) => ( // Map through the options and create a button for each option
                <button className='option-button'
                  key={index}
                  onClick={() => handleAnswerSelect(option)} //  Onclick check if the answer is correct
                  disabled={selectedAnswer !== null}
                  style={{
                    backgroundColor: // Change the backgourd color of the selected option according the answer is correct
                      selectedAnswer === option
                        ? (option === quizData[currentQuestionIndex].correctAnswer
                          ? 'green' // If not make the correct option lightgreen
                          : 'red')  // And the chosen one is red
                        : (selectedAnswer !== null && option === quizData[currentQuestionIndex].correctAnswer
                          ? 'lightgreen' // If the aswer is correct make it green
                          : '')
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className='button' onClick={handleNext} disabled={selectedAnswer === null}>
              {currentQuestionIndex === quizData.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Quiz;