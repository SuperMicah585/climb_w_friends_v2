import { useState } from 'react';
import ProfileDropdown from '../../reusableComponents/profileDropdown';

import PurpleButton from '../../reusableComponents/genericButton';

interface NavBarProps {
  navBarStatus: string;
  setNavBarStatus: React.Dispatch<React.SetStateAction<string>>;
  onSearchChange?: (searchTerm: string) => void;
  onAddMapClick?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  navBarStatus,
  setNavBarStatus,
  onSearchChange,
  onAddMapClick,
}) => {

  const navBarItems = ['Maps','Invitations'];
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <div className="relative z-10 flex min-h-20 w-screen items-center justify-between px-6 bg-gray-50 border-b border-gray-200">
      {/* Left side - Logo */}
      <div className="flex items-center">
        <div className="flex items-center justify-center font-changa">
          <div className="text-2xl font-bold text-gray-800"> CLIMB</div>
          <div className="text-sm font-bold text-gray-800">W</div>
          <div className="text-2xl font-bold text-gray-800"> FRIENDS</div>
        </div>
      </div>

      {/* Center - Navigation and Search */}
      <div className="flex items-center gap-8">
        {/* Navigation Items */}
        <div className="flex items-center gap-8">
          {navBarItems.map((item) => (
            <div
              key={item}
              onClick={() => {
                setNavBarStatus(item);
              }}
              className={`border-b-2 border-transparent font-semibold text-gray-700 hover:cursor-pointer hover:border-gray-400 transition-colors ${navBarStatus === item ? 'border-gray-600' : ''}`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search maps..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-64 px-4 py-2 pl-10 text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
          <svg
            className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Right side - Add Map Button and Profile */}
      <div className="flex items-center gap-4">
        {/* Add Map Button */}
        <PurpleButton
          paddingLeft={'pl-4'}
          paddingRight={'pr-4'}
          roundedCorners={'rounded-lg'}
          color={'bg-green-600'}
          clickCallBack={onAddMapClick}
        >
          <div className="flex items-center gap-2 text-white">
            <span className="text-lg">+</span>
            <span className="text-sm font-medium">Add Map</span>
          </div>
        </PurpleButton>
        
        {/* Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </div>
  );
};
export default NavBar;
