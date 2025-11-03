import { PostDTO } from '../types/post-dto';

import { apiService } from './api-service';

export const getPostById = (id: number): Promise<PostDTO> => {
  return apiService.get(`/${id}`);
};

export const getPosttAll = (): Promise<PostDTO> => {
  return apiService.get();
};

export const createPost = (title: string, content: string): Promise<PostDTO> => {
  return apiService.post('', { title, content });
};

export const updatePostFull = (id: number, title: string, content: string): Promise<PostDTO> => {
  return apiService.put(`/${id}`, { title, content });
};

export const updatePostTitle = (id: string, title: string): Promise<PostDTO> => {
  return apiService.patch(`/${id}`, { title });
};

export const updatePostContent = (id: string, content: string): Promise<PostDTO> => {
  return apiService.patch(`/${id}`, { content });
};

export const deletePostById = (id: number): Promise<PostDTO> => {
  return apiService.delete(`/${id}`);
};
