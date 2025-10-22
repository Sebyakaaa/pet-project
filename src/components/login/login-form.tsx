import { useNavigation } from '../../hooks/use-navigation';
import { fetchData } from '../../services/api';
import { BaseButton } from '../base-button';

import { StyledForm, StyledTextField } from './styled';

export const LoginForm = () => {
  const { goToPosts } = useNavigation();

  const handleSubmit = () => {
    fetchData();
  };

  const handlePostsClick = () => {
    goToPosts();
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTextField
          autoFocus
          required
          variant="outlined"
          placeholder="Enter your email"
          type="email"
          id="email"
        />
        <StyledTextField
          required
          variant="outlined"
          placeholder="Enter password"
          type="password"
          id="password"
        />
        <BaseButton type="submit">Log in</BaseButton>
      </StyledForm>
      <BaseButton onClick={handlePostsClick}>Posts</BaseButton>
    </>
  );
};
