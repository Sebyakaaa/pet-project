import { useNavigation } from '../../../hooks/use-navigation';

import { StyledCard } from './styled';

interface PostCardProps {
  children: string;
  id: string;
  image: string;
}

export const PostCard = ({ id, image, children }: PostCardProps) => {
  const { goToPostItem } = useNavigation();
  const handleClick = () => {
    goToPostItem(id);
  };

  return (
    <StyledCard data-id={id} maxWidth="sm" onClick={handleClick}>
      <img src={image} loading="lazy" alt={`Blog Picture-${id}`} />
      <p>{children}</p>
    </StyledCard>
  );
};
