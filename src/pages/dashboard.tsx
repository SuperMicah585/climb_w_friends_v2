import NavBar from './dashboardComponents/navBar';
import Maps, { MapsRef } from './dashboardComponents/maps';
import { useAuth0 } from '@auth0/auth0-react';
import ComingSoonPage from '../ComingSoon';
import { useEffect, useState, useRef } from 'react';

const Home = () => {
  const [navBarStatus, setNavBarStatus] = useState<string>('Maps');

  const mapsRef = useRef<MapsRef | null>(null);
  
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

  // Callbacks for NavBar
  const handleSearchChange = (searchTerm: string) => {
    if (mapsRef.current) {
      mapsRef.current.handleSearchChange(searchTerm);
    }
  };

  const handleAddMapClick = () => {
    if (mapsRef.current) {
      mapsRef.current.handleAddMapClick();
    }
  };

  return (
    <div className="absolute left-0 top-0 flex h-screen w-screen flex-col overflow-y-scroll bg-zinc-50">
      <NavBar
        navBarStatus={navBarStatus}
        setNavBarStatus={setNavBarStatus}
        onSearchChange={navBarStatus === 'Maps' ? handleSearchChange : undefined}
        onAddMapClick={navBarStatus === 'Maps' ? handleAddMapClick : undefined}
      />
      {navBarStatus === 'Maps' ? (
        <Maps ref={mapsRef} setStatsTrigger={() => {}} />
      ) : (
        <ComingSoonPage />
      )}
    </div>
  );
};
export default Home;
