import styled from '@emotion/styled';
import Container from '@mui/material/Container';

export const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 16px;
  padding: 0;
`;

export const StyledCard = styled(Container)`
  background-color: #1e293b;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  max-width: 400px;

  &:hover {
    border-color: rgba(96, 165, 250, 0.3);
    box-shadow: 0 8px 24px rgba(96, 165, 250, 0.1);
    transform: translateY(-4px);
    cursor: pointer;
  }

  img {
    border-radius: 8px;
    margin-bottom: 16px;
  }
`;
