import {
  addUserIcon,
  pencilIcon,
  closeIcon,
  dropDownStyles,
} from '../../../reusableComponents/styles';
import { MapObject, friendsObject } from '../../../types/interfaces';
import InputComponent from '../../../reusableComponents/input';
import ZincModal from '../../../reusableComponents/zincModal';
import SearchDropDown from '../../../reusableComponents/searchDropDown';

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
    editMapObject?.name || '',
  );
  const [descriptionState, setDescriptionState] = useState<string>(
    editMapObject?.description || '',
  );
  const [inputData, setInputData] = useState<string>('');
  const [matchingFriends, setMatchingFriends] = useState<friendsObject[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<friendsObject[]>([]);
  const [toggleSearchDropDown, setToggleSearchDropDown] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputDataCallBack = (data: string) => {
    setInputData(data);
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
          !editMapObject.peopleOnMap.some((person) => person.id === item.id) &&
          !selectedFriends.some((person) => person.id === item.id)
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

  const changeMapMetaData = (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <div className="font-semibold"> Title</div>
        <textarea
          onChange={(e) => setTitleState(e.target.value)}
          value={titleState}
          className="text-thin h-12 w-full rounded-lg bg-zinc-950 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
        ></textarea>
      </div>

      <div className="flex flex-col gap-5">
        <div className="font-semibold"> Description</div>
        <textarea
          onChange={(e) => setDescriptionState(e.target.value)}
          value={descriptionState}
          className="text-thin h-12 w-full rounded-lg bg-zinc-950 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
        ></textarea>
      </div>
    </div>
  );

  const addFriendstoMap = (
    <div className="flex flex-col gap-5">
      <div className="font-semibold">Friend Portal</div>
      <div className="w-1/2 min-w-72">
        <div className="">
          <InputComponent
            ref={inputRef}
            setPlaceHolder={'Search for Friends to Add'}
            setToggleSearchDropDown={closeDropDownCallBack}
            handleSearch={inputDataCallBack}
            paddingLeft={'pl-5'}
          />
        </div>
        <div className="mt-5 font-semibold">Friends On Map</div>
        <div className="mt-5 flex flex-wrap gap-2">
          {selectedFriends.map((person) => (
            <div
              key={person.id}
              className="w-20 rounded-lg bg-green-500 p-1 text-center font-semibold"
            >
              {person.firstName}
            </div>
          ))}
          {editMapObject.peopleOnMap?.map((person) => (
            <div
              key={person.id}
              className="w-20 rounded-lg bg-neutral-500 p-1 text-center font-semibold"
            >
              {person.firstName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ZincModal
      maxHeight={'max-h-[500px]'}
      maxWidth={'max-w-[500px]'}
      closeModalCallBack={closeModalCallBack}
    >
      <div className="flex h-full w-full flex-col gap-5 overflow-y-scroll p-1">
        <div className="flex justify-start">
          <div className="flex w-32 justify-between rounded-full bg-violet-500 p-2">
            <div
              onClick={() => setToggleState(true)}
              className={`p-1 ${!toggleState ? 'opacity-25' : ''} flex cursor-pointer items-center justify-center rounded-xl bg-zinc-900 hover:opacity-100`}
            >
              {' '}
              {pencilIcon}{' '}
            </div>
            <div
              onClick={() => setToggleState(false)}
              className={`p-1 ${toggleState ? 'opacity-25' : ''} flex cursor-pointer items-center justify-center rounded-xl bg-zinc-900 hover:opacity-100`}
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
                  <div className="flex flex-col gap-2 p-2">
                    <div>
                      <div className="flex gap-2 font-semibold">
                        <div> {item.firstName} </div>
                        <div> {item.lastName} </div>
                      </div>
                    </div>

                    <div className="text-xs font-thin">{item.userName}</div>
                    <div className="text-xs font-thin">{item.email}</div>
                  </div>
                </div>
              ))
            ) : (
              <div
                onClick={() => {
                  setToggleSearchDropDown(false);
                }}
                className="flex w-[295px] items-center p-2 text-sm text-white"
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
          editPeopleOnMapCallBack(selectedFriends);
          closeModalCallBack(false);
          EditedClimbCallBack({
            id: editMapObject.id,
            name: titleState,
            description: descriptionState,
            totalClimbs: editMapObject.totalClimbs,
            peopleOnMap: editMapObject.peopleOnMap,
          });
        }}
        className="ml-auto cursor-pointer rounded-lg bg-violet-500 p-2 font-semibold text-zinc-900 hover:opacity-75"
      >
        {' '}
        Save{' '}
      </div>
      <div
        onClick={() => closeModalCallBack(false)}
        className="absolute right-2 top-2 cursor-pointer rounded-full p-1 text-white hover:bg-slate-500 hover:opacity-75"
      >
        {' '}
        {closeIcon}{' '}
      </div>
    </ZincModal>
  );
};
export default EditModal;
