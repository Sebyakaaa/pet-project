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
import { deletePostById, updatePostField, updatePostFull } from '../../../services/posts-service';
import { deletePost, updatePost } from '../../../store/slice';
import { PostDTO } from '../../../types/post-dto';
import { BaseButton } from '../../base-button';
import { UploadImage } from '../../upload-image';

import { StyledItem } from './styled';

type PostItemProps = PostDTO;

export const PostItem = ({ id, imageUrl: image, title, content }: PostItemProps) => {
  const { goToPosts } = useNavigation();

  const [editedContent, setEditedContent] = useState(content);
  const [editedTitle, setEditedTitle] = useState(title);
  const [openDialog, setOpenDialog] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState(image || '');

  const dispatch = useDispatch();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent(event.target.value);
  };

  const handleSaveTitleClick = async () => {
    await updatePostField(id, { title: editedTitle });
    dispatch(updatePost({ id, title: editedTitle }));
  };

  const handleSaveContentClick = async () => {
    await updatePostField(id, { content: editedContent });
    dispatch(updatePost({ id, content: editedContent }));
  };

  const handleSaveAllClick = async () => {
    await updatePostFull(id, editedTitle, editedContent, newImageUrl);
    dispatch(updatePost({ id, title: editedTitle, content: editedContent, imageUrl: newImageUrl }));
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
    setNewImageUrl('');
  };

  return (
    <StyledItem data-id={id} maxWidth="lg">
      <img src={newImageUrl} alt={`Blog Picture-${id}`} />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'flex-end',
          mb: 2,
        }}
      >
        <UploadImage onImageSelect={setNewImageUrl} showPreview={false} />
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
        <Button variant="outlined" onClick={handleCancelClick}>
          Cancel
        </Button>
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
