import {
  addUserIcon,
  pencilIcon,
  closeIcon,
  dropDownStyles,
} from '../../../reusableComponents/styles';
import { MapObject, FriendsList } from '../../../types/interfaces';
import InputComponent from '../../../reusableComponents/input';
import ZincModal from '../../../reusableComponents/genericModal';
import SearchDropDown from '../../../reusableComponents/searchDropDown';
import ToastContainer from '../../../reusableComponents/toastContainer';
import { retrieveAllUsers, addUserToMap } from '../utilityFunctions';

import { useState, useRef, useEffect } from 'react';

type EditModalProps = {
  editMapObject: MapObject;
  closeModalCallBack: (trigger: boolean) => void;
  EditedClimbCallBack: (item: MapObject) => void;
  editPeopleOnMapCallBack: (data: FriendsList[]) => void;
  mapId: number;
};
const EditModal: React.FC<EditModalProps> = ({
  mapId,
  closeModalCallBack,
  editMapObject,
  EditedClimbCallBack,
  editPeopleOnMapCallBack,
}) => {
  const [toggleState, setToggleState] = useState(true);
  const [titleState, setTitleState] = useState<string>(
    editMapObject?.mapName || '',
  );
  const [descriptionState, setDescriptionState] = useState<string>(
    editMapObject?.description || '',
  );
  const [inputData, setInputData] = useState<string>('');
  const [matchingFriends, setMatchingFriends] = useState<FriendsList[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<FriendsList[]>([]);
  const [toastTrigger, setToastTrigger] = useState(0);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const [titleInputValid, setTitleInputValid] = useState<boolean>(true);
  const [friendsList, setFriendsList] = useState<FriendsList[]>([]);
  const [descriptionInputValid, setDescriptionInputValid] =
    useState<boolean>(true);
  const [toggleSearchDropDown, setToggleSearchDropDown] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputDataCallBack = (data: string) => {
    setInputData(data);
  };
  console.log(mapId);
  const checkInput = () => {
    if (titleState.length < 6 || titleState.length > 29) {
      setToastType('error');
      setToastMessage('Title must be between 5 and 30 characters');
      setToastTrigger((prev) => prev + 1);

      setTitleInputValid(false);
    }

    if (descriptionState.length < 6 || descriptionState.length > 249) {
      setTimeout(() => {
        setToastType('error');
        setToastMessage('Description must be between 5 and 250 characters');
        setToastTrigger((prev) => prev + 1);
        setDescriptionInputValid(false);
      }, 50);
    }
  };

  const closeDropDownCallBack = (trigger: boolean) => {
    setToggleSearchDropDown(trigger);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const retrieveUsers = async () => {
      const allUsers = await retrieveAllUsers();
      setFriendsList(allUsers);
    };

    retrieveUsers();
  }, []);

  useEffect(() => {
    let tempArray = [];
    if (inputData.length > 0) {
      for (let item of friendsList) {
        // Check if the item matches search criteria AND is not already on the map AND is not already selected
        if (
          (item.username?.includes(inputData) ||
            item.name?.includes(inputData)) && // Search criteria
          !editMapObject.climbersOnMap?.some(
            (person) => person.auth0Id === item.auth0Id,
          ) && // Not on map
          !selectedFriends.some((person) => person.auth0Id === item.auth0Id) // Not already selected
        ) {
          tempArray.push(item);
        }
        if (tempArray.length > 4) {
          break;
        }
      }
      setMatchingFriends(tempArray);
    } else {
      setMatchingFriends([]);
    }
  }, [inputData, selectedFriends, friendsList]);

  const handleButtonClick = async () => {
    if (toggleState === true) {
      if (
        titleState.length >= 6 &&
        titleState.length <= 29 &&
        descriptionState.length >= 6 &&
        descriptionState.length <= 249
      ) {
        closeModalCallBack(false);
        EditedClimbCallBack({
          mapId: editMapObject.mapId,
          mapName: titleState,
          description: descriptionState,
          climbersOnMap: editMapObject.climbersOnMap,
        });
      }
    } else {
      try {
        const promises = selectedFriends.map((friend) =>
          addUserToMap(mapId, friend.auth0Id),
        );

        // Wait for all promises to resolve
        const results = await Promise.all(promises);

        console.log('All friends added successfully:', results);
      } catch (error) {
        console.error('Error adding friends to the map:', error);
      }
      closeModalCallBack(false);
    }
  };

  const changeMapMetaData = (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-1">
          <div className="font-semibold text-black"> Title -</div>
          <div className="text-thin text-xs text-black">
            {' '}
            Edit the Title of Your Map
          </div>
        </div>
        <textarea
          onChange={(e) => {
            setTitleState(e.target.value);
            setTitleInputValid(true);
          }}
          value={titleState}
          className={`text-thin h-16 w-full rounded-md ${titleInputValid ? 'border border-black' : 'border-2 border-red-500'} bg-white p-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-violet-500`}
        ></textarea>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-1">
          <div className="font-semibold text-black"> Description -</div>
          <div className="text-thin text-xs text-black">
            {' '}
            Edit the Description of Your Map
          </div>
        </div>
        <textarea
          onChange={(e) => {
            setDescriptionInputValid(true);
            setDescriptionState(e.target.value);
          }}
          value={descriptionState}
          className={`text-thin h-20 w-full rounded-md border text-black ${descriptionInputValid ? 'border-black' : 'border-2 border-red-500'} bg-white p-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500`}
        ></textarea>
      </div>
    </div>
  );

  const addFriendstoMap = (
    <div className="flex flex-col gap-5">
      <div className="font-semibold text-black">Friend Portal</div>
      <div className="w-full">
        <div className="w-1/2 min-w-72">
          <InputComponent
            ref={inputRef}
            setPlaceHolder={'Search for Friends to Add'}
            setToggleSearchDropDown={closeDropDownCallBack}
            handleSearch={inputDataCallBack}
            paddingLeft={'pl-5'}
            bgColor={'bg-white'}
          />
        </div>
        <div className="mt-5 font-semibold text-black">Friends On Map</div>
        <ul className="mt-5 flex w-full list-inside list-disc flex-col gap-2">
          {selectedFriends.map((person) => (
            <li key={person.name} className="text-sm font-bold text-black">
              {person.name}
              <span className="text-sm text-green-500">
                ({person.username})
              </span>
            </li>
          ))}
          {editMapObject.climbersOnMap?.map((person) => (
            <li key={person.name} className="text-sm font-bold text-black">
              {person.name}
              <span className="text-sm text-green-500">
                ({person.username})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      <ToastContainer
        trigger={toastTrigger}
        mode={'light'}
        type={toastType}
        message={toastMessage}
      />
      <ZincModal
        maxHeight={'max-h-[500px]'}
        maxWidth={'max-w-[500px]'}
        opacityColor={'bg-zinc-700'}
        bgColor={'bg-zinc-50'}
        closeModalCallBack={closeModalCallBack}
        closeButtonColor={'text-black'}
      >
        <div className="flex h-full w-full flex-col gap-5 overflow-y-scroll p-1">
          <div className="flex justify-start">
            <div className="flex w-32 justify-between rounded-full bg-violet-500 p-2">
              <div
                onClick={() => setToggleState(true)}
                className={`p-1 ${!toggleState ? 'opacity-25' : ''} flex cursor-pointer items-center justify-center rounded-xl bg-zinc-50 text-black hover:opacity-100`}
              >
                {' '}
                {pencilIcon}{' '}
              </div>
              <div
                onClick={() => setToggleState(false)}
                className={`p-1 ${toggleState ? 'opacity-25' : ''} flex cursor-pointer items-center justify-center rounded-xl bg-zinc-50 text-black hover:opacity-100`}
              >
                {' '}
                {addUserIcon}{' '}
              </div>
            </div>
          </div>

          {toggleState ? changeMapMetaData : addFriendstoMap}
        </div>
        {toggleSearchDropDown ? (
          <div className="w-content absolute top-[195px]">
            <SearchDropDown
              width={'w-[295px]'}
              maxHeight={'max-h-48'}
              inputRef={inputRef}
              closeDropDownCallBack={closeDropDownCallBack}
              dropDownStatus={toggleSearchDropDown}
              bgColor={'bg-white'}
              textColor={'text-black'}
              bgOpacity={'bg-opacity-100'}
            >
              {matchingFriends.length > 0 ? (
                matchingFriends.map((item: any) => (
                  <div
                    onClick={() => {
                      setSelectedFriends((prev) => [...prev, item]);
                      setToggleSearchDropDown(false);
                    }}
                    className="flex cursor-pointer items-center border-b border-neutral-200 bg-white p-2 text-sm text-black hover:bg-neutral-100"
                    key={item.id}
                  >
                    <div className="flex flex-col gap-2 p-2 text-black">
                      <div>
                        <div className="flex flex-col gap-1 font-semibold">
                          <div> {item.name} </div>
                          <div className="text-xs font-thin">
                            {' '}
                            {item.username}{' '}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs font-thin">{item.userName}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  onClick={() => {
                    setToggleSearchDropDown(false);
                  }}
                  className="flex w-[295px] items-center p-2 text-sm text-black"
                >
                  {' '}
                  No Results{' '}
                </div>
              )}
            </SearchDropDown>
          </div>
        ) : null}

        <div
          onClick={() => {
            {
              handleButtonClick();
              checkInput();
            }
          }}
          className="ml-auto cursor-pointer rounded-full bg-violet-500 p-2 pl-5 pr-5 font-bold text-white hover:opacity-75"
        >
          {' '}
          Save{' '}
        </div>
      </ZincModal>
    </>
  );
};
export default EditModal;
