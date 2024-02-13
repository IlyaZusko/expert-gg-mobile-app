import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IMatchesList, IPath } from '../models/Matches';

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
    test: build.query<IMatchesList[], IPath>({
      query: (path) => {
        const queryParams = path.queryParams;
        const game = path.slug;
        console.log(`/${game}/${queryParams}`);
        return {
          url: `/${game}/matches?filter[detailed_stats]=true&filter[draw]=false&filter[future]=true&filter[opponents_filled]=true&sort=begin_at&page=1&per_page=70${queryParams}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useTestQuery } = pandaScoreApi;
