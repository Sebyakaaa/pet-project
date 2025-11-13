import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';

import { createPost } from '../../../services/posts-service';
import { addPost } from '../../../store/slice';
import { BaseButton } from '../../base-button';
import { UploadImage } from '../../upload-image';

import { StyledAddContainer } from './styled';

export const AddNewPost = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const clearFields = () => {
    setTitle('');
    setContent('');
    setError(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    clearFields();
  };

  const open = Boolean(anchorEl);

  const hasValidationErrors = () => {
    if (!title.trim()) {
      setError('Title is required');
      return true;
    }
    if (!content.trim()) {
      setError('Content is required');
      return true;
    }
    return false;
  };

  const handleAddPost = async () => {
    if (hasValidationErrors()) {
      return;
    }
    try {
      const newPost = await createPost(title, content, imageUrl);
      dispatch(addPost(newPost));
      handleClose();
    } catch (error: any) {
      setError(error.response?.data?.error);
    }
  };

  return (
    <>
      <StyledAddContainer>
        <Fab color="primary" aria-label="add" onClick={handleClick}>
          <AddIcon />
        </Fab>
      </StyledAddContainer>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ p: 3, width: 700 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
            }}
          >
            Add New Post
          </Typography>
          <UploadImage onImageSelect={setImageUrl} />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            label="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={4}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'flex-end',
              mt: 3,
            }}
          >
            <BaseButton onClick={handleAddPost}>Add Post</BaseButton>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};
