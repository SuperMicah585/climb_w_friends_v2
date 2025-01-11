import { useAuth0 } from '@auth0/auth0-react';
import PurpleButton from './genericButton';
import React from 'react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div onClick={() => loginWithRedirect()}>
      <PurpleButton
        roundedCorners={'rounded-full'}
        paddingLeft={'pl-5'}
        paddingRight={'pr-5'}
        paddingBottom="pb-3"
        paddingTop="pt-3"
      >
        <div className="text-md text-white">SIGN IN</div>
      </PurpleButton>
    </div>
  );
};

export default LoginButton;
