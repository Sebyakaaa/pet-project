import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { RootState } from '../../../store/store';
import { EmptyPage } from '../../empty-page';
import { Loader } from '../../loader';

import { PostItem } from './post-item';

export const PostItemPage = () => {
  const { id } = useParams<{ id: string }>();

  const { postItems, isLoading, error } = useSelector((state: RootState) => state.postList);
  const post = postItems.find((post) => post.id === id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <EmptyPage />;
  }

  return (
    <PostItem id={post.id} imageUrl={post.imageUrl} title={post.title} content={post.content} />
  );
};
