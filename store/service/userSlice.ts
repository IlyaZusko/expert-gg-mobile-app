import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IBet, IProfile } from '../models/Profile';

interface IInitialState {
  userProfile: IProfile;
}

const initialState: IInitialState = {
  userProfile: {} as IProfile,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<IProfile>) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setUserProfile } = userSlice.actions;
