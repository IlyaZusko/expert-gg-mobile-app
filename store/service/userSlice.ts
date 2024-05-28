import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IProfile } from '../models/Profile';

interface IInitialState {
  userProfile: IProfile;
  isAuthError: boolean;
  isBlockedError: boolean;
  isNotVerifyError: boolean;
}

const initialState: IInitialState = {
  userProfile: {} as IProfile,
  isAuthError: false,
  isBlockedError: false,
  isNotVerifyError: false,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<IProfile>) => {
      state.userProfile = action.payload;
    },
    setIsAuthError: (state, action: PayloadAction<boolean>) => {
      state.isAuthError = action.payload;
    },
    setIsBlockedError: (state, action: PayloadAction<boolean>) => {
      state.isBlockedError = action.payload;
    },
    setIsNotVerifyError: (state, action: PayloadAction<boolean>) => {
      state.isNotVerifyError = action.payload;
    },
  },
});

export const {
  setUserProfile,
  setIsAuthError,
  setIsBlockedError,
  setIsNotVerifyError,
} = userSlice.actions;
