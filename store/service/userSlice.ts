import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IBet } from '../models/Profile';

interface IInitialState {
  bets: IBet[];
}

const initialState: IInitialState = {
  bets: [],
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setBets: (state, action: PayloadAction<IBet[]>) => {
      state.bets = action.payload;
    },
  },
});

export const { setBets } = userSlice.actions;
