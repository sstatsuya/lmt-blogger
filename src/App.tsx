// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Các route khác sẽ thêm ở đây sau */}
    </Routes>
  );
};

export default App;
