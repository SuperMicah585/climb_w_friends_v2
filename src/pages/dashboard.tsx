import NavBar from './dashboardComponents/navBar';
import Maps from './dashboardComponents/maps';
import { useAuth0 } from '@auth0/auth0-react';
const Home = () => {
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  console.log(getAccessTokenSilently(), user, isAuthenticated, 'test');
  return (
    <div className="flex h-screen w-screen flex-col bg-zinc-900">
      <NavBar />
      <Maps />
    </div>
  );
};
export default Home;
