import { IVotedMatch } from './VotedMatches';

export interface IBet extends IVotedMatch {
  document_id: string;
  bet_target_id: number;
  bet_target_name: string;
  date_of_bet: string;
  match_id: number;
  isBetWon: boolean | null;
  testMatchId: string;
}
