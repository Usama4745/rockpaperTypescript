import React, { useState } from 'react';
import BettingOptions from './components/BettingOptions';
import GameStatus from './components/GameStatus';
import { Bet, BetOption, GameState } from './types';
import './App.css';

const initialBalance = 5000;
const betAmount = 500;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({ balance: initialBalance, bets: [] });

  const placeBet = (option: BetOption) => {
    if (gameState.bets.length < 2 && gameState.balance >= betAmount) {
      setGameState(prevState => ({
        ...prevState,
        bets: [...prevState.bets, { option, amount: betAmount }],
        balance: prevState.balance - betAmount,
      }));
    }
  };

  const getComputerChoice = (): BetOption => {
    const choices: BetOption[] = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const determineResult = (playerBets: Bet[], computerChoice: BetOption) => {
    const winningBets = playerBets.filter(bet => 
      (bet.option === 'rock' && computerChoice === 'scissors') ||
      (bet.option === 'paper' && computerChoice === 'rock') ||
      (bet.option === 'scissors' && computerChoice === 'paper')
    );

    if (winningBets.length === 0) {
      return 'You lost!';
    } else if (winningBets.length === 1) {
      return `You won! Return: ${winningBets[0].amount * 14}`;
    } else {
      return `You won! Return: ${winningBets[0].amount * 3}`;
    }
  };

  const handleBettingDone = () => {
    const computerChoice = getComputerChoice();
    const resultMessage = determineResult(gameState.bets, computerChoice);

    setGameState(prevState => ({
      ...prevState,
      computerChoice,
      resultMessage,
      bets: [],
    }));
  };

  return (
    <div className="App">
      <h1>Rock, Paper, Scissors Game</h1>
      <GameStatus balance={gameState.balance} resultMessage={gameState.resultMessage} />
      <BettingOptions onBet={placeBet} bets={gameState.bets} />
      <button onClick={handleBettingDone} disabled={gameState.bets.length === 0}>Betting Done</button>
    </div>
  );
};

export default App;
