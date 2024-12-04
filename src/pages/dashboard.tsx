import NavBar from './dashboardComponents/navBar';
import Maps from './dashboardComponents/maps';

import camoBackGroundImage from './homeComponents/black_camo.jpeg';

const Home = () => {



  
  return (
    
    <div className="flex absolute left-0 top-0 h-screen w-screen flex-col bg-zinc-800 overflow-y-scroll">
      
      <NavBar />
 
      <Maps />
     
      <img
          className="h-full w-full opacity-10 object-cover absolute pointer-events-none"
          src={camoBackGroundImage}
          alt="Description of the image"
        />
    </div>
  );
};
export default Home;