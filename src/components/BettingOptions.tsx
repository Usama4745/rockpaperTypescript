import React from 'react';
import { Bet, BetOption } from '../types';
import './BettingOptions.css';

interface Props {
  onBet: (option: BetOption) => void;
  bets: Bet[];
}

const BettingOptions: React.FC<Props> = ({ onBet, bets }) => {
  const isBetPlaced = (option: BetOption) => bets.some(bet => bet.option === option);

  return (
    <div className="betting-options">
      <button className="bet-button rock" onClick={() => onBet('rock')} disabled={isBetPlaced('rock')}>
        <div className="circle">500</div>
        <span>Rock</span>
      </button>
      <button className="bet-button paper" onClick={() => onBet('paper')} disabled={isBetPlaced('paper')}>
        <div className="circle">500</div>
        <span>Paper</span>
      </button>
      <button className="bet-button scissors" onClick={() => onBet('scissors')} disabled={isBetPlaced('scissors')}>
        <div className="circle">500</div>
        <span>Scissors</span>
      </button>
    </div>
  );
};

export default BettingOptions;
