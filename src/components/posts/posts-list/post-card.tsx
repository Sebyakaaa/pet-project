import { useNavigation } from '../../../hooks/use-navigation';

import { StyledCard } from './styled';

interface PostCardProps {
  title: string;
  id: string;
  image: string;
}

export const PostCard = ({ id, image, title }: PostCardProps) => {
  const { goToPostItem } = useNavigation();
  const handleClick = () => {
    goToPostItem(id);
  };

  return (
    <StyledCard data-id={id} maxWidth="sm" sx={{ p: 3 }} onClick={handleClick}>
      <img src={image} loading="lazy" alt={`Blog Picture-${id}`} />
      <h3>{title}</h3>
    </StyledCard>
  );
};
