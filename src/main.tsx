import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App.tsx';
import Login from './pages/login.tsx';
//npx prettier --write .

const root = document.getElementById('root');

if (root !== null) {
  createRoot(root).render(
    <Auth0Provider
      domain="dev-qvplotxzdb57f6vf.us.auth0.com"
      clientId="VOq0a56M5GZho3Okd9oEqqGUUzlS2BUC"
      authorizationParams={{
        redirect_uri: 'http://localhost:5173/map'
      }}
    >
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/map" element={<App />} />
          </Routes>
        </BrowserRouter>
      </StrictMode>
    </Auth0Provider>,
  );
}