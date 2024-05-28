import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { betsSlice, pandaScoreApi, userSlice } from './service';

const rootReducer = combineReducers({
  [pandaScoreApi.reducerPath]: pandaScoreApi.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [betsSlice.reducerPath]: betsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pandaScoreApi.middleware),
});

export default store;
export type IRootState = ReturnType<typeof rootReducer>;
