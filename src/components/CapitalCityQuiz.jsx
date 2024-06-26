import React, { useState } from 'react';
import './capitalcityquiz.css'
import Countries from './Countries.js';

function CapitalCityQuiz() {

  const [totalScore, setTotalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hint, setHint] = useState(null);
  const [userInput, setUserInput] = useState('');

  const generateRandomCountry = () => {
    const randomIndex = Math.floor(Math.random() * Countries.length);
    const randomCountry = Countries[randomIndex];
    return randomCountry;
  };

  const [currentCountry, setCurrentCountry] = useState(generateRandomCountry());

  const nextQuestion = (countries) => {
    const randomCountry = generateRandomCountry();
    setHint(null)
    setUserInput('')
    setCurrentCountry(randomCountry);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userInput = event.target.answer.value;
    const isCorrect = userInput.toLowerCase() === currentCountry.capital.toLowerCase();
    if (isCorrect) {
      setTotalScore(totalScore + 1);
      nextQuestion(Countries); 
    } else {
      setGameOver(true);
    }
    event.target.answer.value = '';
  };

  const handleRestart = () => {
    setTotalScore(0);
    setGameOver(false);
    setHint(null)
    nextQuestion(Countries); 
  };
  console.log(currentCountry)

  const handleSkip = () => {
    setUserInput('')
    nextQuestion(Countries);
  };

  const handleHint = () => {
    const hint = currentCountry.capital.slice(0, 3);
    setHint(hint);
  };

  const handleReveal = () => {
    setUserInput(currentCountry.capital)
  };


  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };
  return (

    <div id="app">
      {gameOver ? (
        <div className="game-over-container">
          <h1>Game over!</h1>
          <p className='game-over'> Your score: {totalScore}</p>
          <button className="restart-button" onClick={handleRestart}>
            Restart
          </button>
        </div>
      ) : (

        <form className="container" onSubmit={handleSubmit}>
          <div className="horizontal-container">

            <h3>
              Total Score: <span id="score">{totalScore}</span>
            </h3>
            {hint && (
              <p className="hint">
                Hint: Starts with <strong>{hint}</strong>
              </p>
            )}
          </div>

          <h1 id="countryName">{currentCountry && currentCountry.country}</h1>
          <div className="answer-container">
            <input
              type="text"
              name="answer"
              id="userInput"
              placeholder="Enter the capital"
              
              autoComplete="off"
              value={userInput}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="button-container">

              <button type="button" onClick={handleReveal}>Reveal</button>
              <button type="button" onClick={handleSkip}>Skip</button>
              <button type="button" onClick={handleHint}>Hint</button>
            </div>
          </div>
          <button type="submit">SUBMIT</button>

        </form>
      )
      }
    </div>

  );
}

export default CapitalCityQuiz;
