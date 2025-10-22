import { useParams } from 'react-router';

import { DUMMY_POSTS } from '../posts-list/posts-data';

import { PostItem } from './post-item';

export const PostItemPage = () => {
  const { id } = useParams<{ id: string }>();

  const post = DUMMY_POSTS.find((post) => post.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <PostItem id={post.id} image={post.imageUrl}>
      {post.value}
    </PostItem>
  );
};
