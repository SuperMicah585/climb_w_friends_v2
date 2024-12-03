// AuthComponent.tsx

import React, { useState, useEffect } from 'react';
import HomeNavBar from './homeComponents/homeNavBar';
import camoBackGroundImage from './homeComponents/black_camo.jpeg';
const AuthComponent: React.FC = () => {
  return (
    <>
      <div className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-zinc-800">
        <img
          className="h-full w-full opacity-10"
          src={camoBackGroundImage}
          alt="Description of the image"
        />

        <div className="pointer-events-auto absolute left-0 top-0">
          <HomeNavBar />
        </div>
      </div>
    </>
  );
};

export default AuthComponent;
