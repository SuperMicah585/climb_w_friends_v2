// AuthComponent.tsx

import React, { useState, useEffect } from 'react';
import HomeNavBar from './homeComponents/homeNavBar';
import ComingSoonPage from '../ComingSoon';
import backGroundImage from './homeComponents/HomeBackGround.png';
const AuthComponent: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState('Home');
  return (
    <div className="absolute left-0 top-0 box-border flex h-full w-screen flex-col bg-white">
      <HomeNavBar
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />

      {selectedPage === 'Home' ? (
        <>
          <img
            className="pointer-events-none absolute h-full w-full"
            src={backGroundImage}
            alt="Description of the image"
          />

          <div className="z-10 ml-40 flex h-96 w-full flex-col items-start justify-end bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text font-changa text-7xl font-[1000] font-black text-transparent">
            <div>YOUR CLIMBING</div>
            <div>COMMUNITY</div>
            <div>ALL IN ONE PLACE</div>
          </div>
        </>
      ) : (
        <ComingSoonPage />
      )}
    </div>
  );
};

export default AuthComponent;
