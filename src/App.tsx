import React, { useState } from 'react';
import BettingOptions from './components/BettingOptions';
import GameStatus from './components/GameStatus';
import { Bet, BetOption, GameState } from './types';
import './App.css';

// Constants
const INITIAL_BALANCE = 5000;
const BET_AMOUNT = 500;
const MAX_BETS = 2;
const MULTIPLIER_ONE_WIN = 14;
const MULTIPLIER_TWO_WINS = 3;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    balance: INITIAL_BALANCE,
    bets: [],
    totalBets: 0,
    totalWins: 0,
  });

  // Function to handle placing a bet
  const placeBet = (option: BetOption) => {
    if (gameState.bets.length < MAX_BETS && gameState.balance >= BET_AMOUNT) {
      setGameState(prevState => ({
        ...prevState,
        bets: [...prevState.bets, { option, amount: BET_AMOUNT }],
        balance: prevState.balance - BET_AMOUNT,
        totalBets: prevState.totalBets + BET_AMOUNT,
      }));
    }
  };

  // Function to get the computer's choice
  const getComputerChoice = (): BetOption => {
    const choices: BetOption[] = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
  };

  // Function to determine the result of the game
  const determineResult = (playerBets: Bet[], computerChoice: BetOption) => {
    const winningBets = playerBets.filter(
      bet =>
        (bet.option === 'rock' && computerChoice === 'scissors') ||
        (bet.option === 'paper' && computerChoice === 'rock') ||
        (bet.option === 'scissors' && computerChoice === 'paper')
    );

    let resultMessage: string;
    let totalWins = 0;

    if (winningBets.length === 0) {
      resultMessage = 'You lost!';
    } else if (winningBets.length === 1) {
      totalWins = winningBets[0].amount * MULTIPLIER_ONE_WIN;
      resultMessage = `${winningBets[0].option.charAt(0).toUpperCase() + winningBets[0].option.slice(1)} won! Return: ${totalWins}`;
    } else {
      totalWins = winningBets[0].amount * MULTIPLIER_TWO_WINS;
      resultMessage = `${winningBets[0].option.charAt(0).toUpperCase() + winningBets[0].option.slice(1)} and ${winningBets[1].option} won! Return: ${totalWins}`;
    }

    setGameState(prevState => ({
      ...prevState,
      computerChoice,
      resultMessage,
      balance: prevState.balance + totalWins,
      totalWins: prevState.totalWins + totalWins,
      bets: [],
    }));
  };

  // Function to handle the completion of betting
  const handleBettingDone = () => {
    const computerChoice = getComputerChoice();
    determineResult(gameState.bets, computerChoice);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="balance"><span className='headingText'>Balance:</span> ${gameState.balance}</div>
        <div className="bet"><span className='headingText'>Bet:</span> ${gameState.totalBets}</div>
        <div className="win"><span className='headingText'>Win:</span> ${gameState.totalWins}</div>
      </header>
      <div className='mainbody'>
        {/* Conditionally render "Pick Your Positions" text */}
        {gameState.bets.length === 0 && <h1 className='headingText'>Pick Your Positions</h1>}
        <BettingOptions onBet={placeBet} bets={gameState.bets} />
        <button className="play-button" onClick={handleBettingDone} disabled={gameState.bets.length === 0}>
          Play
        </button>
        <GameStatus
          balance={gameState.balance}
          resultMessage={gameState.resultMessage}
          totalBets={gameState.totalBets}
          totalWins={gameState.totalWins}
        />
      </div>
    </div>
  );
};

export default App;
