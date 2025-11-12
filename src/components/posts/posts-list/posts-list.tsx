import { PostCard } from './post-card';
import { StyledList } from './styled';

type PostsListProps = {
  posts: { id: string; title: string; imageUrl?: string }[];
};

export const PostsList = ({ posts }: PostsListProps) => {
  return (
    <StyledList>
      {posts.map((item) => (
        <PostCard key={item.id} id={item.id} title={item.title} imageUrl={item.imageUrl} />
      ))}
    </StyledList>
  );
};
