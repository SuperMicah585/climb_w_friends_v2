import { supabase } from '../../../supaBaseClient';
import {
  Tags,
  GeoJsonObject,
  ClimbTagItem,
  ClimbsTableResponse,
  ClimbWithDependencies,
  AttemptObject,
  TickObject,
  ChatObject,
} from '../../../types/interfaces';
import InputComponent from '../../../reusableComponents/input';
import SearchDropDown from '../../../reusableComponents/searchDropDown';
import ZincModal from '../../../reusableComponents/genericModal';
import { useState, useRef, useEffect } from 'react';
import { dropDownStyles } from '../../../reusableComponents/styles';
import PurpleButton from '../../../reusableComponents/genericButton';
import ClimbModalBar from '../../../reusableComponents/climbModalBar';
import Tooltip from '../../../reusableComponents/toolTip';
import { newWindowIcon, minusIcon } from '../../../reusableComponents/styles';
import TickOverlay from '../tickOverlay';
import { useAuth0 } from '@auth0/auth0-react';
import ModalChat from '../chatOverlay';
import {
  retrieveClimbs,
  addClimbsToMap,
  addUserToClimb,
  AddTickToClimbToUserToMap,
  AddAttemptToClimbToUserToMap,
  addTagToClimb,
  AddChatToClimb,
} from '../mapApiRequests';
import AttemptOverlay from '../attemptOverlay';

interface AddClimbsModalProps {
  location: string;
  routeType: string;
  closeAddClimbsModalCallBack: (trigger: boolean) => void;
  mapId: number;
  setRenderFeatureTrigger: React.Dispatch<React.SetStateAction<number>>;
  AllClimbsOnMap: GeoJsonObject;
  auth0Id: string;
}

const AddClimbModal: React.FC<AddClimbsModalProps> = ({
  closeAddClimbsModalCallBack,
  location,
  routeType,
  mapId,
  setRenderFeatureTrigger,
  AllClimbsOnMap,
  auth0Id,
}) => {
  const [searchResults, setsearchResults] = useState<ClimbsTableResponse[]>([]);
  const [toggleSearchDropDown, setToggleSearchDropDown] =
    useState<boolean>(false);
  const [climbsArray, setClimbsArray] = useState<ClimbWithDependencies[]>([]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [tagObject, setTagObject] = useState<Tags[]>([]);
  const [tagsOnMount, setTagsOnMount] = useState<Tags[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [attemptObject, setAttemptObject] = useState<AttemptObject | null>(
    null,
  );
  const [tickObject, setTickObject] = useState<TickObject | null>(null);
  const [climbNameForChat, setClimbNameForChat] = useState('');
  const [displayTrigger, setDisplayTrigger] = useState(0);
  const [climbGradeForChat, setClimbGradeForChat] = useState('');
  const [climbChatForChat, setClimbChatForChat] = useState<ChatObject[]>([]);
  const [climbIdForAttemptAndTick, setClimbIdForAttemptAndTick] =
    useState<number>(-1);
  const [tickOverlayDisplayTrigger, setTickOverlayDisplayTrigger] =
    useState<number>(0);
  const [attemptOverlayDisplayTrigger, setAttemptOverlayDisplayTrigger] =
    useState<number>(0);
  const [climbIdForClimbChat, setClimbIdForClimbChat] = useState<number>(-1);
  const [tickinfo, setTickInfo] = useState({});
  const [climbsOnMap, setClimbsOnMap] = useState<number[]>([]);

  const inputRef = useRef(null);

  const setClimbNameForChatCallBack = (climbName: string) => {
    setClimbNameForChat(climbName);
  };

  const setClimbGradeForChatCallBack = (climbGrade: string) => {
    setClimbGradeForChat(climbGrade);
  };

  const setClimbChatForChatCallBack = (climbConversation: ChatObject[]) => {
    setClimbChatForChat(climbConversation);
  };

  const chatDisplayTriggerCallBack = () => {
    setDisplayTrigger((prev) => prev + 1);
  };

  const { user } = useAuth0();

  const deleteTagCallBack = (item: Tags) => {
    setClimbsArray((prev) => {
      // Return a new state array with the updated tags
      return prev.map((dependenciesItem) => {
        if (dependenciesItem.tags.find((tg) => tg.tagId === item.tagId)) {
          //dependenciesItem.climb.climbId && item.tagId

          dependenciesItem.tags = dependenciesItem.tags.filter(
            (tg) => tg.tagId !== item.tagId,
          );
        }
        return dependenciesItem;
      });
    });
  };

  const tagInputCallBack = (item: string) => {
    setTagInput(item);
  };

  useEffect(() => {
    for (let feature of AllClimbsOnMap.features) {
      setClimbsOnMap((prev) => [...prev, ...feature.properties.climbs]);
    }
  }, [AllClimbsOnMap]);

  useEffect(() => {
    const retrieveTagsOnMap = async (mapId: number) => {
      const url = `http://localhost:5074/api/Tags/ByMap/${mapId}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        // Update the specific object at the given index in the array

        setTagsOnMount(json);
        setTagObject(json);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    retrieveTagsOnMap(mapId);
  }, [mapId]);

  useEffect(() => {
    if (tagInput.length > 0) {
      setTagObject(
        tagsOnMount.filter((item) => item.tagName.includes(tagInput)),
      );
    } else {
      setTagObject(tagsOnMount);
    }
  }, [tagInput]);

  const setToggleSearchDropDownCallBack = (booleanValue: boolean) => {
    setToggleSearchDropDown(booleanValue);
  };

  const handleClimbSearch = async (query: string) => {
    setInputQuery(query);
  };

  useEffect(() => {
    const filerResults = async () => {
      if (inputQuery.length === 0) {
        return setsearchResults([]);
      }

      const data = await retrieveClimbs(inputQuery);

      if (data) {
        setsearchResults(
          data.filter((item: ClimbsTableResponse) => {
            return (
              !climbsArray.some((x) => x.climb.climbId === item.climbId) &&
              !climbsOnMap.includes(item.climbId)
            );
          }),
        );
      } else {
        setsearchResults([]); // or handle as needed if data is null
      }
    };

    filerResults();
  }, [climbsArray, inputQuery]);

  const setAttemptObjectCallBack = (attemptObject: AttemptObject | null) => {
    if (attemptObject !== null) {
      setAttemptObject(attemptObject);
    } else {
      setAttemptObject(null);
    }
  };

  const setTickObjectCallBack = (tickObject: TickObject | null) => {
    if (attemptObject !== null) {
      setTickObject(tickObject);
    } else {
      setTickObject(null);
    }
  };

  const handleModalSubmit = async () => {
    try {
      // Log for debugging

      // First add all climbs to map
      await addClimbsToMap(mapId, climbsArray);

      // Process each climb's associated data
      const promises = climbsArray.map(async (item) => {
        try {
          // Handle user association
          const auth0ID = item.userObjectForFeature?.[0]?.auth0ID;
          if (auth0ID) {
            await addUserToClimb(item.climb.climbId, auth0ID, mapId);
          }

          // Handle attempts - fix string comparison
          if (
            item.attempts?.userId &&
            typeof item.attempts.userId === 'string'
          ) {
            await AddAttemptToClimbToUserToMap(
              item.attempts.climbId,
              item.attempts.userId,
              item.attempts.mapId,
              item.attempts.notes,
              item.attempts.difficulty,
              item.attempts.attempts,
            );
          }

          // Handle ticks - fix string comparison
          if (item.ticks?.userId && typeof item.ticks.userId === 'string') {
            await AddTickToClimbToUserToMap(
              item.ticks.climbId,
              item.ticks.userId,
              item.ticks.mapId,
              item.ticks.notes,
              item.ticks.difficulty,
              item.ticks.attempts,
            );
          }

          // Handle tags
          if (Array.isArray(item.tags) && item.tags.length > 0) {
            const tagPromises = item.tags.map((tag) =>
              addTagToClimb(tag.tagId, item.climb.climbId),
            );
            await Promise.all(tagPromises);
          }
        } catch (itemError) {
          console.error(
            `Error processing climb ${item.climb?.climbId}:`,
            itemError,
          );
          throw itemError; // Re-throw to be caught by outer try-catch
        }
      });

      await Promise.all(promises);
      climbsArray, 'submit';
      for (let item of climbsArray) {
        for (let chatObject of item.chatObject) {
          await AddChatToClimb(
            chatObject.ClimbChatId,
            auth0Id,
            mapId,
            chatObject.message,
          );
        }
      }

      setRenderFeatureTrigger((prev) => prev + 1);
    } catch (error) {
      console.error('Error in handleModalSubmit:', error);
      // Consider adding error handling UI feedback here
      throw error; // Re-throw if you want calling code to handle it
    }
  };

  climbsArray, 'climbsarraty';

  const handleClimbSelect = (item: ClimbsTableResponse) => {
    setClimbsArray((prev) => [
      ...prev,
      {
        climb: item,
        tags: [],
        userObjectForFeature: [
          {
            auth0ID: user?.sub || '', // Ensure user?.sub is defined, or use an empty string if undefined
            username: user?.nickname,
          },
        ],
        ticks: null,
        attempts: null,
        chatObject: [],
      },
    ]);
  };

  const handleTagSelect = (item: ClimbTagItem) => {
    setClimbsArray((prev) => {
      const newState = [...prev];

      // Find the correct climbItem
      const climbItem = newState.find((ci) => ci.climb.climbId === item[1]);

      if (climbItem) {
        // Ensure tags is an array before pushing

        //item[1], (item[0].tagId)
        if (!climbItem.tags) {
          climbItem.tags = [];
        }

        climbItem.tags.push(item[0]);
      }

      return newState;
    });
  };

  const mp_page = (item: ClimbsTableResponse) => {
    const url = item.url;
    window.open(url, '_blank'); // Open in a new tab
  };

  return (
    <>
      <div
        className="pointer-events-none absolute z-20 flex h-screen w-screen items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <ModalChat
          climbGrade={climbGradeForChat}
          climbName={climbNameForChat}
          climbChatObject={climbChatForChat}
          userId={auth0Id}
          mapId={mapId}
          climbIdForClimbChat={climbIdForClimbChat}
          setClimbObject={setClimbsArray}
          displayTrigger={displayTrigger}
          type="addclimb"
        />
        <TickOverlay
          displayTrigger={tickOverlayDisplayTrigger}
          climbName={climbNameForChat}
          climbGrade={climbGradeForChat}
          mapId={mapId}
          userId={auth0Id}
          setClimbObject={setClimbsArray}
          climbIdForAttemptAndTick={climbIdForAttemptAndTick}
          tickObject={tickObject}
          type="addclimb"
        />

        <AttemptOverlay
          displayTrigger={attemptOverlayDisplayTrigger}
          climbName={climbNameForChat}
          climbGrade={climbGradeForChat}
          attemptObject={attemptObject}
          mapId={mapId}
          userId={auth0Id}
          climbIdForAttemptAndTick={climbIdForAttemptAndTick}
          setClimbObject={setClimbsArray}
          type="addclimb"
        />
      </div>

      <ZincModal
        maxHeight={'h-2/3 min-h-[400px]'}
        maxWidth={'max-w-[700px] min-w-[600px]'}
        closeModalCallBack={closeAddClimbsModalCallBack}
      >
        <div className="flex w-full flex-col gap-5">
          <div ref={inputRef} className="w-96">
            <InputComponent
              setToggleSearchDropDown={setToggleSearchDropDownCallBack}
              setPlaceHolder={`Search for ${routeType} climbs in ${location}`}
              handleSearch={handleClimbSearch}
              paddingLeft={'pl-2'}
            />
          </div>
          <div className="border-b border-neutral-500"> </div>
        </div>

        {toggleSearchDropDown ? (
          <div className="w-content absolute top-[72px] z-10">
            <SearchDropDown
              width={'w-96'}
              maxHeight={'max-h-48'}
              dropDownStatus={toggleSearchDropDown}
              inputRef={inputRef}
              closeDropDownCallBack={setToggleSearchDropDownCallBack}
            >
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <div
                    onClick={() => {
                      handleClimbSelect(item);
                      setToggleSearchDropDown(false);
                    }}
                    className={dropDownStyles('gray')}
                    key={item.climbId}
                  >
                    <div className="flex flex-col gap-2 p-2">
                      <div>
                        <div className="flex gap-2 font-semibold">
                          <div>{item.climbName}</div>
                          <div>{item.rating}</div>
                        </div>
                        <div className="text-xs font-thin italic">
                          {item.climbType}
                        </div>
                      </div>
                      <div className="text-xs font-thin">{item.location}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  onClick={() => setToggleSearchDropDown(false)}
                  className="flex w-96 items-center p-2 text-sm text-white"
                >
                  No Results
                </div>
              )}
            </SearchDropDown>
          </div>
        ) : null}

        <div className="flex w-full flex-col overflow-y-scroll pb-12">
          {climbsArray.map((item) => (
            <div
              key={item.climb.climbId}
              className="relative mt-5 flex flex-col gap-2 rounded-md bg-customGray p-10 text-black shadow-sm shadow-white"
            >
              <div
                onClick={() => mp_page(item.climb)}
                className="absolute left-2 top-1 cursor-pointer rounded-lg p-1 text-neutral-500 hover:bg-slate-500 hover:text-neutral-400 hover:opacity-75"
              >
                {' '}
                {newWindowIcon}{' '}
              </div>

              <div className="mt-5 flex gap-5 font-semibold text-white">
                <div>{item.climb.climbName}</div>
                <div className="white border-r"></div>
                <div>{item.climb.rating}</div>
              </div>
              <div className="text-sm italic text-white">
                {item.climb.climbType}
              </div>
              <div className="text-xs text-white">{item.climb.location}</div>

              <div className="mt-2 flex min-h-8 items-center gap-2 text-xs font-bold text-white">
                Climbers:
                <div className="rounded-md border-2 border-violet-900 bg-violet-600 p-1">
                  {item.userObjectForFeature?.map((item) => item.username)}
                </div>
              </div>

              <div className="mt-2 flex min-h-8 w-2/3 flex-wrap items-center gap-2 text-xs font-bold text-white">
                Tags:
                {item.tags?.length > 0
                  ? item.tags.map((tagsOnClimb) => (
                      <Tooltip
                        deleteItemCallBack={deleteTagCallBack}
                        item={tagsOnClimb}
                      >
                        <div
                          key={tagsOnClimb.tagId}
                          className="rounded-md border-2 border-green-900 bg-green-600 p-1 text-white hover:opacity-75"
                        >
                          {tagsOnClimb.tagName}
                        </div>
                      </Tooltip>
                    ))
                  : null}
              </div>
              <ClimbModalBar
                featureTagObject={item.tags}
                handleTagSelect={handleTagSelect}
                tagObject={tagObject}
                setAttemptOverlayDisplayTrigger={
                  setAttemptOverlayDisplayTrigger
                }
                climbObject={item.climb}
                setClimbIdForAttemptAndTick={setClimbIdForAttemptAndTick}
                climberObject={item.userObjectForFeature}
                setClimbNameForChatCallBack={setClimbNameForChatCallBack}
                setClimbGradeForChatCallBack={setClimbGradeForChatCallBack}
                setClimbChatForChatCallBack={setClimbChatForChatCallBack}
                chatDisplayTriggerCallBack={chatDisplayTriggerCallBack}
                tagInputCallBack={tagInputCallBack}
                setClimbObject={setClimbsArray}
                setTickOverlayDisplayTrigger={setTickOverlayDisplayTrigger}
                attemptObject={item.attempts}
                tickObject={item.ticks}
                chatObject={item.chatObject}
                setAttemptObjectCallBack={setAttemptObjectCallBack}
                setTickObjectCallBack={setTickObjectCallBack}
                setClimbIdForClimbChat={setClimbIdForClimbChat}
                type="addclimb"
              />
            </div>
          ))}
        </div>

        <div
          onClick={() => {
            handleModalSubmit();
            closeAddClimbsModalCallBack(false);
          }}
          className="absolute bottom-0 right-5 flex h-16 w-full items-center justify-end bg-zinc-900"
        >
          <PurpleButton>Add Climbs</PurpleButton>
        </div>
      </ZincModal>
    </>
  );
};
export default AddClimbModal;
