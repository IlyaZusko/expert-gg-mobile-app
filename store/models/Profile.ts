export interface IProfile {
  email: string;
  username: string;
  coins: number;
  avatar_url: string;
  count_wins: number;
  total_earn: number;
  status: string;
}

export interface IBet {
  document_id?: string;
  bet_target_id: number;
  bet_target_name: string;
  coins_amount: number;
  date_of_bet: string;
  match_id: number;
  isBetWon: boolean | null;
}
