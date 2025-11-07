import { useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface UploadImageProps {
  onImageSelect: (imageUrl: string) => void;
  showPreview?: boolean;
}

export const UploadImage = ({ onImageSelect, showPreview = true }: UploadImageProps) => {
  const [preview, setPreview] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onImageSelect(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Upload Image
        <input type="file" accept="image/*" hidden onChange={handleImageChange} />
      </Button>
      {showPreview && preview && (
        <Box
          component="img"
          src={preview}
          alt="Preview"
          sx={{
            width: '100%',
            maxHeight: 200,
            objectFit: 'cover',
            borderRadius: 2,
            mt: 2,
          }}
        />
      )}
    </Box>
  );
};
