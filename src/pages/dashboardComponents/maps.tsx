import { useState, useEffect } from 'react';
import { friendExample } from './dashboardObjects';
import { MapObject, friendsObject } from '../../types/interfaces';
import { verticalDotIcon, minusIcon } from '../../reusableComponents/styles';
import { Link } from 'react-router-dom';
import AddMapComponent from './mapsComponents/addMapModal';
import EditModal from './mapsComponents/editModal';
import PurpleButton from '../../reusableComponents/genericButton';
import { useAuth0 } from '@auth0/auth0-react';
import ToastContainer from '../../reusableComponents/toastContainer';
import {
  retrieveMapsAndUsers,
  editMap,
  removeUserFromMap,
  createMap,
} from './utilityFunctions';

import { submitAirplane } from '../../reusableComponents/styles';

const Maps = () => {
  const [mapObject, setMapObject] = useState<MapObject[]>([]);
  const [editMapTrigger, setEditMapTrigger] = useState(false);
  const [addMapTrigger, setAddMapTrigger] = useState(false);
  const [toastTrigger, setToastTrigger] = useState(0);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const [editMapObject, setEditMapObject] = useState<MapObject>({
    mapId: -1,
    mapName: '',
    description: '',
    climbersOnMap: [],
  });
  const [mapId, setMapId] = useState<number>(0);

  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();

  const closeEditModalCallBack = () => {
    setEditMapTrigger(false);
  };

  const closeAddModalCallBack = (value: boolean) => {
    setAddMapTrigger(value);
  };

  const editPeopleOnMapCallBack = (data: friendsObject[]) => {
    setMapObject((prev) =>
      prev.map((item) =>
        item.mapId === mapId
          ? { ...item, climbersOnMap: [...(item.climbersOnMap || []), ...data] } // Spread `item` and update `peopleOnMap`
          : item,
      ),
    );
  };

  //have to keep this function here
  const retrieveMaps = async (userId: string) => {
    try {
      const mapsResponse = await fetch(
        `http://localhost:5074/api/Maps/User/${userId}`,
      );

      if (!mapsResponse.ok) {
        throw new Error(`Response status: ${mapsResponse.status}`);
      }

      const mapsJson = await mapsResponse.json();

      const mapsWithUsers = await retrieveMapsAndUsers(mapsJson);

      setMapObject(mapsWithUsers);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const newMapCallBack = async (newMapObj: MapObject) => {
    if (user?.sub) {
      const mapObject = await createMap(
        newMapObj.mapName,
        newMapObj.description,
        user?.sub,
      );
      if (mapObject) {
        console.log('toast');
        setMapObject((prev) => [...prev, mapObject.map]);

        ////----->Toast
        setToastType('success');
        setToastMessage('Map was created sucessfully!');
        setToastTrigger((prev) => prev + 1);
      }
    } else {
      console.error('user not defined');
      ////----->Toast
      setToastType('error');
      setToastMessage('Map was not created!');
      setToastTrigger((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (user?.sub) {
      retrieveMaps(user.sub);
    } else {
      console.error('User not found');
    }
  }, [user]);

  const handleRemoveUserFromMap = async (item: MapObject) => {
    if (user?.sub && item) {
      const success = await removeUserFromMap(item.mapId, user.sub);
      if (success) {
        setMapObject((prev) =>
          prev.filter((mapItem) =>
            item.mapId === mapItem.mapId ? false : true,
          ),
        );

        ////----->Toast
        setToastType('success');
        setToastMessage('You were succesfully removed from the map!');
        setToastTrigger((prev) => prev + 1);
      }
    } else {
      console.error('user or map not defined');
      ////----->Toast
      setToastType('error');
      setToastMessage('Error removing you from map!');
      setToastTrigger((prev) => prev + 1);
    }
  };

  const EditedClimbCallBack = async (item: any) => {
    //console.log(item,"sdfsdf")
    const success = await editMap(item.mapName, item.description, item.mapId);
    if (success) {
      setMapObject((prev) =>
        prev.map((mapItem) =>
          mapItem.mapId === item.mapId
            ? {
                ...mapItem,
                mapName: item.mapName,
                description: item.description,
              }
            : mapItem,
        ),
      );

      ////----->Toast
      setToastType('success');
      setToastMessage('Map was edited sucessfully!');
      setToastTrigger((prev) => prev + 1);

      /*
notify('sdfsdkfnskdnfksjd')
console.log('success')
*/
    } else {
      ////----->Toast
      setToastType('error');
      setToastMessage('There was an error editing the map!');
      setToastTrigger((prev) => prev + 1);
    }
  };

  const AddMapButtonTrigger = () => {
    setAddMapTrigger(true);
  };
  return (
    <>
      <ToastContainer
        trigger={toastTrigger}
        mode={'light'}
        type={toastType}
        message={toastMessage}
      />

      <div className="absolute top-80 z-10 flex w-full items-center justify-center">
        <PurpleButton
          paddingLeft={'pl-5'}
          paddingRight={'pr-5'}
          roundedCorners={'rounded-full'}
          color={'bg-green-600'}
          clickCallBack={AddMapButtonTrigger}
        >
          <div className="text-3xl text-white"> Add Map</div>
        </PurpleButton>
      </div>
      <div className="border-box relative z-10 w-screen flex-grow pb-10 pl-10 pr-10">
        <div className="flex justify-center">
          <div className="flex flex-col">
            <div className="mt-5 grid w-screen max-w-[1800px] grid-cols-1 gap-5 pl-10 pr-10 md:pl-20 md:pr-20 lg:grid-cols-2 lg:pl-40 lg:pr-40">
              {/*bg-gradient-to-br from-zinc-950 to-zinc-800*/}
              {mapObject.map((item, index) => (
                <div key={item.mapId} className="relative w-full">
                  <div
                    onClick={() => handleRemoveUserFromMap(item)}
                    className="absolute left-2 top-2 cursor-pointer rounded-full p-1 text-red-300 hover:bg-neutral-500 hover:opacity-75"
                  >
                    {minusIcon}{' '}
                  </div>
                  <div
                    className={`flex h-full flex-col items-start justify-start gap-5 overflow-hidden rounded-lg border-2 border-transparent bg-zinc-600 p-16 text-white shadow-sm shadow-zinc-500`}
                  >
                    <div className="flex items-center gap-5">
                      <div className="text-2xl font-bold"> {item.mapName} </div>
                      <div className="font-semibold text-violet-400">
                        {' '}
                        {'null'} climbs{' '}
                      </div>
                      <div className="font-semibold text-green-400">
                        {' '}
                        {item.climbersOnMap?.length} climbers{' '}
                      </div>
                    </div>
                    <div className="text-thin text-sm">
                      {' '}
                      {item.description}{' '}
                    </div>

                    <div className="absolute bottom-2 right-2 flex w-full justify-end">
                      <Link to={`/maps/${item.mapId}`}>
                        {' '}
                        <div className="rounded-full bg-white pb-1 pl-2 pr-2 pt-1 text-black hover:opacity-75">
                          {' '}
                          {submitAirplane}
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div
                    onClick={(event) => {
                      event.stopPropagation();
                      setEditMapTrigger(true);
                      setEditMapObject(item);
                      setMapId(item.mapId);
                    }}
                    className="absolute right-2 top-2 cursor-pointer rounded-full p-1 text-white hover:bg-neutral-500 hover:opacity-75"
                  >
                    {verticalDotIcon}{' '}
                  </div>
                </div>
              ))}
            </div>
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
