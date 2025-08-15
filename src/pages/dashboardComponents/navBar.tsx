import { useState, useEffect } from 'react';
import ProfileDropdown from '../../reusableComponents/profileDropdown';
import camoBackGroundImage from '../homeComponents/black_camo.jpeg';
import { useAuth0 } from '@auth0/auth0-react';
import { retrieveUserStats } from './utilityFunctions';

interface StatObject {
  totalMaps: number;
  totalClimbs: number;
  uniqueClimbers: number;
}

interface NavBarProps {
  navBarStatus: string;
  setNavBarStatus: React.Dispatch<React.SetStateAction<string>>;
  statsTrigger: number;
}

const NavBar: React.FC<NavBarProps> = ({
  navBarStatus,
  setNavBarStatus,
  statsTrigger,
}) => {
  const { user } = useAuth0();
  const navBarItems = ['Maps', 'Communities', 'Feed', 'Profile'];

  const [statObject, setStatObject] = useState<StatObject>({
    totalClimbs: 0,
    totalMaps: 0,
    uniqueClimbers: 1,
  });

  useEffect(() => {
    const userStats = async () => {
      if (user && user?.sub) {
        const data = await retrieveUserStats(user?.sub);
        setStatObject(data);
      }
    };

    if (user && user?.sub) {
      userStats();
    } else {
      console.error('User not found');
    }
  }, [user, statsTrigger]);

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
          <span className="">{statObject.totalMaps}</span>{' '}
          {statObject.totalMaps == 1 ? 'Map' : 'Maps'}
        </div>
        <div> | </div>
        <div className="">
          {' '}
          <span className="">{statObject.totalClimbs}</span>{' '}
          {statObject.totalClimbs === 1 ? 'Climb' : 'Climbs'}
        </div>
        <div> | </div>
        <div className="">
          {' '}
          <span className="">
            {statObject.uniqueClimbers > 0
              ? statObject.uniqueClimbers - 1
              : statObject.uniqueClimbers}
          </span>{' '}
          {statObject.uniqueClimbers === 2 ? 'Friend' : 'Friends'}
        </div>
      </div>

      <div className="item-center absolute right-5 top-4 z-10 flex">
        {' '}
        <ProfileDropdown />{' '}
      </div>

      <div className="absolute left-5 top-4 flex w-40">
        <div className="z-10 flex items-center justify-center font-changa">
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
              setNavBarStatus(item);
            }}
            className={`z-10 border-b-4 border-transparent font-extrabold hover:cursor-pointer hover:border-white ${navBarStatus === item ? 'border-white' : ''}`}
          >
            {item}{' '}
          </div>
        ))}
      </div>
    </div>
  );
};
export default NavBar;
