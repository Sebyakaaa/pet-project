import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getPostAll } from '../services/posts-service';
import { PostDTO } from '../types/post-dto';

interface PostItemUpdate extends Partial<PostDTO> {
  id: string;
}

export interface PostItemState {
  postItems: PostDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostItemState = {
  postItems: [],
  isLoading: true,
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const posts = await getPostAll();
    return posts;
  } catch (error: any) {
    const message = error.response?.data?.error || error.message || 'Failed to load posts';
    return rejectWithValue(message);
  }
});

export const postItemSlice = createSlice({
  name: 'postsList',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<PostDTO>) => {
      state.postItems.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<PostItemUpdate>) => {
      const { id, ...updates } = action.payload;
      const postItem = state.postItems.find((item) => item.id === id);

      if (postItem) {
        Object.assign(postItem, updates);
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.postItems = state.postItems.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postItems = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const postItemReducer = postItemSlice.reducer;

export const { addPost, updatePost, deletePost } = postItemSlice.actions;
