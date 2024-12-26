import {
  checkBadge,
  chatIcon,
  newWindowIcon,
  backArrowIcon,
  expandArrowIcon,
  dropDownStyles,
  minusIcon,
  addIcon,
} from './styles';

import {
  ChatObject,
  ClimbsTableResponse,
  Tags,
  ClimbWithDependencies,
  UserObjectForFeature,
  AttemptObject,
  TickObject,
} from '../types/interfaces';
import SearchDropDown from './searchDropDown';
import TagInput from './input';
import { useState, useRef, useEffect } from 'react';
import TickAndAttempt from '../pages/mapComponents/tickAndAttempt';
import { useAuth0 } from '@auth0/auth0-react';
import {
  addUserToClimb,
  RemoveUserFromClimb,
} from '../pages/mapComponents/mapApiRequests';
import { retrieveFeatures } from '../pages/mapComponents/mapApiRequests';
type ClimbTagItem = [Tags, number];

interface ClimbModalBarProps {
  tagInputCallBack: (item: string) => void;
  climbObject: ClimbsTableResponse;
  tagObject: Tags[];
  attemptObject: AttemptObject;
  tickObject: TickObject;
  handleTagSelect: (item: ClimbTagItem) => void;
  featureTagObject: Tags[];
  climberObject: UserObjectForFeature[] | null;
  chatDisplayTriggerCallBack: () => void;
  setClimbNameForChatCallBack: (climbName: string) => void;
  setClimbGradeForChatCallBack: (climbGrade: string) => void;
  setAttemptObjectCallBack: (attemptObject: AttemptObject) => void;
  setClimbChatForChatCallBack: (climbConversation: ChatObject[]) => void;
  setClimbObject: React.Dispatch<React.SetStateAction<ClimbWithDependencies[]>>;
  setTickOverlayDisplayTrigger: React.Dispatch<React.SetStateAction<number>>;
  setAttemptOverlayDisplayTrigger: React.Dispatch<React.SetStateAction<number>>;
  setClimbIdForAttemptAndTick: React.Dispatch<React.SetStateAction<number>>;
  setTickObjectCallBack: (tickObject: TickObject) => void;
  mapId: number;
  closeModalCallBack: (trigger: boolean) => void;
  AllClimbsOnModal: ClimbWithDependencies[];
  type: string;
}

const ClimbModalBar: React.FC<ClimbModalBarProps> = ({
  tagInputCallBack,
  climbObject,
  tagObject,
  handleTagSelect,
  featureTagObject,
  tickObject,
  chatDisplayTriggerCallBack,
  setAttemptObjectCallBack,
  setTickObjectCallBack,
  setClimbNameForChatCallBack,
  setClimbGradeForChatCallBack,
  setClimbChatForChatCallBack,
  setClimbObject,
  setTickOverlayDisplayTrigger,
  setAttemptOverlayDisplayTrigger,
  climberObject,
  mapId,
  closeModalCallBack,
  setClimbIdForAttemptAndTick,
  attemptObject,
  AllClimbsOnModal,
  type,
}) => {
  const [dropDownToggle, setDropDownToggle] = useState<boolean>(false);
  const [tickClimbColor, setTickClimbColor] = useState('text-neutral-500');
  const [configToggle, setConfigToggle] = useState<number>(0);
  const [dropDownItemsState, setDropDownItemsState] = useState<boolean>(false);
  const tagInputRef = useRef(null);
  const { user } = useAuth0();
  const closeDropDownCallBack = (value: boolean) => {
    setDropDownToggle(value);
  };

  const tickButtonRef = useRef<HTMLDivElement>(null);
  const tickButtonDropDown = useRef<HTMLDivElement>(null);

  const setDropDownItemsStateCallBack = (value: boolean) => {
    setDropDownItemsState(false);
  };

  const handleClickOutside = (event: any) => {
    if (
      tickButtonDropDown.current &&
      tickButtonRef.current &&
      !tickButtonDropDown.current.contains(event.target) &&
      !tickButtonRef.current.contains(event.target)
    ) {
      setDropDownItemsState(false);
    }

    // else{setDropDownItemsState(true)}
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tickButtonDropDown, tickButtonRef]);

  const colorForTickIcon = () => {
    if (attemptObject !== null && tickObject !== null) {
      return 'text-green-500';
    } else if (attemptObject !== null && tickObject === null) {
      return 'text-amber-500';
    } else if (attemptObject === null && tickObject !== null) {
      return 'text-green-500';
    } else {
      return 'text-neutral-500';
    }
  };

  const removeOrAddClimb = async (id: number, action: string) => {
    /* setClimbsArray(prev=>prev.filter((mapItem)=>
    mapItem.climber_names.length===0?true:false))*/
    if (action === 'remove') {
      try {
        // Wait for the database update
        const data = await RemoveUserFromClimb(id, user?.sub || '', mapId);

        setClimbObject((prev) => {
          const updatedArray = prev
            .map((item) => {
              if (item.climb.climbId === id && item.userObjectForFeature) {
                const filteredUsers = item.userObjectForFeature.filter(
                  (climber) => climber.auth0ID !== user?.sub,
                );

                if (filteredUsers.length === 0) {
                  return null;
                }

                return {
                  ...item,
                  userObjectForFeature: filteredUsers,
                  attempts: null,
                  ticks: null,
                };
              }
              return item;
            })
            .filter((item): item is ClimbWithDependencies => item !== null);

          // Schedule modal close after state update
          if (updatedArray.length === 0) {
            setTimeout(() => closeModalCallBack(false), 0);
          }

          return updatedArray;
        });
      } catch (error) {
        console.error('Error removing user from climb:', error);
        // Handle error appropriately
      }
    }

    if (action === 'add') {
      const data = await addUserToClimb(id, user?.sub || '', mapId);

      setClimbObject((prev) =>
        prev.map((item) =>
          item.climb.climbId === id && item.userObjectForFeature
            ? {
                ...item,
                userObjectForFeature: [
                  ...item.userObjectForFeature,
                  {
                    auth0ID: data.user.auth0ID,
                    username: data.user.username,
                    userId: data.user.userId,
                    name: data.user.name,
                  },
                ],
              }
            : item,
        ),
      );
    }
  };

  return (
    <div className="absolute right-2 top-0 flex items-center gap-2">
      {configToggle === climbObject.climbId ? (
        <div className="flex h-12 items-center">
          <div
            onClick={() => setConfigToggle(0)}
            className="text-white hover:cursor-pointer hover:text-violet-500"
          >
            {expandArrowIcon}{' '}
          </div>
          <div
            ref={tagInputRef}
            className="w-32 cursor-pointer p-1 text-sm font-semibold text-neutral-200 hover:text-white"
          >
            <TagInput
              setToggleSearchDropDown={closeDropDownCallBack}
              setPlaceHolder={'Add Tags'}
              handleSearch={tagInputCallBack}
              paddingLeft={'pl-2'}
            />
          </div>

          {dropDownToggle ? (
            <div className="w-content absolute left-6 top-[50px] z-10">
              <SearchDropDown
                maxHeight={'max-h-32'}
                width={'w-32'}
                dropDownStatus={dropDownToggle}
                inputRef={tagInputRef}
                closeDropDownCallBack={closeDropDownCallBack}
              >
                {tagObject.length > 0 ? (
                  tagObject.filter(
                    (tagObj) =>
                      !featureTagObject.some(
                        (tag) => tag?.tagId === tagObj.tagId,
                      ),
                  ).length > 0 ? (
                    tagObject
                      .filter(
                        (tagObj) =>
                          !featureTagObject?.some(
                            (tag) => tag?.tagId === tagObj.tagId,
                          ),
                      )
                      .map((tagObj) => (
                        <div
                          onClick={() => {
                            handleTagSelect([tagObj, climbObject.climbId]);
                            setDropDownToggle(false);
                          }}
                          className={dropDownStyles('zinc')}
                          key={tagObj.tagId} // Use tagObj.id for unique keys
                        >
                          <div className="flex flex-col gap-2 p-2">
                            <div>
                              <div className="flex gap-2 font-semibold">
                                <div> {tagObj.tagName} </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div
                      onClick={() => {
                        setDropDownToggle(false);
                      }}
                      className="flex w-96 items-center p-2 text-sm text-white"
                    >
                      No Results
                    </div>
                  )
                ) : (
                  <div
                    onClick={() => {
                      setDropDownToggle(false);
                    }}
                    className="flex w-96 items-center p-2 text-sm text-white"
                  >
                    No Results
                  </div>
                )}
              </SearchDropDown>
            </div>
          ) : null}

          <div
            ref={tickButtonRef}
            onClick={() => {
              setDropDownItemsState((prev) => !prev);
              setAttemptObjectCallBack(attemptObject);
              setTickObjectCallBack(tickObject);
              setClimbIdForAttemptAndTick(climbObject.climbId);
            }}
            className={`cursor-pointer rounded-full p-1 hover:bg-slate-500 hover:opacity-75 ${colorForTickIcon()}`}
          >
            {checkBadge}
          </div>
          <div
            onClick={() => {
              chatDisplayTriggerCallBack();
              setClimbNameForChatCallBack(climbObject.climbName); //also used for ticks. Change name to be more accurate
              setClimbGradeForChatCallBack(climbObject.rating);
              setClimbChatForChatCallBack([]);
            }}
            className="cursor-pointer rounded-full p-1 text-blue-500 hover:bg-slate-500 hover:opacity-75"
          >
            {chatIcon}
          </div>
          <div ref={tickButtonDropDown}>
            <TickAndAttempt
              setClimbGradeForChatCallBack={setClimbGradeForChatCallBack}
              setClimbNameForChatCallBack={setClimbNameForChatCallBack}
              setTickOverlayDisplayTrigger={setTickOverlayDisplayTrigger}
              climbObject={climbObject}
              setDropDownItemsStateCallBack={setDropDownItemsStateCallBack}
              setTickClimbColor={setTickClimbColor}
              attemptObject={attemptObject}
              setDropDownItemsState={dropDownItemsState}
              setAttemptOverlayDisplayTrigger={setAttemptOverlayDisplayTrigger}
              setClimbObject={setClimbObject}
              tickObject={tickObject}
              type={type}
            />
          </div>
          <div
            onClick={() =>
              removeOrAddClimb(
                climbObject.climbId,
                climberObject?.find((friend) => friend.auth0ID === user?.sub)
                  ? 'remove'
                  : 'add',
              )
            }
            className={`cursor-pointer rounded-full p-1 hover:bg-slate-500 hover:opacity-75 ${climberObject?.find((friend) => friend.auth0ID === user?.sub) ? 'text-red-300' : 'text-green-300'}`}
          >
            {climberObject?.find((friend) => friend.auth0ID === user?.sub)
              ? minusIcon
              : addIcon}
          </div>
        </div>
      ) : (
        <div
          onClick={() => setConfigToggle(climbObject.climbId)}
          className="flex h-12 items-center text-white hover:cursor-pointer hover:text-violet-500"
        >
          {' '}
          {backArrowIcon}{' '}
        </div>
      )}
    </div>
  );
};
export default ClimbModalBar;
