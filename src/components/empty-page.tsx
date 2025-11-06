import Typography from '@mui/material/Typography';

export const EmptyPage = () => {
  return (
    <Typography
      variant="h5"
      color="text.secondary"
      sx={{
        mt: 8,
        textAlign: 'center',
      }}
    >
      Page not found
    </Typography>
  );
};
