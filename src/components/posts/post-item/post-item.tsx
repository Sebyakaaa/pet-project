import { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';

import { useNavigation } from '../../../hooks/use-navigation';
import {
  deletePostById,
  updatePostContent,
  updatePostFull,
  updatePostTitle,
} from '../../../services/posts-service';
import { BaseButton } from '../../base-button';
import { UploadImage } from '../../upload-image';
import { deletePost, updateItemContent, updateItemFull, updateItemTitle } from '../store/slice';

import { StyledItem } from './styled';

interface PostItemProps {
  id: string;
  title: string;
  image?: string;
  content: string;
}

export const PostItem = ({ id, image, title, content }: PostItemProps) => {
  const { goToPosts } = useNavigation();

  const [editedContent, setEditedContent] = useState(content);
  const [editedTitle, setEditedTitle] = useState(title);
  const [openDialog, setOpenDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState(image || '');

  const dispatch = useDispatch();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent(event.target.value);
  };

  const handleSaveTitleClick = async () => {
    await updatePostTitle(id, editedTitle);
    dispatch(updateItemTitle({ id, title: editedTitle }));
  };

  const handleSaveContentClick = async () => {
    await updatePostContent(id, editedContent);
    dispatch(updateItemContent({ id, content: editedContent }));
  };

  const handleSaveAllClick = async () => {
    await updatePostFull(id, editedTitle, editedContent, imageUrl);
    dispatch(
      updateItemFull({ id, title: editedTitle, content: editedContent, imageUrl: imageUrl }),
    );
    goToPosts();
  };

  const handleCancelClick = () => {
    goToPosts();
  };

  const handleDeleteDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDeletePostClick = async () => {
    await deletePostById(id);
    dispatch(deletePost(id));
    goToPosts();
  };

  const handleDeleteDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDeleteImage = () => {
    setImageUrl('');
  };

  return (
    <StyledItem data-id={id} maxWidth="lg">
      <img src={imageUrl} alt={`Blog Picture-${id}`} />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'flex-end',
          mb: 2,
        }}
      >
        <UploadImage onImageSelect={setImageUrl} showPreview={false} />
        <Button variant="outlined" onClick={handleDeleteImage} startIcon={<DeleteIcon />}>
          Delete image
        </Button>
      </Stack>
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
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'flex-end',
          mb: 3,
        }}
      >
        <BaseButton onClick={handleSaveTitleClick}>Save</BaseButton>
      </Stack>
      <TextField
        fullWidth
        multiline
        rows={10}
        value={editedContent}
        onChange={handleContentChange}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'flex-end',
          mb: 5,
        }}
      >
        <BaseButton onClick={handleSaveContentClick}>Save</BaseButton>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'flex-end',
        }}
      >
        <BaseButton onClick={handleSaveAllClick}>Save all</BaseButton>
        <BaseButton onClick={handleCancelClick}>Cancel</BaseButton>
        <Button variant="outlined" onClick={handleDeleteDialogOpen} startIcon={<DeleteIcon />}>
          Delete post
        </Button>
        <Dialog open={openDialog} onClose={handleDeleteDialogClose} aria-labelledby="delete-dialog">
          <DialogTitle id="delete-dialog">{'Do you want to delete this post?'}</DialogTitle>
          <DialogActions>
            <Button autoFocus onClick={handleDeleteDialogClose}>
              No
            </Button>
            <Button onClick={handleDeletePostClick} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </StyledItem>
  );
};
