import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { RootState } from '../store/store';

import { PostItem } from './post-item';

export const PostItemPage = () => {
  const { id } = useParams<{ id: string }>();

  const posts = useSelector((state: RootState) => state.postList.postItems);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <PostItem id={post.id} image={post.imageUrl} title={post.title} content={post.content} />;
};
