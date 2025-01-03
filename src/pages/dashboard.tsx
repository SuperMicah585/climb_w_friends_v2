import NavBar from './dashboardComponents/navBar';
import Maps from './dashboardComponents/maps';
import { useAuth0 } from '@auth0/auth0-react';
import camoBackGroundImage from './homeComponents/black_camo.jpeg';
import { useEffect } from 'react';

const Home = () => {
  const {
    getAccessTokenSilently,
    user,
    isAuthenticated,
    loginWithRedirect,
    isLoading,
  } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  return (
    <div className="absolute left-0 top-0 flex h-screen w-screen flex-col overflow-y-scroll bg-zinc-50">
      <NavBar />
      <Maps />
    </div>
  );
};
export default Home;
