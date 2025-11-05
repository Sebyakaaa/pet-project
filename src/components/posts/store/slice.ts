import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PostItem = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
};

export interface PostItemState {
  postItems: PostItem[];
}

const initialState: PostItemState = {
  postItems: [],
};

export const postItemSlice = createSlice({
  name: 'postsList',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostItem[]>) => {
      state.postItems = action.payload;
    },
    addPost: (state, action: PayloadAction<PostItem>) => {
      state.postItems.push(action.payload);
    },
    updateItemTitle: (
      state,
      { payload: { id, title } }: { payload: { id: string; title: string } },
    ) => {
      const postItems = state.postItems.find((item) => item.id === id);

      if (postItems) {
        postItems.title = title;
      }
    },
    updateItemContent: (
      state,
      { payload: { id, content } }: { payload: { id: string; content: string } },
    ) => {
      const postItem = state.postItems.find((item) => item.id === id);
      if (postItem) {
        postItem.content = content;
      }
    },
  },
});

export const postItemReducer = postItemSlice.reducer;

export const { setPosts, addPost, updateItemTitle, updateItemContent } = postItemSlice.actions;
