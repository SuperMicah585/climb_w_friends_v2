import React from 'react';
import LoginButton from '../../reusableComponents/loginButton';
import LogoutButton from '../../reusableComponents/logoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import climbwfriendsLogo from './climbwfriends.png';

interface NavBarProps {
  selectedPage: string;
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
}

const HomeNavBar: React.FC<NavBarProps> = ({
  setSelectedPage,
}) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="relative z-10 flex min-h-20 w-full items-center justify-between px-4 sm:px-8 lg:px-32 font-semibold text-black">
      
      {/* Logo Section */}
      <div
        onClick={() => setSelectedPage('Home')}
        className="flex cursor-pointer items-center gap-2 font-changa hover:opacity-75"
      >
        <img 
          src={climbwfriendsLogo} 
          alt="Climb With Friends Logo" 
          className="h-12 w-12 sm:h-16 sm:w-16 object-contain rounded-full bg-white" 
        />
        <div className="flex items-center justify-center">
          <div className="text-xl sm:text-2xl lg:text-3xl text-violet-700">CLIMB</div>
          <div className="text-xs sm:text-sm">W</div>
          <div className="text-xl sm:text-2xl lg:text-3xl">FRIENDS</div>
        </div>
      </div>

      {/* Auth Button */}
      <div className="flex">
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  );
};

export default HomeNavBar;