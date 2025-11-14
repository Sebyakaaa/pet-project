import { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';

import { useNavigation } from '../../../hooks/use-navigation';
import { updatePost, removePost } from '../../../store/slice';
import { AppDispatch } from '../../../store/store';
import { PostDTO } from '../../../types/post-dto';
import { validateContent, validateTitle } from '../../../utils/validate-post';
import { BaseButton } from '../../base-button';
import { ImageDisplay } from '../../image-display';
import { UploadImage } from '../../upload-image';

import { StyledItem } from './styled';

type PostItemProps = PostDTO;

export const PostItem = ({ id, imageUrl: image, title, content }: PostItemProps) => {
  const { goToPosts } = useNavigation();

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [newImageUrl, setNewImageUrl] = useState(image || '');
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent(event.target.value);
  };

  const handleSaveTitleClick = () => {
    const error = validateTitle(editedTitle);
    if (error) {
      setError(error);
      return;
    }
    setError(null);
    dispatch(updatePost({ id, updates: { title: editedTitle } }));
  };

  const handleSaveContentClick = () => {
    const error = validateContent(editedContent);
    if (error) {
      setError(error);
      return;
    }
    setError(null);
    dispatch(updatePost({ id, updates: { content: editedContent } }));
  };

  const handleSaveAllClick = async () => {
    const error = validateTitle(editedTitle) || validateContent(editedContent);
    if (error) {
      setError(error);
      return;
    }
    setError(null);
    await dispatch(
      updatePost({
        id,
        updates: { title: editedTitle, content: editedContent, imageUrl: newImageUrl },
        fullUpdate: true,
      }),
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
    await dispatch(removePost(id));
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
      <ImageDisplay id={id} imageUrl={newImageUrl} />
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
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
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
