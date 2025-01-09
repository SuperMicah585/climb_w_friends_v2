import InputComponent from '../../../reusableComponents/input';
import { FriendsList, MapObject } from '../../../types/interfaces';
import { useRef, useState, useEffect } from 'react';
import SearchDropDown from '../../../reusableComponents/searchDropDown';
import { retrieveAllUsers, addUserToMap } from '../utilityFunctions';
import ZincModal from '../../../reusableComponents/genericModal';
interface EditFriendModalProps {
  editMapObject: MapObject;
  closeModalCallBack: (trigger: boolean) => void;
  mapId: number;
}

const AddFriendModal: React.FC<EditFriendModalProps> = ({
  editMapObject,
  closeModalCallBack,
  mapId,
}) => {
  const [selectedFriends, setSelectedFriends] = useState<FriendsList[]>([]);
  const [toggleSearchDropDown, setToggleSearchDropDown] = useState(false);
  const [matchingFriends, setMatchingFriends] = useState<FriendsList[]>([]);
  const [friendsList, setFriendsList] = useState<FriendsList[]>([]);
  const [inputData, setInputData] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const closeDropDownCallBack = (trigger: boolean) => {
    setToggleSearchDropDown(trigger);
  };
  const inputDataCallBack = (data: string) => {
    setInputData(data);
  };

  const handleSubmit = async () => {
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
  };

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

  return (
    <ZincModal
      maxHeight={'max-h-[500px]'}
      maxWidth={'max-w-[500px]'}
      opacityColor={'bg-zinc-700'}
      bgColor={'bg-zinc-50'}
      closeModalCallBack={closeModalCallBack}
      closeButtonColor={'text-black'}
    >
      <div className="mt-10 flex h-full w-full flex-col gap-5 overflow-y-scroll p-1">
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
      </div>
      {toggleSearchDropDown ? (
        <div className="w-content absolute top-[160px]">
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
            handleSubmit();
          }
        }}
        className="ml-auto cursor-pointer rounded-full bg-violet-500 p-2 pl-5 pr-5 font-bold text-white hover:opacity-75"
      >
        {' '}
        Submit{' '}
      </div>
    </ZincModal>
  );
};
export default AddFriendModal;
