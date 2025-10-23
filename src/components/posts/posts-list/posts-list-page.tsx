import { useSelector } from 'react-redux';

import { RootState } from '../store/store';

import { AddNewPost } from './add-new-post';
import { PostsList } from './posts-list';

export const PostsListPage = () => {
  const posts = useSelector((state: RootState) => state.postList.postItems);

  return (
    <>
      <AddNewPost />
      <PostsList posts={posts} />
    </>
  );
};
