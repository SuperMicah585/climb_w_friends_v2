import { useState } from 'react';

const NavBar = () => {
  const [currentPage, setCurrentPage] = useState<string>('Maps');
  const navBarItems = ['Maps', 'Communities', 'Feed', 'Profile'];

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
    </div>
  );
};
export default NavBar;