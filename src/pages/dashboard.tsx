import NavBar from './dashboardComponents/navBar';
import Maps from './dashboardComponents/maps';
import { useAuth0 } from '@auth0/auth0-react';
import ComingSoonPage from '../ComingSoon';
import { useEffect, useState } from 'react';

const Home = () => {
  const [navBarStatus, setNavBarStatus] = useState<string>('Maps');
  const [statsTrigger, setStatsTrigger] = useState<number>(0);
  const {
    isAuthenticated,
    loginWithRedirect,
    isLoading,
  } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);
/*return statement wowowo */
  return (
    <div className="absolute left-0 top-0 flex h-screen w-screen flex-col overflow-y-scroll bg-zinc-50">
      <NavBar
        statsTrigger={statsTrigger}
        navBarStatus={navBarStatus}
        setNavBarStatus={setNavBarStatus}
      />
      {navBarStatus === 'Maps' ? (
        <Maps setStatsTrigger={setStatsTrigger} />
      ) : (
        <ComingSoonPage />
      )}
    </div>
  );
};
export default Home;
