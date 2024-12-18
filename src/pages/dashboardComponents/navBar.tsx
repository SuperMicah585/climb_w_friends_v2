import { useState } from 'react';
import LogoutButton from '../../reusableComponents/logoutButton';
import camoBackGroundImage from '../homeComponents/black_camo.jpeg';
const NavBar = () => {
  const [currentPage, setCurrentPage] = useState<string>('Maps');
  const navBarItems = ['Maps', 'Communities', 'Feed', 'Profile'];

  return (
    <div className="relative z-10 flex min-h-96 w-screen items-center justify-center gap-40 bg-gradient-to-br from-indigo-600 to-indigo-500 font-semibold">
      <img
        className="pointer-events-none absolute h-full w-full object-cover opacity-20"
        src={camoBackGroundImage}
        alt="Description of the image"
      />

      <div className="z-10 flex items-center gap-5 text-6xl font-black text-white">
        <div>
          {' '}
          <span className="">3</span> Maps
        </div>
        <div> | </div>
        <div className="">
          {' '}
          <span className="">300</span> Climbs
        </div>
        <div> | </div>
        <div className="">
          {' '}
          <span className="">40</span> Climbers
        </div>
      </div>

      <div className="item-center absolute right-5 top-4 z-10 flex">
        {' '}
        <LogoutButton />{' '}
      </div>

      <div className="absolute left-5 top-4 flex w-40">
        <div className="z-10 flex items-center justify-center">
          <div className="text-3xl font-bold"> CLIMB</div>
          <div className="text-sm font-bold">W</div>
          <div className="text-3xl font-bold"> FRIENDS</div>
        </div>
      </div>

      <div className="absolute top-4 flex items-center justify-center gap-10 text-xl">
        {navBarItems.map((item) => (
          <div
            key={item}
            onClick={() => {
              setCurrentPage(item);
            }}
            className={`z-10 border-b-4 border-transparent font-extrabold hover:cursor-pointer hover:border-white ${currentPage === item ? 'border-white' : ''}`}
          >
            {item}{' '}
          </div>
        ))}
      </div>
    </div>
  );
};
export default NavBar;
