// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';

export const APP_ROUTE = {
  HOME: '/',
  LOGIN: '/login',
  POST: '/post',
  POST_DETAIL: '/post/:id',
  CREATE_POST: '/create-post',
}

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={APP_ROUTE.HOME} element={<HomePage />} />
        <Route path={APP_ROUTE.LOGIN} element={<Login />} />
        <Route path={APP_ROUTE.POST} element={<Post />} />
        <Route path={APP_ROUTE.CREATE_POST} element={<CreatePost />} />
        <Route path={APP_ROUTE.POST_DETAIL} element={<PostDetail />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
