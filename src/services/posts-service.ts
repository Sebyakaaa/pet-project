import { PostDTO } from '../types/post-dto';

import { apiService } from './api-service';

export const getPostById = (id: string): Promise<PostDTO> => {
  return apiService.get(id);
};

export const getPostAll = (): Promise<PostDTO[]> => {
  return apiService.get();
};

export const createPost = (title: string, content: string, imageUrl?: string): Promise<PostDTO> => {
  return apiService.post('', { title, content, imageUrl });
};

export const updatePostFull = (
  id: string,
  title?: string,
  content?: string,
  imageUrl?: string,
): Promise<PostDTO> => {
  return apiService.put(id, { title, content, imageUrl });
};

export const updatePostField = (
  id: string,
  updates: { title?: string; content?: string },
): Promise<PostDTO> => {
  return apiService.patch(id, updates);
};

// export const updatePostTitle = (id: string, title: string): Promise<PostDTO> => {
//   return apiService.patch(id, { title });
// };

// export const updatePostContent = (id: string, content: string): Promise<PostDTO> => {
//   return apiService.patch(id, { content });
// };

export const deletePostById = (id: string): Promise<PostDTO> => {
  return apiService.delete(id);
};
