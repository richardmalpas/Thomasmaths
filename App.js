import React, { useState, useEffect, useRef } from 'react';

export const App = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [endGameMessage, setEndGameMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    generateQuestions();
  }, []);

  useEffect(() => {
    if (questionIndex === 10) {
      endGame();
    }
  }, [questionIndex]);

  const generateQuestions = () => {
    const newQuestions = [];
    for (let i = 0; i < 10; i++) {
      const category = Math.floor(Math.random() * 3); // 0: multiplication, 1: square, 2: cube
      let question, answer;
      switch (category) {
        case 0: // Multiplication
          const num1 = Math.floor(Math.random() * 10) + 1;
          const num2 = Math.floor(Math.random() * 10) + 1;
          question = `What is ${num1} x ${num2}?`;
          answer = num1 * num2;
          break;
        case 1: // Square
          const squareNum = Math.floor(Math.random() * 10) + 1;
          question = `What is the square of ${squareNum}?`;
          answer = squareNum * squareNum;
          break;
        case 2: // Cube
          const cubeNum = Math.floor(Math.random() * 5) + 1;
          question = `What is the cube of ${cubeNum}?`;
          answer = cubeNum * cubeNum * cubeNum;
          break;
        default:
          break;
      }
      newQuestions.push({ question, answer: answer.toString() });
    }
    setQuestions(newQuestions);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue === questions[questionIndex].answer) {
      setScore(score + 1);
      setAnswerStatus(true);
    } else {
      setAnswerStatus(false);
    }
    setInputValue('');
    setTimeout(() => {
      setAnswerStatus(null);
      setQuestionIndex(questionIndex + 1);
      inputRef.current.focus();
    }, 1000);
  };

  const endGame = () => {
    let message = '';
    if (score === 10) {
      message = "Wow, Thomas! You're a math genius! You got all the answers right!";
    } else if (score >= 7) {
      message = "Great job, Thomas! You're really good at math!";
    } else if (score >= 4) {
      message = "Good effort, Thomas! Keep practicing, and you'll get even better!";
    } else {
      message = "Don't worry, Thomas! Math can be tricky, but you'll get better with practice!";
    }
    setEndGameMessage(message);
  };

  return (
    <div style={{ backgroundColor: '#333', color: 'green', textShadow: '1px 1px 1px black', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Thomas's Ultimate Number Game</h1>
        {questionIndex < questions.length ? (
          <div style={{ marginBottom: '40px', transition: 'all 0.3s' }}>
            <p style={{ fontSize: '20px', color: 'green' }}>Question {questionIndex + 1}: {questions[questionIndex].question}</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                ref={inputRef}
                autoFocus
                style={{ padding: '10px', fontSize: '16px', border: 'none', borderRadius: '20px', borderBottom: '2px solid green', boxShadow: '1px 1px 1px black', outline: 'none', width: '200px', transition: 'box-shadow 0.3s' }}
              />
              <br />
              <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '10px', marginTop: '20px' }}>Submit</button>
            </form>
            {answerStatus !== null && (
              <div style={{ marginTop: '10px' }}>
                {answerStatus ? (
                  <p style={{ fontSize: '18px', color: 'green', textShadow: '1px 1px 1px black', animation: 'correct-answer 1s linear' }}>Correct!</p>
                ) : (
                  <p style={{ fontSize: '18px', color: 'red', textShadow: '1px 1px 1px black', animation: 'wrong-answer 1s linear' }}>Incorrect!</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <p>Game Over!</p>
            <p>Your score is: {score.toLocaleString('en-US', { maximumFractionDigits: 0 })} googols</p>
            <p>{endGameMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
  
