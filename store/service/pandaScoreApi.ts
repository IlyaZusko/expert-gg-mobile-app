import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { IBet } from '../models/Bet';
import { IMatchesList, IPath } from '../models/Matches';
import { IVotedMatch } from '../models/VotedMatches';

import { db } from '@/firebaseConfig';

export const pandaScoreApi = createApi({
  reducerPath: 'pandaScoreApi',
  tagTypes: ['Matches', 'VotedMatches'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.pandascore.co',
    prepareHeaders: async (headers) => {
      headers.set(
        'Authorization',
        `Bearer ${process.env.EXPO_PUBLIC_PANDASCORE_API_KEY}`,
      );
    },
  }),
  endpoints: (build) => ({
    fetchAllMatches: build.query<IMatchesList[], IPath>({
      query: (path) => {
        const { queryParams, slug } = path;
        return {
          url: `/${slug}/matches?filter[detailed_stats]=true&filter[draw]=false&filter[future]=true&filter[opponents_filled]=true&sort=begin_at&page=1&per_page=70${queryParams}`,
          method: 'GET',
        };
      },
      transformResponse: async (response: IMatchesList[]) => {
        const userid = await SecureStore.getItemAsync('session');
        function addVotedFlag(
          objectsArray: IMatchesList[],
          idsArray: number[],
        ) {
          objectsArray.forEach((obj) => {
            if (idsArray.includes(obj.id)) {
              obj.voted = true;
            }
          });
        }
        const betsIds: number[] = [];
        const q = query(collection(db, 'bets'), where('user_id', '==', userid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((bet) => betsIds.push(bet.data().match_id));
        addVotedFlag(response, betsIds);
        return response;
      },
    }),
    fetchBetsMatches: build.query<IVotedMatch[] | null, string | null>({
      query: (params) => ({
        url: params ? `/matches?${params}&sort=` : '/',
        method: 'GET',
      }),
      transformResponse: async (
        response: IMatchesList[],
      ): Promise<IVotedMatch[] | null> => {
        const userid = await SecureStore.getItemAsync('session');
        const bets: IBet[] = [];
        const q = query(collection(db, 'bets'), where('user_id', '==', userid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((bet) => bets.push(bet.data() as IBet));
        if (response.length) {
          const votedMatches: IVotedMatch[] = response.map((match) => {
            const bet = bets.find((bet: IBet) => bet.match_id === match.id);
            return {
              ...match,
              match_id: match.id,
              bet_target_name: bet?.bet_target_name || '',
              coins_amount: bet?.coins_amount.toString() || '0',
              date_of_bet: bet?.date_of_bet || '',
              bet_target_id: bet?.bet_target_id || 0,
            };
          }) as IVotedMatch[];
          return votedMatches;
        } else {
          return [];
        }
      },
      providesTags: ['VotedMatches'],
    }),
  }),
});

export const { useFetchAllMatchesQuery, useFetchBetsMatchesQuery } =
  pandaScoreApi;
