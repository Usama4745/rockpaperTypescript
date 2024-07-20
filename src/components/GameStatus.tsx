import React from 'react';

interface Props {
  balance: number;
  resultMessage?: string;
  totalBets: number;
  totalWins: number;
}

const GameStatus: React.FC<Props> = ({ balance, resultMessage, totalBets, totalWins }) => (
  <div className="game-status">
    {resultMessage && <p>{resultMessage}</p>}
    <p>Total Bets: ${totalBets}</p>
    <p>Total Wins: ${totalWins}</p>
  </div>
);

export default GameStatus;
