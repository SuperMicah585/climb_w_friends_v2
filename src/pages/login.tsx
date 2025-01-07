// AuthComponent.tsx

import React, { useState, useEffect } from 'react';
import HomeNavBar from './homeComponents/homeNavBar';
import ComingSoonPage from '../ComingSoon';
import backGroundImage from './homeComponents/HomeBackGround.png'
const AuthComponent: React.FC = () => {
  
  const [selectedPage,setSelectedPage] = useState('Home')
  return (
    <div className="absolute left-0 top-0 box-border flex h-full w-screen flex-col bg-white">
      
      <HomeNavBar selectedPage = {selectedPage} setSelectedPage ={setSelectedPage}/>

{selectedPage==='Home'? 
<> 
      <img
        className="pointer-events-none absolute h-full w-full"
        src={backGroundImage}
        alt="Description of the image"
      />
      
      <div className="ml-40 flex flex-col text-7xl items-start justify-end z-10 w-full h-96 font-changa font-black font-[1000] bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
  <div>YOUR CLIMBING</div>
  <div>COMMUNITY</div>
  <div>ALL IN ONE PLACE</div>
</div>

      </>    
      
      
      : <ComingSoonPage/>
  }
    </div>
  );
};

export default AuthComponent;

