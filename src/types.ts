export type BetOption = 'rock' | 'paper' | 'scissors';

export interface Bet {
  option: BetOption;
  amount: number;
}

export interface GameState {
  balance: number;
  bets: Bet[];
  computerChoice?: BetOption;
  resultMessage?: string;
  totalBets: number;
  totalWins: number;
}
