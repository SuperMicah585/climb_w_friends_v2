import { useState } from 'react';
import { exampleMapObjects, friendExample } from './dashboardObjects';
import { MapObject, friendsObject } from '../../types/interfaces';
import { verticalDotIcon } from '../../reusableComponents/styles';
import { Link } from 'react-router-dom';
import AddMapComponent from './mapsComponents/addMapModal';
import EditModal from './mapsComponents/editModal';
import PurpleButton from '../../reusableComponents/purpleButton';
const Maps = () => {
  const [mapObject, setMapObject] = useState<MapObject[]>(exampleMapObjects);
  const [editMapTrigger, setEditMapTrigger] = useState(false);
  const [addMapTrigger, setAddMapTrigger] = useState(false);
  const [editMapObject, setEditMapObject] = useState<MapObject>({});

  const [mapId, setMapId] = useState<number>(0);

  const closeEditModalCallBack = () => {
    setEditMapTrigger(false);
  };

  const closeAddModalCallBack = (value: boolean) => {
    setAddMapTrigger(value);
  };

  const editPeopleOnMapCallBack = (data: friendsObject[]) => {
    setMapObject((prev) =>
      prev.map((item) =>
        item.id === mapId
          ? { ...item, peopleOnMap: [...item.peopleOnMap, ...data] } // Spread `item` and update `peopleOnMap`
          : item,
      ),
    );
  };

  const newMapCallBack = (newMapObj: MapObject) => {
    setMapObject((prev) => [...prev, newMapObj]);
  };

  const EditedClimbCallBack = (item: any) => {
    setMapObject((prev) =>
      prev.map((mapItem) =>
        mapItem.id === item.id
          ? { ...mapItem, name: item.name, description: item.description }
          : mapItem,
      ),
    );
  };

  const AddMapButtonTrigger = () => {
    setAddMapTrigger(true);
  };
  return (
    <>
      <div className="border-box relative w-screen flex-grow bg-zinc-800 pb-20 pl-10 pr-10 pt-20">
        <div className="absolute right-2 top-2">
          <PurpleButton clickCallBack={AddMapButtonTrigger}>
            Add Map
          </PurpleButton>
        </div>
        <div className="flex justify-center">
          <div className="grid max-w-[1800px] grid-cols-1 justify-center gap-5 md:grid-cols-2">
            {mapObject.map((item) => (
              <div
                key={item.id}
                className="relative min-w-[350px] max-w-[600px]"
              >
                <Link to={`/maps/${item.id}`}>
                  <div className="flex h-full flex-col items-start justify-start gap-5 rounded-lg border border-transparent bg-zinc-900 p-16 text-white shadow-sm shadow-violet-200 hover:cursor-pointer hover:border-neutral-500 hover:bg-opacity-75">
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
          closeModalCallBack={closeEditModalCallBack}
        />
      ) : null}

      {addMapTrigger ? (
        <AddMapComponent
          closeAddModalCallBack={closeAddModalCallBack}
          newMapCallBack={newMapCallBack}
        />
      ) : null}
    </>
  );
};
export default Maps;