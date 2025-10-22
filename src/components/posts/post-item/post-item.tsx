interface PostItemProps {
  children: string;
  id: string;
  image: string;
}

export const PostItem = ({ id, image, children }: PostItemProps) => {
  return (
    <div data-id={id}>
      <img src={image} alt={`Blog Picture-${id}`} />
      <p>{children}</p>
    </div>
  );
};
