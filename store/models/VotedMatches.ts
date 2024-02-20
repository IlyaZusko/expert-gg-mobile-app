import { IMatchesList } from './Matches';

export interface IVotedMatch extends IMatchesList {
  match_id: number;
  bet_target_name: string;
  coins_amount: string;
  date_of_bet: string;
}
