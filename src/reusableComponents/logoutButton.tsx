import { useAuth0 } from '@auth0/auth0-react';
import PurpleButton from './genericButton';

const LogoutButton = () => {
  const { logout } = useAuth0();
  const baseUrl = import.meta.env.VITE_REDIRECT_URI;
  return (
    <div
      onClick={() =>
        logout({ logoutParams: { returnTo: baseUrl } })
      }
    >
      <PurpleButton
        roundedCorners={'rounded-full'}
        paddingLeft={'pl-5'}
        paddingRight={'pr-5'}
      >
        <div className="text-white">SIGN OUT </div>
      </PurpleButton>
    </div>
  );
};

export default LogoutButton;
