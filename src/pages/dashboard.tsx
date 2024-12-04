import NavBar from './dashboardComponents/navBar';
import Maps from './dashboardComponents/maps';

import camoBackGroundImage from './homeComponents/black_camo.jpeg';

const Home = () => {
  return (
    <div className="absolute left-0 top-0 flex h-screen w-screen flex-col overflow-y-scroll bg-zinc-800">
      <NavBar />

      <Maps />

      <img
        className="pointer-events-none absolute h-full w-full object-cover opacity-10"
        src={camoBackGroundImage}
        alt="Description of the image"
      />
    </div>
  );
};
export default Home;
