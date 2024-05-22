import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IProfile } from '../models/Profile';

interface IInitialState {
  userProfile: IProfile;
  isShowPopup: boolean;
}

const initialState: IInitialState = {
  userProfile: {} as IProfile,
  isShowPopup: false,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<IProfile>) => {
      state.userProfile = action.payload;
    },
    setShowPopup: (state, action: PayloadAction<boolean>) => {
      state.isShowPopup = action.payload;
    },
  },
});

export const { setUserProfile, setShowPopup } = userSlice.actions;
