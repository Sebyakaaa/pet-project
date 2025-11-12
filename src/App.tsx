import { useEffect } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';

import './App.css';
import { LoginForm } from './components/login/login-form';
import { PostItemPage } from './components/posts/post-item/post-item-page';
import { PostsListPage } from './components/posts/posts-list/posts-list-page';
import { ROUTES } from './constants/const-routes';
import { fetchPosts } from './store/slice';
import { AppDispatch } from './store/store';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginForm />} />
          <Route path={ROUTES.POSTS} element={<PostsListPage />} />
          <Route path={ROUTES.POST_ITEM} element={<PostItemPage />} />
          <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};
