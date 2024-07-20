import React from 'react';
import { Bet, BetOption } from '../types';

interface Props {
  onBet: (option: BetOption) => void;
  bets: Bet[];
}

const BettingOptions: React.FC<Props> = ({ onBet, bets }) => {
  const isBetPlaced = (option: BetOption) => bets.some(bet => bet.option === option);

  return (
    <div>
      <button onClick={() => onBet('rock')} disabled={isBetPlaced('rock')}>Rock</button>
      <button onClick={() => onBet('paper')} disabled={isBetPlaced('paper')}>Paper</button>
      <button onClick={() => onBet('scissors')} disabled={isBetPlaced('scissors')}>Scissors</button>
    </div>
  );
};

export default BettingOptions;
