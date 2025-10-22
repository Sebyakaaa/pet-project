import { createSlice } from '@reduxjs/toolkit';

import { DUMMY_POSTS } from '../posts-list/posts-data';

type PostItem = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
};

export interface PostItemState {
  postItems: PostItem[];
}

const initialState: PostItemState = {
  postItems: DUMMY_POSTS,
};

export const postItemSlice = createSlice({
  name: 'postsList',
  initialState,
  reducers: {
    updateItemTitle: (
      state,
      { payload: { id, title } }: { payload: { id: string; title: string } },
    ) => {
      const postItems = state.postItems.find((item) => item.id === id);

      if (postItems) {
        postItems.title = title;
      }
    },
  },
});

export const postItemReducer = postItemSlice.reducer;

export const { updateItemTitle } = postItemSlice.actions;
