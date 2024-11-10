import { useState } from 'react';
import { exampleMapObjects } from './homeObjects';
import { MapObject } from '../../types/interfaces';
import { addUserIcon, verticalDotIcon } from '../../reusableComponents/styles';
const Maps = () => {
  const [mapObject, setMapObject] = useState<MapObject[]>(exampleMapObjects);

  return (
    <div className="w-screen flex-grow bg-zinc-800 p-10">
      <div className="flex justify-center">
        <div className="grid max-w-[1800px] grid-cols-1 justify-center gap-5 md:grid-cols-2">
          {mapObject.map((item) => (
            <div className="relative min-w-[350px] max-w-[600px]">
              <div className="flex h-full flex-col items-start justify-start gap-5 rounded-lg border border-transparent bg-zinc-900 p-16 hover:cursor-pointer hover:border-neutral-500 hover:bg-opacity-75">
                <div className="flex items-center gap-5">
                  <div className="text-xl font-bold"> {item.name} </div>
                  <div className="font-semibold text-violet-500">
                    {' '}
                    {item.totalClimbs} climbs{' '}
                  </div>
                  <div className="font-semibold text-green-500">
                    {' '}
                    {item.peopleOnMap.length} climbers{' '}
                  </div>
                </div>
                <div className="text-thin text-xs"> {item.description} </div>
              </div>
              <div className="absolute right-2 top-2 cursor-pointer rounded-full p-1 hover:bg-slate-500 hover:opacity-50">
                {verticalDotIcon}{' '}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Maps;
