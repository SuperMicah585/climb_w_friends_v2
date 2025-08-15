import React from 'react';
import LoginButton from '../../reusableComponents/loginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import climbwfriendsLogo from './climbwfriends.png';
import { profileIcon } from '../../reusableComponents/styles';

interface NavBarProps {
  selectedPage: string;
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
}

const HomeNavBar: React.FC<NavBarProps> = ({
  setSelectedPage,
}) => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate('/maps');
    } else {
      setSelectedPage('Home');
    }
  };

  return (
    <div className="relative z-10 flex min-h-20 w-full items-center justify-between px-4 sm:px-8 lg:px-32 font-semibold text-black">
      
      {/* Logo Section */}
      <div
        onClick={handleLogoClick}
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
        {isAuthenticated ? (
          <button
            onClick={() => navigate('/maps')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 hover:bg-violet-700 transition-colors duration-200 text-white"
          >
            {profileIcon}
          </button>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
};

export default HomeNavBar;