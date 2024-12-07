import { useState, useEffect } from 'react';
import { exampleMapObjects, friendExample } from './dashboardObjects';
import { MapObject, friendsObject } from '../../types/interfaces';
import { verticalDotIcon, minusIcon } from '../../reusableComponents/styles';
import { Link } from 'react-router-dom';
import AddMapComponent from './mapsComponents/addMapModal';
import EditModal from './mapsComponents/editModal';
import PurpleButton from '../../reusableComponents/genericButton';
import { useAuth0 } from '@auth0/auth0-react';
import { retrieveMapsAndUsers, retrieveUsersOnMap } from './utilityFunctions';
import { submitAirplane } from '../../reusableComponents/styles';

const Maps = () => {
  const [mapObject, setMapObject] = useState<MapObject[]>([]);
  const [editMapTrigger, setEditMapTrigger] = useState(false);
  const [addMapTrigger, setAddMapTrigger] = useState(false);
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

  const retrieveMaps = async (url: string) => {
    try {
      const mapsResponse = await fetch(url);
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

  const addUserToMap = async (mapId: number, userId: string, type: string) => {
    const payload = { UserId: userId };

    try {
      const response = await fetch(
        `http://localhost:5074/api/Maps/${mapId}/users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        const data = await response.json(); // Safely parse JSON

        /*tldr when user gets added to a map two things may happen

1) User will join a map without any users. 
When this happens we will take the map object and manuall create the key/array that contains the one climber for it on the frontend. This happens when createMap is called
OR
2) User will join an already created map. When this happens we must get the map objects and all of the users before the user is added. We will
then add the user to the map on the client side.

*/

        if (data.map) {
          if (type === 'mapCreate') {
            data.map['climbersOnMap'] = [
              {
                userId: userId,
                firstName: 'Micah',
                lastName: 'Phelps',
                email: 'micahphlps@gmail.com',
                userName: 'phelpsm4',
              },
            ]; //code here will change once we get user table
            setMapObject((prev) => [...prev, data.map]); // Update state with new map
          }

          //code here for when user gets added to an existing map
        } else {
          console.warn('Response does not contain "map" property:', data);
        }
      } else {
        const error = await response.text();
        console.error('Error joining the map:', error);
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  const removeUserFromMap = async (mapId: number, userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5074/api/Maps/${mapId}/users/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        setMapObject((prev) =>
          prev.filter((mapItem) => (mapId === mapItem.mapId ? false : true)),
        );
      } else {
        const error = await response.text();
        console.error('Error adding user to map:', error);
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  const newMapCallBack = (newMapObj: MapObject) => {
    createMap(newMapObj.mapName, newMapObj.description);
    //setMapObject((prev) => [...prev, newMapObj]);
  };

  const createMap = async (title: string, description: string) => {
    try {
      const response = await fetch(`http://localhost:5074/api/Maps/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          mapName: title, // Ensure this matches backend expectations
        }),
      });

      if (response.ok) {
        const mapObject = await response.json(); // Safely parse JSON

        if (mapObject && user?.sub) {
          await addUserToMap(mapObject.mapId, user.sub, 'mapCreate');
        } else {
          console.error('Map object or user is not defined.');
        }
      } else {
        const error = await response.text();
        console.error('Error creating the map:', error);
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  useEffect(() => {
    if (user) {
      const url = `http://localhost:5074/api/Maps/User/${user?.sub}`;
      retrieveMaps(url);
    }
  }, [user]);

  const handleRemoveUserFromMap = (item: MapObject) => {
    if (user?.sub && item) {
      removeUserFromMap(item.mapId, user.sub);
    } else {
      console.error('user or map not defined');
    }
  };

  const EditedClimbCallBack = (item: any) => {
    setMapObject((prev) =>
      prev.map((mapItem) =>
        mapItem.mapId === item.id
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
