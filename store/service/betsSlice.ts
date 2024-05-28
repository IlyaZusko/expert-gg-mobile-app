import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IBet } from '../models/Bet';

export interface IProductsState {
  listBets: IBet[];
}

const initialState: IProductsState = {
  listBets: [] as IBet[],
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
    clearListBets: (state) => {
      state.listBets = [] as IBet[];
    },
  },
});

export const { setListBets, clearListBets } = betsSlice.actions;
