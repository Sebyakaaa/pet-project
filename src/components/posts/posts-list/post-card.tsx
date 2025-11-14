import { useNavigation } from '../../../hooks/use-navigation';
import { PostCardDTO } from '../../../types/post-dto';
import { ImageDisplay } from '../../image-display';

import { StyledCard } from './styled';

type PostCardProps = PostCardDTO;

export const PostCard = ({ id, imageUrl, title }: PostCardProps) => {
  const { goToPostItem } = useNavigation();
  const handleClick = () => {
    goToPostItem(id);
  };

  return (
    <StyledCard data-id={id} maxWidth="sm" sx={{ p: 3 }} onClick={handleClick}>
      <h3>{title}</h3>
      <ImageDisplay id={id} imageUrl={imageUrl} />
    </StyledCard>
  );
};
