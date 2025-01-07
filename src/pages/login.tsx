// AuthComponent.tsx

import React, { useState, useEffect } from 'react';
import HomeNavBar from './homeComponents/homeNavBar';

import backGroundImage from './homeComponents/HomeBackGround.png'
const AuthComponent: React.FC = () => {
  const mainWords = ['BRINGING ', 'CLIMBERS', 'TOGETHER'];
  return (
    <div className="absolute left-0 top-0 box-border flex h-full w-screen flex-col bg-zinc-700">
      <HomeNavBar />


      <img
        className="pointer-events-none absolute h-full w-full opacity-50"
        src={backGroundImage}
        alt="Description of the image"
      />
    </div>
  );
};

export default AuthComponent;

