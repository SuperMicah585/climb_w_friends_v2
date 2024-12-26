import {
  GeoJsonFeature,
  ChatObject,
  Tags,
  TempDic,
  deleteTagItem,
  ClimbTagItem,
  ClimbWithDependencies,
  AttemptObject,
  TickObject
} from '../../../types/interfaces';
import { newWindowIcon } from '../../../reusableComponents/styles';
import ModalSearch from './modalSearch';
import ModalChat from '../chatOverlay';
import ZincModal from '../../../reusableComponents/genericModal';
import Tooltip from '../../../reusableComponents/toolTip';
import { useState, useEffect } from 'react';
import ClimbModalBar from '../../../reusableComponents/climbModalBar';
import TickOverlay from '../tickOverlay';
import AttemptOverlay from '../attemptOverlay';
import { useAuth0 } from '@auth0/auth0-react';
import {
  retrieveClimbDependencies,
  addTagToClimb,
  removeTagFromClimb,
  retrieveFeatureDependencies,
} from '../mapApiRequests';
export type ClimbModalProps = {
  clickedFeatureClimbs: number | ClimbWithDependencies[];
  closeModalCallBack: (trigger: boolean) => void;
  mapId: number;
  auth0Id:string
};

const ClimbModal: React.FC<ClimbModalProps> = ({
  clickedFeatureClimbs,
  closeModalCallBack = () => {},
  mapId,
  auth0Id
}) => {
  const [routeFilterString, setRouteFilterString] = useState<string>('');
  const [sortString, setSortString] = useState('Order Grade ASC');
  const [displayTrigger, setDisplayTrigger] = useState(0);
  const [climbNameForChat, setClimbNameForChat] = useState('');
  const [climbGradeForChat, setClimbGradeForChat] = useState('');
  const [attemptObject, setAttemptObject] = useState<AttemptObject | null>(null);
  const [tickObject, setTickObject] = useState<TickObject | null>(null);
  const [climbIdForAttemptAndTick, setClimbIdForAttemptAndTick] = useState<number>(-1)
  const [climbChatForChat, setClimbChatForChat] = useState<ChatObject[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [tagObject, setTagObject] = useState<Tags[]>([]);
  const [climbObject, setClimbObject] = useState<ClimbWithDependencies[]>([]);
  const [tickOverlayDisplayTrigger, setTickOverlayDisplayTrigger] =
    useState<number>(0);
    const [attemptOverlayDisplayTrigger, setAttemptOverlayDisplayTrigger] =
    useState<number>(0);
  const [tagsOnMount, setTagsOnMount] = useState<Tags[]>([]);



  const setClimbNameForChatCallBack = (climbName: string) => {
    setClimbNameForChat(climbName);
  };

  const setClimbGradeForChatCallBack = (climbGrade: string) => {
    setClimbGradeForChat(climbGrade);
  };

  const setAttemptObjectCallBack = (attemptObject: AttemptObject | null) => {
    if (attemptObject !== null) {
      setAttemptObject(attemptObject);
    }

    else{
      setAttemptObject(null);
    }
  };

  const setTickObjectCallBack = (tickObject: TickObject | null) => {
    if (attemptObject !== null) {
      setTickObject(tickObject);
    }

    else{
      setTickObject(null);
    }
  };

  const setClimbChatForChatCallBack = (climbConversation: ChatObject[]) => {
    setClimbChatForChat(climbConversation);
  };

  const chatDisplayTriggerCallBack = () => {
    setDisplayTrigger((prev) => prev + 1);
  };

  const tagInputCallBack = (item: string) => {
    setTagInput(item);
  };

  const searchFilterCallBack = (data: string) => {
    setRouteFilterString(data);
  };

  const sortStringCallBack = (data: string) => {
    setSortString(data);
  };

  //console.log(climbObject,"Sdfsd")
  const handleTagSelect = (item: ClimbTagItem) => {
    setClimbObject((prev) => {
      const newState = [...prev];

      // Find the correct climbItem
      const climbItem = newState.find((ci) => ci.climb.climbId === item[1]);

      if (climbItem) {
        // Ensure tags is an array before pushing

        //item[1], (item[0].tagId)
        if (!climbItem.tags) {
          climbItem.tags = [];
        }
        //not waiting to make sure it updates correctly.
        addTagToClimb(item[0].tagId, item[1]);

        climbItem.tags.push(item[0]);
      }

      return newState;
    });
  };


  useEffect(() => {
    const fetchClimbs = async () => {
      try {
        if (typeof clickedFeatureClimbs === 'number') {
          const results =
            await retrieveFeatureDependencies(clickedFeatureClimbs,auth0Id);
          setClimbObject(results);
        } else {
          setClimbObject(clickedFeatureClimbs);
        }
      } catch (error) {
        console.error('Error fetching climbs:', error);
      }
    };

    if (typeof clickedFeatureClimbs === 'number') {
      if (clickedFeatureClimbs >= 0) {
        fetchClimbs();
      }
    } else {
      fetchClimbs();
    }
  }, [clickedFeatureClimbs]);

  useEffect(() => {
    if (tagInput.length > 0) {
      setTagObject(
        tagsOnMount.filter((item) => item.tagName.includes(tagInput)),
      );
    } else {
      setTagObject(tagsOnMount);
    }
  }, [tagInput]);

  const mp_page = (item: ClimbWithDependencies) => {
    window.open(item.climb.url, '_blank'); // Open in a new tab
  };

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

  const deleteTagCallBack = (item: Tags) => {
    setClimbObject((prev) => {
      // Return a new state array with the updated tags
      return prev.map((dependenciesItem) => {
        if (dependenciesItem.tags.find((tg) => tg.tagId === item.tagId)) {
          //dependenciesItem.climb.climbId && item.tagId
          removeTagFromClimb(item.tagId, dependenciesItem.climb.climbId);
          dependenciesItem.tags = dependenciesItem.tags.filter(
            (tg) => tg.tagId !== item.tagId,
          );
        }
        return dependenciesItem;
      });
    });
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
          climbChat={climbChatForChat}
          displayTrigger={displayTrigger}
        />

        <TickOverlay
          displayTrigger={tickOverlayDisplayTrigger}
          climbName={climbNameForChat}
          climbGrade={climbGradeForChat}
          mapId = {mapId}
          userId={auth0Id}
          setClimbObject = {setClimbObject}
          climbIdForAttemptAndTick = {climbIdForAttemptAndTick}
          tickObject={tickObject}
          
        />

        <AttemptOverlay
          displayTrigger={attemptOverlayDisplayTrigger}
          climbName={climbNameForChat}
          climbGrade={climbGradeForChat}
          attemptObject = {attemptObject}
          mapId = {mapId}
          userId={auth0Id}
          climbIdForAttemptAndTick = {climbIdForAttemptAndTick}
          setClimbObject = {setClimbObject}

/>
      </div>
      <ZincModal
        maxHeight={'max-h-[700px]'}
        maxWidth={'max-w-[700px]'}
        closeModalCallBack={closeModalCallBack}
      >
        <ModalSearch
          sortStringCallBack={sortStringCallBack}
          searchFilterCallBack={searchFilterCallBack}
        />

        <div className = 'w-full'>
          <div className="w-full rounded-md bg-zinc-900">
            {climbObject
              .filter((item: ClimbWithDependencies) =>
                item.climb?.climbName
                  .toLowerCase()
                  .includes(routeFilterString.toLowerCase()),
              )

              .sort((a, b) => {
                if (sortString === 'Order Route ASC') {
                  return a.climb?.climbName.localeCompare(b.climb?.climbName); // Sort alphabetically by name
                } else if (sortString === 'Order Route DESC') {
                  return b.climb?.climbName.localeCompare(a.climb?.climbName); // Sort in reverse alphabetical order
                }
                return 0;
              })

              .map((item: ClimbWithDependencies) => (
                <div
                  key={item.climb?.climbId}
                  className="relative w-full mt-5 flex flex-col gap-2 rounded-md bg-customGray p-10 text-black shadow-sm shadow-white"
                >
                  <div
                    onClick={() => mp_page(item)}
                    className="absolute left-2 top-1 cursor-pointer rounded-lg p-1 text-neutral-500 hover:bg-slate-500 hover:text-neutral-400 hover:opacity-75"
                  >
                    {' '}
                    {newWindowIcon}{' '}
                  </div>

                  {/* climbObject, tagObject, handleTagSelect, featureTagObject*/}
                  <ClimbModalBar
                    featureTagObject={item.tags}
                    handleTagSelect={handleTagSelect}
                    tagObject={tagObject}
                    climbObject={item.climb}
                    climberObject={item.userObjectForFeature} //placeholder for real use data
                    setClimbObject={setClimbObject}
                    setClimbNameForChatCallBack={setClimbNameForChatCallBack}
                    setClimbGradeForChatCallBack={setClimbGradeForChatCallBack}
                    setAttemptObjectCallBack={setAttemptObjectCallBack}
                    setTickObjectCallBack = {setTickObjectCallBack}
                    attemptObject = {item.attempts}
                    tickObject = {item.ticks}
                    setClimbIdForAttemptAndTick = {setClimbIdForAttemptAndTick}
                    setClimbChatForChatCallBack={setClimbChatForChatCallBack}
                    chatDisplayTriggerCallBack={chatDisplayTriggerCallBack}
                    tagInputCallBack={tagInputCallBack}
                    setTickOverlayDisplayTrigger={setTickOverlayDisplayTrigger}
                    setAttemptOverlayDisplayTrigger = {setAttemptOverlayDisplayTrigger}
                    mapId = {mapId}
                    closeModalCallBack = {closeModalCallBack}
                    AllClimbsOnModal = {climbObject}
                  />

                  <div className="mt-5 flex gap-5 font-semibold text-white">
                    <div>{item.climb.climbName}</div>
                    <div className="white border-r"></div>
                    <div>{item.climb.rating}</div>
                  </div>

                  <div className="text-sm italic text-white">
                    {item.climb.climbType}
                  </div>

                  <div className="text-xs text-white">
                    {item.climb.location}
                  </div>
                  <div className="mt-2 flex min-h-8 items-center gap-2 text-xs font-bold text-white">
                    Climbers:
                    {item.userObjectForFeature?.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-md border-2 border-violet-900 bg-violet-600 p-1"
                      >
                        {item.username}
                      </div>
                    ))}
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
                </div>
              ))}
          </div>
        </div>
      </ZincModal>
    </>
  );
};
export default ClimbModal;
