import { useState, useEffect } from 'react';
import { MapObject } from '../../types/interfaces';
import { Link } from 'react-router-dom';
import AddMapComponent from './mapsComponents/addMapModal';
import EditMapModal from './mapsComponents/editModal';
import PurpleButton from '../../reusableComponents/genericButton';
import { useAuth0 } from '@auth0/auth0-react';
import ToastContainer from '../../reusableComponents/toastContainer';
import AddFriendModal from './mapsComponents/addFriendModal';
import ButtonAndDropDown from './buttonAndDropDown';
import LoadingOverlay from '../../reusableComponents/loadingOverlay';
import {
  retrieveMapsAndUsers,
  editMap,
  removeUserFromMap,
  createMap,
} from './utilityFunctions';


interface MapProps {
  setStatsTrigger: React.Dispatch<React.SetStateAction<number>>;
}
const Maps: React.FC<MapProps> = ({ setStatsTrigger }) => {
  const [mapObject, setMapObject] = useState<MapObject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editFriendTrigger, setEditFriendTrigger] = useState(false);
  const [editMapTrigger, setEditMapTrigger] = useState(false);
  const [modalToDisplay, setModalToDisplay] = useState('');
  const [addMapTrigger, setAddMapTrigger] = useState(false);
  const [toastTrigger, setToastTrigger] = useState(0);
  const [modalTriggers, setModalTriggers] = useState(0);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const [editMapObject, setEditMapObject] = useState<MapObject>({
    mapId: -1,
    mapName: '',
    description: '',
    climbersOnMap: [],
    climbCountOnMap: 0,
  });
  const [mapId, setMapId] = useState<number>(0);
  const domain = import.meta.env.VITE_DOMAIN;
  const { user } = useAuth0();

  const closeFriendModalCallBack = () => {
    if (user?.sub) {
      retrieveMaps(user.sub);
      setStatsTrigger((prev) => prev + 1);
    } else {
      console.error('User not found');
    }
    setEditFriendTrigger(false);
  };

  const closeEditMaoModalCallBack = () => {
    setEditMapTrigger(false);
  };

  const closeAddModalCallBack = (value: boolean) => {
    setAddMapTrigger(value);
  };

  const setModalToDisplayCallBack = (value: string) => {
    setModalTriggers((prev) => prev + 1);
    setModalToDisplay(value);
  };

  useEffect(() => {
    if (modalToDisplay === 'Add Friends') {
      setEditFriendTrigger(true);
      setModalToDisplay('');
    }

    if (modalToDisplay === 'Edit Map') {
      setEditMapTrigger(true);
      setModalToDisplay('');
    }

    if (modalToDisplay === 'Delete Map') {
      handleRemoveUserFromMap(editMapObject);
      setModalToDisplay('');
      setStatsTrigger((prev) => prev + 1);
    }
  }, [modalTriggers, modalToDisplay]);
  //have to keep this function here
  const retrieveMaps = async (userId: string) => {
    try {
      setIsLoading(true);
      const mapsResponse = await fetch(
        `${domain}api/Maps/User/${userId}`,
      );

      if (!mapsResponse.ok) {
        throw new Error(`Response status: ${mapsResponse.status}`);
      }

      const mapsJson = await mapsResponse.json();

      const mapsWithUsers = await retrieveMapsAndUsers(mapsJson);

      setMapObject(mapsWithUsers);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const newMapCallBack = async (newMapObj: MapObject) => {
    if (user?.sub) {
      const mapObject = await createMap(
        newMapObj.mapName,
        newMapObj.description,
        user?.sub,
        newMapObj.imageUrl,
      );

      const combinedObject = {
        ...mapObject.mapAssociation, // Spread properties from mapAssociation
        map: {
          ...mapObject.mapAssociation.map, // Spread properties from the existing map
          imageUrl: newMapObj.imageUrl, // Include the imageUrl from the new map
          climbersOnMap: mapObject.userInformation, // Add the new property
        },
      };

      if (combinedObject) {
        ('toast');
        setMapObject((prev) => [...prev, combinedObject.map]);

        ////----->Toast
        setToastType('success');
        setToastMessage('Map was created sucessfully!');
        setToastTrigger((prev) => prev + 1);
        setStatsTrigger((prev) => prev + 1);
        if (user?.sub) {
          retrieveMaps(user.sub);
        } else {
          console.error('User not found');
        }
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
        setStatsTrigger((prev) => prev + 1);
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
    //(item,"sdfsdf")
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
      <div className="border-box 10 relative z-10 w-screen flex-grow pl-10 pr-10">
        <div className="flex justify-center">
          <div className="flex flex-col">
                         <LoadingOverlay className = "mt-10 z-10" isLoading={isLoading} text="Loading maps..." overlay={true} transparency="medium" color="gray">
              <div className="mt-5 grid w-screen max-w-[1800px] grid-cols-1 gap-6 pl-10 pr-10 md:pl-20 md:pr-20 lg:grid-cols-2 lg:pl-40 lg:pr-40 xl:grid-cols-3">
                {mapObject.map((item) => (
                  <div key={item.mapId} className="relative w-full">
                    <Link to={`/maps/${item.mapId}`} className="block">
                      <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden h-80">
                        {/* Image Section - Fixed height */}
                        <div className="relative h-48 bg-gradient-to-br from-violet-500 to-purple-600 rounded-t-xl overflow-hidden">
                          {item.imageUrl ? (
                            /* Display uploaded image */
                            <img
                              src={item.imageUrl}
                              alt={`${item.mapName} map`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to placeholder if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          {/* Placeholder for map image - shown when no image or image fails to load */}
                          <div className={`absolute inset-0 flex items-center justify-center ${item.imageUrl ? 'hidden' : ''}`}>
                            <svg
                              className="w-16 h-16 text-white opacity-80"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Information Section - Fixed height */}
                        <div className="p-4 h-32 flex flex-col justify-between">
                          {/* Title and Description */}
                          <div className="flex-1">
                            {/* Map Title */}
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                              {item.mapName}
                            </h3>
                            
                            {/* Map Description */}
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {item.description || 'No description available'}
                            </p>
                          </div>
                          
                          {/* Stats Row */}
                          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-violet-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                              <span className="font-medium text-violet-600 truncate">
                                {item.climbCountOnMap} {item.climbCountOnMap === 1 ? 'Climb' : 'Climbs'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                              </svg>
                              <span className="font-medium text-green-600 truncate">
                                {item.climbersOnMap?.length || 0} {item.climbersOnMap?.length === 1 ? 'Climber' : 'Climbers'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <ButtonAndDropDown
                      setEditMapObject={setEditMapObject}
                      setMapId={setMapId}
                      mapItem={item}
                      setModalToDisplayCallBack={setModalToDisplayCallBack}
                    />
                  </div>
                ))}
              </div>
            </LoadingOverlay>
          </div>
        </div>
      </div>

      {editFriendTrigger ? (
        <AddFriendModal
          mapId={mapId}
          editMapObject={editMapObject}
          closeModalCallBack={closeFriendModalCallBack}
        />
      ) : null}

      {editMapTrigger ? (
        <EditMapModal
          editMapObject={editMapObject}
          closeModalCallBack={closeEditMaoModalCallBack}
          EditedClimbCallBack={EditedClimbCallBack}
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
