import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { EmptyPage } from '../components/empty-page';
import { Loader } from '../components/loader';
import { PostItem } from '../components/posts/post-item/post-item';
import { RootState } from '../store/store';

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
