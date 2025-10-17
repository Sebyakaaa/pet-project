import { css } from '@emotion/react';
import Button from '@mui/material/Button';

import { fetchData } from '../services/api';

export const ButtonUsage = () => {
  const handleClick = async () => {
    fetchData();
  };

  return (
    <div
      css={css`
        margin-top: 5px;
      `}
    >
      <Button onClick={handleClick} variant="contained">
        Hello world
      </Button>
    </div>
  );
};
