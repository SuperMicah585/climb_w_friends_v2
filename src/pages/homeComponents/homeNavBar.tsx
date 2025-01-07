import React, { useState, useEffect } from 'react';
import LoginButton from '../../reusableComponents/loginButton';
import LogoutButton from '../../reusableComponents/logoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import camoBackGroundImage from './black_camo.jpeg';
const HomeNavBar = () => {
  const [currentPage, setCurrentPage] = useState<string>('');
  const { user, isAuthenticated } = useAuth0();
  const navBarItems = ['About', 'Usage', 'Work With Us'];
  return (
    <div className="relative z-10 flex min-h-96 w-screen items-center justify-center gap-40 font-semibold text-white">
   

      <div className="item-center absolute right-5 top-4 z-10 flex">
        {' '}
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>

      <div className="absolute left-5 top-4 flex w-40">
        <div className="flex items-center justify-center">
          <div className="text-4xl font-bold"> CLIMB</div>
          <div className="text-sm font-bold">W</div>
          <div className="text-4xl font-bold"> FRIENDS</div>
        </div>
      </div>

      <div className="absolute top-4 flex items-center justify-center gap-10 text-2xl">
        {navBarItems.map((item) => (
          <div
            key={item}
            onClick={() => {
              setCurrentPage(item);
            }}
            className={`border-b-4 border-transparent font-extrabold hover:cursor-pointer hover:border-white ${currentPage === item ? 'border-white' : ''}`}
          >
            {item}{' '}
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomeNavBar;
