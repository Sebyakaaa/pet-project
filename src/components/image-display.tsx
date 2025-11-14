import { NoImageBox } from './no-image-box';

interface ImageDisplayProps {
  id: string;
  imageUrl?: string;
}

export const ImageDisplay = ({ id, imageUrl }: ImageDisplayProps) => {
  return imageUrl ? (
    <img src={imageUrl} loading="lazy" alt={`Blog Picture-${id}`} />
  ) : (
    <NoImageBox />
  );
};
