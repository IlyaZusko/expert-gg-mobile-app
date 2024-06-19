import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IBet } from '../models/Bet';
import { IMatchesList } from '../models/Matches';

export interface IProductsState {
  listBets: IBet[];
  listTestMatches: IMatchesList[];
}

const initialState: IProductsState = {
  listBets: [] as IBet[],
  listTestMatches: [] as IMatchesList[],
};

export const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    setListBets: (state, action: PayloadAction<IBet>) => {
      if (
        !state.listBets.find(
          (bets) => bets.document_id === action.payload.document_id,
        )
      ) {
        state.listBets = [...state.listBets, action.payload];
      }
    },
    setListTestMatches: (state, action: PayloadAction<IMatchesList>) => {
      if (
        !state.listTestMatches.find(
          (matches) => matches.id === action.payload.id,
        )
      ) {
        state.listTestMatches = [...state.listTestMatches, action.payload];
      }
    },
    clearListTestMatches: (state) => {
      state.listTestMatches = [] as IMatchesList[];
    },
    clearListBets: (state) => {
      state.listBets = [] as IBet[];
    },
  },
});

export const {
  setListBets,
  clearListBets,
  setListTestMatches,
  clearListTestMatches,
} = betsSlice.actions;
