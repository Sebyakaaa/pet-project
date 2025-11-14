import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import {
  createPost,
  deletePostById,
  getPostAll,
  updatePostField,
  updatePostFull,
} from '../services/posts-service';
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

export const removePost = createAsyncThunk(
  'posts/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await deletePostById(id);
      return id;
    } catch (error: any) {
      const message = error.response?.data?.error || error.message || 'Failed to delete post';
      return rejectWithValue(message);
    }
  },
);

export const updatePost = createAsyncThunk(
  'posts/update',
  async (
    {
      id,
      updates,
      fullUpdate = false,
    }: {
      id: string;
      updates: { title?: string; content?: string; imageUrl?: string };
      fullUpdate?: boolean;
    },
    { rejectWithValue },
  ) => {
    try {
      let updatedPost;
      if (fullUpdate) {
        const { title, content, imageUrl } = updates;
        updatedPost = await updatePostFull(id, title, content, imageUrl);
      } else {
        updatedPost = await updatePostField(id, updates);
      }
      return updatedPost;
    } catch (error: any) {
      const message = error.response?.data?.error || error.message || 'Failed to update post';
      return rejectWithValue(message);
    }
  },
);

export const postItemSlice = createSlice({
  name: 'postsList',
  initialState,
  reducers: {},
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
      })
      .addCase(removePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postItems = state.postItems.filter((item) => item.id !== action.payload);
        state.error = null;
      })
      .addCase(removePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.postItems.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.postItems[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const postItemReducer = postItemSlice.reducer;
