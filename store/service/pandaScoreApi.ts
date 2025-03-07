import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { IMatchesList, IPath } from '../models/Matches';
import { IBet } from '../models/Profile';
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
      transformResponse: async (response: IMatchesList[]) => {
        const userid = await SecureStore.getItemAsync('session');
        const bets: IBet[] = [];
        const q = query(collection(db, 'bets'), where('user_id', '==', userid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((bet) => bets.push(bet.data() as IBet));
        const votedMatches = response.map((match) => {
          const bet = bets.find((bet: IBet) => bet.match_id === match.id);
          return { ...match, ...bet };
        });
        return votedMatches;
      },
      providesTags: ['VotedMatches'],
    }),
  }),
});

export const { useFetchAllMatchesQuery, useFetchBetsMatchesQuery } =
  pandaScoreApi;
