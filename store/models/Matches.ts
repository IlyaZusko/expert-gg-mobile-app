export interface IMatchesList {
  id: number;
  begin_at: string;
  league: {
    id: number;
    name: string;
  };
  opponents: IOpponent[];
  videogame: {
    id: number;
    name: string;
  };
  winner: IWinner | null;
  voted?: boolean;
  isTestMatch?: boolean;
  document_id?: string;
}

interface IWinner {
  id: number;
  name: string;
}

interface IOpponent {
  type: 'Player' | 'Team';
  opponent: {
    id: number;
    name: string;
    image_url: string;
  };
}

export interface IPath {
  slug: string;
  queryParams: string;
}
