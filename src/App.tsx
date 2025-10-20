import { Navigate, Route, Routes } from 'react-router';

import './App.css';
import { LoginForm } from './components/login/login-form';
import { PostsList } from './components/posts/posts-list';
import { ROUTES } from './hooks/const-routes';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginForm />} />
        <Route path={ROUTES.POSTS} element={<PostsList />} />
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </div>
  );
};
