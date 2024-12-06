import {
  addUserIcon,
  pencilIcon,
  closeIcon,
  dropDownStyles,
} from '../../../reusableComponents/styles';
import { MapObject, friendsObject } from '../../../types/interfaces';
import InputComponent from '../../../reusableComponents/input';
import ZincModal from '../../../reusableComponents/genericModal';
import SearchDropDown from '../../../reusableComponents/searchDropDown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useRef, useEffect } from 'react';

type EditModalProps = {
  editMapObject: MapObject;
  closeModalCallBack: (trigger: boolean) => void;
  EditedClimbCallBack: (item: MapObject) => void;
  friendsList: friendsObject[];
  editPeopleOnMapCallBack: (data: friendsObject[]) => void;
};
const EditModal: React.FC<EditModalProps> = ({
  closeModalCallBack,
  editMapObject,
  EditedClimbCallBack,
  friendsList,
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
  const [matchingFriends, setMatchingFriends] = useState<friendsObject[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<friendsObject[]>([]);
  const [titleInputValid, setTitleInputValid] = useState<boolean>(true);
  const [descriptionInputValid, setDescriptionInputValid] =
    useState<boolean>(true);
  const [toggleSearchDropDown, setToggleSearchDropDown] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputDataCallBack = (data: string) => {
    setInputData(data);
  };

  const notify = (displayMesage:string) => toast.error(displayMesage);

  const checkInput = () => {
    if (titleState.length <6 || titleState.length>29) {
      
      notify('Title must be between 5 and 30 characters')
      setTitleInputValid(false);
    }

    if (descriptionState.length < 6 || descriptionState.length>249 ) {
      console.log(descriptionState.length,"sdfsdfsdf")
      notify('Description must be between 5 and 250 characters')
      setDescriptionInputValid(false);
    }
  };

  const closeDropDownCallBack = (trigger: boolean) => {
    setToggleSearchDropDown(trigger);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    let tempArray = [];
    if (inputData.length > 0) {
      for (let item of friendsList) {
        if (
          (item.userName?.includes(inputData) ||
            item.firstName?.includes(inputData) ||
            item.lastName?.includes(inputData)) &&
          !editMapObject.climbersOnMap?.some(
            (person) => person.userId === item.userId,
          ) &&
          !selectedFriends.some((person) => person.userId === item.userId)
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
  }, [inputData, selectedFriends]);

  const handleButtonClick = () => {
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
        return null; // Nothing to render
      }
      return null; // Invalid input
    } else {
      editPeopleOnMapCallBack(selectedFriends);
      return null;
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
            <li key={person.userName} className="text-sm font-bold text-black">
              {person.firstName} {person.lastName}
              <span className="text-sm text-green-500">
                ({person.userName})
              </span>
            </li>
          ))}
          {editMapObject.climbersOnMap?.map((person) => (
            <li key={person.userId} className="text-sm font-bold text-black">
              {person.userId}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <>
    <ToastContainer />
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
                  className={dropDownStyles}
                  key={item.id}
                >
                  <div className="flex flex-col gap-2 p-2 text-black">
                    <div>
                      <div className="flex gap-1 font-semibold">
                        <div> {item.firstName} </div>
                        <div> {item.lastName} </div>
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
          

          {handleButtonClick()
          checkInput();
        }}}
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
