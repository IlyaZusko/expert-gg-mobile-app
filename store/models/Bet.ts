export interface IBet {
  document_id: string;
  bet_target_id: number;
  bet_target_name: string;
  coins_amount: number;
  date_of_bet: string;
  match_id: number;
  isBetWon: boolean | null;
}
