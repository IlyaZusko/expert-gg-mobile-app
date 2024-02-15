import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';
import { doc, getDoc } from 'firebase/firestore';

import { IMatchesList, IPath } from '../models/Matches';

import { db } from '@/firebaseConfig';

interface IBet {
  match_id: number;
}

export const pandaScoreApi = createApi({
  reducerPath: 'pandaScoreApi',
  tagTypes: ['UserTag'],
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
        const queryParams = path.queryParams;
        const game = path.slug;
        return {
          url: `/${game}/matches?filter[detailed_stats]=true&filter[draw]=false&filter[future]=true&filter[opponents_filled]=true&sort=begin_at&page=1&per_page=70${queryParams}`,
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
        if (userid) {
          const docRef = doc(db, 'users', userid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const betsIds = data.bets
              ? data.bets.map((bet: IBet) => bet.match_id)
              : [];
            addVotedFlag(response, betsIds);
            return response;
          }
        }

        return response;
      },
    }),
  }),
});

export const { useFetchAllMatchesQuery } = pandaScoreApi;
