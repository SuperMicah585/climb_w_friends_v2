import NavBar from './homeComponents/navBar';
import Maps from './homeComponents/maps';
const Home = () => {
  return (
    <div className="flex h-screen w-screen flex-col bg-zinc-900">
      <NavBar />
      <Maps />
    </div>
  );
};
export default Home;
