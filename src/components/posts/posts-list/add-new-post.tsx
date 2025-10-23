import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { BaseButton } from '../../base-button';

import { StyledAddContainer } from './styled';

export const AddNewPost = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
          <TextField label="Title" fullWidth sx={{ mt: 2 }} />
          <TextField label="Content" multiline rows={4} fullWidth sx={{ mt: 2 }} />
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'flex-end',
              mt: 3,
            }}
          >
            <BaseButton>Add Post</BaseButton>
            <BaseButton onClick={handleClose}>Cancel</BaseButton>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};
