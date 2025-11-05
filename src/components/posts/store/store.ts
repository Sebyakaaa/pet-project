import { configureStore } from '@reduxjs/toolkit';

import { postItemReducer } from './slice';

export const store = configureStore({
  reducer: {
    postList: postItemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
