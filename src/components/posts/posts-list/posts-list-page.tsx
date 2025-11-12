import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { Loader } from '../../loader';

import { AddNewPost } from './add-new-post';
import { PostsList } from './posts-list';

export const PostsListPage = () => {
  const { isLoading, postItems } = useSelector((state: RootState) => state.postList);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AddNewPost />
      <PostsList posts={postItems} />
    </>
  );
};
