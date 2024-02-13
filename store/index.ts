import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { pandaScoreApi } from './service';

const rootReducer = combineReducers({
  [pandaScoreApi.reducerPath]: pandaScoreApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pandaScoreApi.middleware),
});

export default store;
export type IRootState = ReturnType<typeof store.getState>;
