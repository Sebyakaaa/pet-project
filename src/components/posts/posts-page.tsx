import { DUMMY_POSTS } from './posts-data';
import { PostsList } from './posts-list';

export const PostsPage = () => {
  return <PostsList posts={DUMMY_POSTS} />;
};
