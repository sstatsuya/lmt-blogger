// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Post from './pages/Post';

export const APP_ROUTE = {
  HOME: '/',
  LOGIN: '/login',
  POST: '/post',
}

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={APP_ROUTE.HOME} element={<HomePage />} />
        <Route path={APP_ROUTE.LOGIN} element={<Login />} />
        <Route path={APP_ROUTE.POST} element={<Post />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
