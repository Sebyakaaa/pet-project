import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../components/loader';
import { AddNewPost } from '../components/posts/posts-list/add-new-post';
import { PostsList } from '../components/posts/posts-list/posts-list';
import { RootState } from '../store/store';

export const PostsListPage = () => {
  const { isLoading, postItems } = useSelector((state: RootState) => state.postList);

  return (
    <>
      <AddNewPost />
      <PostsList posts={postItems} />
      {isLoading && <Loader />}
    </>
  );
};
