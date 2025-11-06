import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';

import { createPost } from '../../../services/posts-service';
import { BaseButton } from '../../base-button';
import { addPost } from '../store/slice';

import { StyledAddContainer } from './styled';

export const AddNewPost = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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

  const handleAddPost = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!content.trim()) {
      setError('Content is required');
      return;
    }
    try {
      const newPost = await createPost(title, content);
      dispatch(addPost(newPost));
      clearFields();
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
          <Typography variant="h6">Add New Post</Typography>
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
            <BaseButton onClick={handleClose}>Cancel</BaseButton>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};
