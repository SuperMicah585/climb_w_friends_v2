import React, { useState, useEffect } from 'react';
import LoginButton from '../../reusableComponents/loginButton';
import LogoutButton from '../../reusableComponents/logoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import camoBackGroundImage from './black_camo.jpeg';
interface NavBarProps {
  selectedPage: string;
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
}
const HomeNavBar: React.FC<NavBarProps> = ({
  selectedPage,
  setSelectedPage,
}) => {
  const { user, isAuthenticated } = useAuth0();
  const navBarItems = ['About', 'Usage', 'Work With Us'];
  return (
    <div className="relative z-10 flex min-h-20 w-screen items-center justify-center gap-40 font-semibold text-black">
      <div className="item-center absolute right-32 right-5 z-10 flex">
        {' '}
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>

      <div
        onClick={() => setSelectedPage('Home')}
        className="absolute left-32 flex w-40 cursor-pointer font-changa hover:opacity-75"
      >
        <div className="flex items-center justify-center">
          <div className="text-3xl"> CLIMB</div>
          <div className="text-sm">W</div>
          <div className="text-3xl"> FRIENDS</div>
        </div>
      </div>

      <div className="text-md flex items-center justify-center gap-10">
        {navBarItems.map((item) => (
          <div
            key={item}
            onClick={() => {
              setSelectedPage(item);
            }}
            className={`border-b-2 font-black hover:cursor-pointer hover:border-black ${selectedPage === item ? 'border-black' : 'border-transparent'}`}
          >
            {item}{' '}
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomeNavBar;
