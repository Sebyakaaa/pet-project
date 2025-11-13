import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import { createPost, deletePostById, getPostAll } from '../services/posts-service';
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

export const createNewPost = createAsyncThunk(
  'posts/create',
  async (
    { title, content, imageUrl }: { title: string; content: string; imageUrl?: string },
    { rejectWithValue },
  ) => {
    try {
      const newPost = await createPost(title, content, imageUrl);
      return newPost;
    } catch (error: any) {
      const message = error.response?.data?.error || error.message || 'Failed to create post';
      return rejectWithValue(message);
    }
  },
);

export const postItemSlice = createSlice({
  name: 'postsList',
  initialState,
  reducers: {
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
      })
      .addCase(createNewPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postItems.unshift(action.payload); //add to the top
        state.error = null;
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const postItemReducer = postItemSlice.reducer;

export const { updatePost, deletePost } = postItemSlice.actions;
