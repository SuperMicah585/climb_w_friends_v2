import { GeoJsonFeature } from '../../types/interfaces';
import {
  checkBadge,
  chatIcon,
  minusIcon,
  closeIcon,
  addIcon,
  newWindowIcon,
} from '../../reusableComponents/styles';
import ModalSearch from './modalComponents/modalSearch';
import ModalChat from './modalComponents/modalChat';
import { useState, useEffect } from 'react';
type ClimbModalProps = {
  clickedFeatureClimbs: GeoJsonFeature[];
  closeModalCallBack: (trigger: boolean) => void;
};
const ClimbModal: React.FC<ClimbModalProps> = ({
  clickedFeatureClimbs,
  closeModalCallBack = () => {},
}) => {
  const [isClimbAdded, setIsClimbAdded] = useState<boolean>(false);
  const [routeFilterString, setRouteFilterString] = useState<string>('');
  const [sortString, setSortString] = useState('Order Grade ASC');
  const [isClimbTicked, setisClimbTicked] = useState(false);
  const [displayTrigger, setDisplayTrigger] = useState(0);
  const [climbNameForChat, setClimbNameForChat] = useState('');
  const [climbGradeForChat, setClimbGradeForChat] = useState('');

  const searchFilterCallBack = (data: string) => {
    setRouteFilterString(data);
  };

  const sortStringCallBack = (data: string) => {
    setSortString(data);
  };

  const mp_page = (item: GeoJsonFeature) => {
    const url = `https://www.mountainproject.com/route/${item.id}/${encodeURIComponent(item.name)}`;
    window.open(url, '_blank'); // Open in a new tab
  };

  return (
    <div
      onClick={() => closeModalCallBack(false)}
      className="bg-blur-md absolute z-20 flex h-screen w-screen items-center justify-center bg-slate-500 bg-opacity-75"
    >
      <div
        className="pointer-events-none absolute flex h-screen w-screen items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <ModalChat
          climbGrade={climbGradeForChat}
          climbName={climbNameForChat}
          displayTrigger={displayTrigger}
        />
      </div>
      <div
        onClick={(event) => event.stopPropagation()}
        className="shadow-opacity-50 z-36 relative flex h-1/2 min-h-96 w-1/2 min-w-96 max-w-[700px] flex-col items-start gap-2 overflow-y-scroll rounded-lg bg-zinc-900 pb-5 pl-10 pr-10 pt-5 shadow-sm shadow-violet-200"
      >
        <div
          onClick={() => closeModalCallBack(false)}
          className="absolute right-2 top-2 cursor-pointer rounded-full p-1 text-white hover:bg-slate-500 hover:opacity-75"
        >
          {' '}
          {closeIcon}{' '}
        </div>

        <ModalSearch
          sortStringCallBack={sortStringCallBack}
          searchFilterCallBack={searchFilterCallBack}
        />

        <div>
          <div className="w-full rounded-md bg-zinc-900">
            {clickedFeatureClimbs
              .filter((item: GeoJsonFeature) =>
                item.name
                  .toLowerCase()
                  .includes(routeFilterString.toLowerCase()),
              )

              .sort((a, b) => {
                if (sortString === 'Order Route ASC') {
                  return a.name.localeCompare(b.name); // Sort alphabetically by name
                } else if (sortString === 'Order Route DESC') {
                  return b.name.localeCompare(a.name); // Sort in reverse alphabetical order
                }
                return 0;
              })

              .map((item: GeoJsonFeature) => (
                <div
                  key={item.id}
                  className="relative mt-5 flex flex-col gap-2 rounded-md bg-zinc-800 p-10 text-black shadow-sm shadow-violet-200"
                >
                  <div
                    onClick={() => mp_page(item)}
                    className="absolute left-2 top-1 cursor-pointer rounded-lg p-1 text-neutral-500 hover:bg-slate-500 hover:text-neutral-400 hover:opacity-75"
                  >
                    {' '}
                    {newWindowIcon}{' '}
                  </div>
                  <div
                    onClick={() => setIsClimbAdded((prev) => !prev)}
                    className={`absolute right-2 top-2 cursor-pointer rounded-full p-1 hover:bg-slate-500 hover:opacity-75 ${isClimbAdded ? 'text-red-300' : 'text-green-300'}`}
                  >
                    {isClimbAdded ? minusIcon : addIcon}
                  </div>

                  <div className="absolute bottom-2 right-2 flex items-center gap-2">
                    <div
                      onClick={() => setisClimbTicked((prev) => !prev)}
                      className={`cursor-pointer rounded-full p-1 hover:bg-slate-500 hover:opacity-75 ${isClimbTicked ? 'text-green-500' : 'text-neutral-500 hover:text-neutral-400'}`}
                    >
                      {checkBadge}
                    </div>
                    <div
                      onClick={() => {
                        setDisplayTrigger((prev) => prev + 1);
                        setClimbNameForChat(item.name);
                        setClimbGradeForChat(item.grade);
                      }}
                      className="cursor-pointer rounded-full p-1 text-blue-500 hover:bg-slate-500 hover:opacity-75"
                    >
                      {chatIcon}
                    </div>
                  </div>
                  {/* Main details section */}
                  <div className="flex gap-5 font-semibold text-white">
                    <div>{item.name}</div>
                    <div className="white border-r"></div>
                    <div>{item.grade}</div>
                  </div>

                  <div className="text-sm italic text-white">Sport</div>

                  <div className="text-xs text-white">
                    Roadside Boulder &gt; Jefferson Lake &gt; Olympic Bouldering
                    &gt; Olympic National Park &gt; Olympics & Pacific Coast
                    &gt; Washington
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-xs font-bold italic text-black">
                    {item.climber_names.map((item,index) => (
                      <div key = {index} className="rounded-md border-2 border-violet-500 p-1 text-white">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClimbModal;
