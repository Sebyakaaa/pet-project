import { useState } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';

import { useNavigation } from '../../../hooks/use-navigation';
import { BaseButton } from '../../base-button';
import { updateItemTitle } from '../store/slice';

import { StyledItem } from './styled';

interface PostItemProps {
  id: string;
  title: string;
  image: string;
  content: string;
}

export const PostItem = ({ id, image, title, content }: PostItemProps) => {
  const { goToPosts } = useNavigation();
  const [editedContent, setEditedContent] = useState(content);
  const [editedTitle, setEditedTitle] = useState(title);

  const dispatch = useDispatch();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleSaveClick = () => {
    dispatch(updateItemTitle({ id, title: editedTitle }));
    console.log('Saved:', id, editedTitle);
  };

  const handlePostsClick = () => {
    goToPosts();
  };

  return (
    <StyledItem data-id={id} maxWidth="lg">
      <img src={image} alt={`Blog Picture-${id}`} />
      <TextField
        fullWidth
        multiline
        value={editedTitle}
        onChange={handleTitleChange}
        variant="outlined"
        sx={{ mb: 2 }}
        InputProps={{
          style: { fontSize: '24px' },
        }}
      />
      <TextField
        fullWidth
        multiline
        rows={10}
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'flex-end',
        }}
      >
        <BaseButton onClick={handleSaveClick}>Save</BaseButton>
        <BaseButton>Cancel</BaseButton>
      </Stack>
      <BaseButton onClick={handlePostsClick}>Posts</BaseButton>
    </StyledItem>
  );
};
