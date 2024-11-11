import { useState } from 'react';
import { exampleMapObjects, friendExample } from './homeObjects';
import { MapObject } from '../../types/interfaces';
import { verticalDotIcon } from '../../reusableComponents/styles';
import { Link } from 'react-router-dom';

import EditModal from './mapsComponents/editModal';
const Maps = () => {
  const [mapObject, setMapObject] = useState<MapObject[]>(exampleMapObjects);
  const [editMapTrigger, setEditMapTrigger] = useState(false);
  const [editMapObject, setEditMapObject] = useState<MapObject>({});
  const [mapId, setMapId] = useState<number>(0);

  const closeModalCallBack = () => {
    setEditMapTrigger(false);
  };

  const editPeopleOnMapCallBack = (data: MapObject[]) => {
    setMapObject((prev) =>
      prev.map((item) =>
        item.id === mapId
          ? { ...item, peopleOnMap: [...item.peopleOnMap, ...data] } // Spread `item` and update `peopleOnMap`
          : item,
      ),
    );
  };

  const EditedClimbCallBack = (item: MapObject) => {
    setMapObject((prev) =>
      prev.map((mapItem) =>
        mapItem.id === item.id
          ? { ...mapItem, name: item.name, description: item.description }
          : mapItem,
      ),
    );
  };
  return (
    <>
      <div className="relative w-screen flex-grow bg-zinc-800 pl-10 pr-10 pt-20">
        <div className="items-items absolute right-5 top-5 z-10 flex cursor-pointer justify-center rounded-lg bg-violet-500 p-2 font-semibold hover:opacity-75">
          {' '}
          Add Map{' '}
        </div>

        <div className="flex justify-center">
          <div className="grid max-w-[1800px] grid-cols-1 justify-center gap-5 md:grid-cols-2">
            {mapObject.map((item) => (
              <div
                key={item.id}
                className="relative min-w-[350px] max-w-[600px]"
              >
                <Link to={`/maps/${item.id}`}>
                  <div className="flex h-full flex-col items-start justify-start gap-5 rounded-lg border border-transparent bg-zinc-900 p-16 text-white hover:cursor-pointer hover:border-neutral-500 hover:bg-opacity-75">
                    <div className="flex items-center gap-5">
                      <div className="text-xl font-bold"> {item.name} </div>
                      <div className="font-semibold text-violet-500">
                        {' '}
                        {item.totalClimbs} climbs{' '}
                      </div>
                      <div className="font-semibold text-green-500">
                        {' '}
                        {item.peopleOnMap?.length} climbers{' '}
                      </div>
                    </div>
                    <div className="text-thin text-xs">
                      {' '}
                      {item.description}{' '}
                    </div>
                  </div>
                </Link>
                <div
                  onClick={(event) => {
                    event.stopPropagation();
                    setEditMapTrigger(true);
                    setEditMapObject(item);
                    setMapId(item.id);
                  }}
                  className="absolute right-2 top-2 cursor-pointer rounded-full p-1 hover:bg-slate-500 hover:opacity-50"
                >
                  {verticalDotIcon}{' '}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editMapTrigger ? (
        <EditModal
          editPeopleOnMapCallBack={editPeopleOnMapCallBack}
          friendsList={friendExample}
          EditedClimbCallBack={EditedClimbCallBack}
          editMapObject={editMapObject}
          closeModalCallBack={closeModalCallBack}
        />
      ) : null}
    </>
  );
};
export default Maps;
