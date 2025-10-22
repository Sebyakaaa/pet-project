import { PostCard } from './post-card';
import { StyledList } from './styled';

type PostsListProps = {
  posts: { id: string; value: string; imageUrl: string }[];
};

export const PostsList = ({ posts }: PostsListProps) => {
  return (
    <StyledList>
      {posts.map((item) => (
        <PostCard key={item.id} id={item.id} image={item.imageUrl}>
          {item.value}
        </PostCard>
      ))}
    </StyledList>
  );
};
