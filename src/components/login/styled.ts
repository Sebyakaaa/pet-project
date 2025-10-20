import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

import { BaseButton } from '../base-button';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 150px auto;
  width: 30%;
`;

export const StyledTextField = styled(TextField)`
  color: #fff;
`;

export const StyledButton = styled(BaseButton)`
  align-self: center;
  width: 30%;
`;
