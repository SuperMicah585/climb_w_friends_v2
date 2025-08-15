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
      );

      const combinedObject = {
        ...mapObject.mapAssociation, // Spread properties from mapAssociation
        map: {
          ...mapObject.mapAssociation.map, // Spread properties from the existing map
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
              <div className="mt-5 grid w-screen max-w-[1800px] grid-cols-1 gap-5 pl-10 pr-10 md:pl-20 md:pr-20 lg:grid-cols-2 lg:pl-40 lg:pr-40">
                {/*bg-gradient-to-br from-zinc-950 to-zinc-800*/}
                {mapObject.map((item) => (
                  <div key={item.mapId} className="relative w-full">
                    <Link to={`/maps/${item.mapId}`} className="block">
                      <div
                        className={`relative flex h-full flex-col items-start justify-start gap-5 overflow-hidden rounded-lg border-2 border-transparent bg-zinc-600 p-16 text-white shadow-sm shadow-zinc-500 hover:bg-zinc-500 transition-colors duration-200 cursor-pointer group`}
                      >
                        <div className="flex items-center gap-5">
                          <div className="text-2xl font-bold"> {item.mapName} </div>
                          <div className="font-semibold text-violet-400">
                            {' '}
                            {item.climbCountOnMap}{' '}
                            {item.climbCountOnMap === 1 ? 'Climb' : 'Climbs'}{' '}
                          </div>
                          <div className="font-semibold text-green-400">
                            {' '}
                            {item.climbersOnMap?.length}{' '}
                            {item.climbersOnMap?.length === 1
                              ? 'Climber'
                              : 'Climbers'}{' '}
                          </div>
                        </div>
                        <div className="text-thin text-sm">
                          {' '}
                          {item.description}{' '}
                        </div>
                        
                        {/* Right Arrow - appears on hover */}
                        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-12 h-12 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
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
