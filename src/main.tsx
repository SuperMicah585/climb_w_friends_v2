import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Login from './pages/login.tsx';
import Home from './pages/home.tsx';
//npx prettier --write .

const root = document.getElementById('root');

if (root !== null) {
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/map" element={<App />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  );
}
