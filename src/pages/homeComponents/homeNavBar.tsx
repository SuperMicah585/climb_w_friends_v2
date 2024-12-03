import React, { useState, useEffect } from 'react';
import LoginButton from '../../reusableComponents/loginButton';
import LogoutButton from '../../reusableComponents/logoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const HomeNavBar = () => {
  const [currentPage, setCurrentPage] = useState<string>('');
  const { user, isAuthenticated } = useAuth0();
  const navBarItems = ['About', 'Usage', 'Work With Us'];
  return (
    <div className="relative flex min-h-20 w-screen items-center justify-center gap-40 border-b border-neutral-500 bg-zinc-800 font-semibold">
      <div className="absolute left-0 top-0 flex h-20 w-40 border-b border-neutral-500">
        <div className="relative flex items-center justify-center border-r border-neutral-500 pl-2 pr-5">
          <div className="text-3xl font-bold"> CLIMB</div>
          <div className="text-sm font-bold">W</div>
          <div className="text-3xl font-bold"> FRIENDS</div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-10 text-2xl">
        {navBarItems.map((item) => (
          <div
            key={item}
            onClick={() => {
              setCurrentPage(item);
            }}
            className={`border-b-4 border-transparent pb-1 hover:cursor-pointer hover:border-violet-500 ${currentPage === item ? 'border-violet-500' : ''}`}
          >
            {item}{' '}
          </div>
        ))}
      </div>
      <div className="absolute right-2">
        {' '}
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}{' '}
      </div>
    </div>
  );
};
export default HomeNavBar;
