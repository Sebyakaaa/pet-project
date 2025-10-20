import { useNavigate } from 'react-router-dom';

import { ROUTES } from './const-routes';

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    goToLogin: () => navigate(ROUTES.LOGIN),
    goToPosts: () => navigate(ROUTES.POSTS),
    goToHome: () => navigate(ROUTES.HOME),
  };
};
