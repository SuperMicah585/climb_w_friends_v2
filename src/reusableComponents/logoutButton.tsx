import { useAuth0 } from '@auth0/auth0-react';
import PurpleButton from './purpleButton';
import React from 'react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div
      onClick={() =>
        logout({ logoutParams: { returnTo: 'http://localhost:5173/' } })
      }
    >
      <PurpleButton>Log Out</PurpleButton>
    </div>
  );
};

export default LogoutButton;
