import { useAuth0 } from '@auth0/auth0-react';
import PurpleButton from './purpleButton';
import React from 'react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div onClick={() => loginWithRedirect()}>
      <PurpleButton>Log In</PurpleButton>
    </div>
  );
};

export default LoginButton;
