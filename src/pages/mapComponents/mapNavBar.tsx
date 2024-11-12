import {
  backArrowIcon,
  expandArrowIcon,
  tagIcon,
  notificationSVG
} from '../../reusableComponents/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
interface MapNavBarProps {
  children: React.ReactNode;
  feedToggleCallBack:()=>void;
  tagToggleCallBack:()=>void;
  feedToggle:boolean;
  tagToggle:boolean

}
const MapNavBar: React.FC<MapNavBarProps> = ({ feedToggleCallBack,tagToggleCallBack,feedToggle,tagToggle, children }) => {
  const [navBarStateExpanded, setNavBarStateExpanded] = useState(false);
 

  const navBarOptions = ['Maps', 'Feed', 'Profile'];

  return (
    <div
      className={`absolute ${navBarStateExpanded ? 'w-screen' : 'w-[460px] rounded-r-lg'} left-0 top-0 z-10 flex items-center border-b border-r border-zinc-900 bg-zinc-900 bg-opacity-75 p-2 pr-5 transition-all duration-1000 hover:bg-opacity-100`}
    >
      <div className="flex items-center gap-3">
        {children}
        <div
          className={`${navBarStateExpanded ? 'max-w-full pl-5 pr-5 opacity-100 duration-1000' : 'max-w-0 opacity-0'} transition-max-height flex gap-5 font-semibold transition-opacity`}
        >
                    <div onClick = {()=>tagToggleCallBack()} className={`cursor-pointer ${tagToggle ? 'border-violet-500 fill-violet-500 text-violet-500' : 'border-slate-500 fill-none'} z-10 rounded-full border border-slate-500 p-2 opacity-90 shadow-lg hover:bg-slate-500 hover:bg-opacity-75`}> 

                {tagIcon}
                </div>

                <div
            onClick={() => feedToggleCallBack()}
            className={`cursor-pointer ${feedToggle ? 'border-violet-500 text-violet-500 fill-none' : 'border-slate-500 fill-none'} z-10 rounded-full border border-slate-500 p-2 opacity-90 shadow-lg hover:bg-slate-500 hover:bg-opacity-75`}
          >
            {' '}
            {notificationSVG}{' '}
          </div>{' '}
        <div className = 'border-l flex items-center gap-5 pl-5 '> 
          {navBarOptions.map((item) => (
            <Link
              className={`${navBarStateExpanded ? 'cursor-pointer' : 'pointer-events-none'}`}
              to={`/maps`}
            >
              {' '}
              <div className="border-b-2 border-transparent font-semibold text-white hover:border-violet-500">
                {' '}
                {item}
              </div>
            </Link>
          ))}
        </div>
        </div>
        <div
          onClick={() => setNavBarStateExpanded((prev) => !prev)}
          className={`font-xl z-20 cursor-pointer stroke-2 text-white transition-transform duration-500 hover:text-violet-500 ${navBarStateExpanded ? 'rotate-180' : ''}`}
        >
          {backArrowIcon}
        </div>
      </div>
    </div>
  );
};
export default MapNavBar;
