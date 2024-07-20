import React from 'react';

interface Props {
  balance: number;
  resultMessage?: string;
}

const GameStatus: React.FC<Props> = ({ balance, resultMessage }) => (
  <div>
    <p>Balance: ${balance}</p>
    {resultMessage && <p>{resultMessage}</p>}
  </div>
);

export default GameStatus;
