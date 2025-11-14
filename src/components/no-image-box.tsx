import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const NoImageBox = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.900',
        borderRadius: 2,
        mb: 3,
      }}
    >
      <ImageNotSupportedIcon sx={{ fontSize: 80, color: 'grey.400' }} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        No image available
      </Typography>
    </Box>
  );
};
