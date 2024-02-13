export interface IMatchesList {
  id: number;
  begin_at: string;
  league: {
    id: number;
    name: string;
  };
  opponents: IOpponent[];
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
