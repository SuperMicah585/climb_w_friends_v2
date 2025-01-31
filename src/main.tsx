import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Login from './pages/login.tsx';
import Home from './pages/dashboard.tsx';
import { Auth0Provider } from '@auth0/auth0-react';
//npx prettier --write .
const baseUrl = import.meta.env.VITE_REDIRECT_URI;
console.log(baseUrl,"check")
console.log("great") 
const root = document.getElementById('root');

if (root !== null) {
  createRoot(root).render(
    //Need to update this - specifically the redirect_uri for dev vs prod. Need to confirm with ben regarding domain and clientID.
     //https://icy-mushroom-0a940671e.4.azurestaticapps.net/ 
    <Auth0Provider
      domain="dev-qvplotxzdb57f6vf.us.auth0.com"
      clientId="VOq0a56M5GZho3Okd9oEqqGUUzlS2BUC"
      authorizationParams={{
        redirect_uri: `${baseUrl}maps`,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Maps/:id" element={<App />} />
          <Route path="/Maps" element={<Home />} />
        </Routes>
      </BrowserRouter>
      ,
    </Auth0Provider>,
  );
}
