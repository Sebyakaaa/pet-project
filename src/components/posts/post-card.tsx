import { StyledCard } from './styled';

interface PostCardProps {
  children: string;
  id: string;
  image: string;
}

export const PostCard = ({ id, image, children }: PostCardProps) => {
  return (
    <StyledCard data-id={id}>
      <img src={image} alt={`Blog Picture-${id}`} />
      <p>{children}</p>
    </StyledCard>
  );
};
