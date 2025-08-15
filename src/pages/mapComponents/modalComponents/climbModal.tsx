import {
  ChatObject,
  Tags,
  ClimbTagItem,
  ClimbWithDependencies,
  AttemptObject,
  TickObject,
  TickAndAttemptObjectBeforeResponse
} from '../../../types/interfaces';
import { 
  newWindowIcon, 
  calendarIcon, 
  locationIcon, 
  usersIcon, 
  gradeIcon,
  tagIcon 
} from '../../../reusableComponents/styles';
import ModalSearch from './modalSearch';
import ModalChat from '../chatOverlay';
import ZincModal from '../../../reusableComponents/genericModal';
import Tooltip from '../../../reusableComponents/toolTip';
import { useState, useEffect } from 'react';
import ClimbModalBar from '../../../reusableComponents/climbModalBar';
import TickOverlay from '../tickOverlay';
import AttemptOverlay from '../attemptOverlay';
import { compareGrades } from '../gradeComparison';
import { LoadingOverlay } from '../../../reusableComponents';
import {
  addTagToClimb,
  removeTagFromClimb,
  retrieveFeatureDependencies,
} from '../mapApiRequests';
export type ClimbModalProps = {
  clickedFeatureClimbs: number | ClimbWithDependencies[];
  closeModalCallBack: (trigger: boolean) => void;
  mapId: number;
  auth0Id: string;
  isLoading?:boolean
};

const ClimbModal: React.FC<ClimbModalProps> = ({
  clickedFeatureClimbs,
  closeModalCallBack = () => {},
  mapId,
  auth0Id,
  isLoading = false
  
}) => {
  const [routeFilterString, setRouteFilterString] = useState<string>('');
  const [sortString, setSortString] = useState('Order Grade ASC');
  const [displayTrigger, setDisplayTrigger] = useState(0);
  const [climbNameForChat, setClimbNameForChat] = useState('');
  const [climbGradeForChat, setClimbGradeForChat] = useState('');
  const [attemptObject, setAttemptObject] = useState<AttemptObject | null | TickAndAttemptObjectBeforeResponse>(
    null,
  );
  const [tickObject, setTickObject] = useState<TickObject | null | TickAndAttemptObjectBeforeResponse>(null);
  const [climbIdForAttemptAndTick, setClimbIdForAttemptAndTick] =
    useState<number>(-1);
  const [climbChatForChat, setClimbChatForChat] = useState<ChatObject[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [tagObject, setTagObject] = useState<Tags[]>([]);
  const [climbObject, setClimbObject] = useState<ClimbWithDependencies[]>([]);
  const [tickOverlayDisplayTrigger, setTickOverlayDisplayTrigger] =
    useState<number>(0);
  const [attemptOverlayDisplayTrigger, setAttemptOverlayDisplayTrigger] =
    useState<number>(0);
  const [tagsOnMount, setTagsOnMount] = useState<Tags[]>([]);
  const [climbIdForClimbChat, setClimbIdForClimbChat] = useState<number>(-1);
  const [loading,notLoading] = useState<boolean>(false)
  const setClimbNameForChatCallBack = (climbName: string) => {
    setClimbNameForChat(climbName);
  };
  
  const domain = import.meta.env.VITE_DOMAIN;
  const setClimbGradeForChatCallBack = (climbGrade: string) => {
    setClimbGradeForChat(climbGrade);
  };

  const setAttemptObjectCallBack = (attemptObject: AttemptObject | null | TickAndAttemptObjectBeforeResponse) => {
    if (attemptObject !== null) {
      setAttemptObject(attemptObject);
    } else {
      setAttemptObject(null);
    }
  };

  const setTickObjectCallBack = (tickObject: TickObject | null | TickAndAttemptObjectBeforeResponse) => {
    if (tickObject !== null) {
      setTickObject(tickObject);
    } else {
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

  //(climbObject,"Sdfsd")
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
        addTagToClimb(item[0].tagId, item[1], mapId);

        climbItem.tags.push(item[0]);
      }

      return newState;
    });
  };

  useEffect(() => {
    const fetchClimbs = async () => {
      try {
        if (typeof clickedFeatureClimbs === 'number') {
          notLoading(true)
          const results = await retrieveFeatureDependencies(
            clickedFeatureClimbs,
            auth0Id,
          );
          setClimbObject(results);
          
        } else {
          setClimbObject(clickedFeatureClimbs);
        }
      } catch (error) {
        console.error('Error fetching climbs:', error);
      }
      finally {
        notLoading(false)
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
      const url = `${domain}api/Tags/ByMap/${mapId}`;
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

  climbObject;
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
          setClimbObject={setClimbObject}
          displayTrigger={displayTrigger}
          type="climb"
        />

        <TickOverlay
          displayTrigger={tickOverlayDisplayTrigger}
          climbName={climbNameForChat}
          climbGrade={climbGradeForChat}
          mapId={mapId}
          userId={auth0Id}
          setClimbObject={setClimbObject}
          climbIdForAttemptAndTick={climbIdForAttemptAndTick}
          tickObject={tickObject}
          type="climb"
        />

        <AttemptOverlay
          displayTrigger={attemptOverlayDisplayTrigger}
          climbName={climbNameForChat}
          climbGrade={climbGradeForChat}
          attemptObject={attemptObject}
          mapId={mapId}
          userId={auth0Id}
          climbIdForAttemptAndTick={climbIdForAttemptAndTick}
          setClimbObject={setClimbObject}
          type="climb"
        />
      </div>
      <ZincModal
        maxHeight={'h-2/3 min-h-[400px]'}
        maxWidth={'max-w-[700px] min-w-[600px]'}
        closeModalCallBack={closeModalCallBack}
      >
        
        <ModalSearch
          sortStringCallBack={sortStringCallBack}
          searchFilterCallBack={searchFilterCallBack}
        />
        <LoadingOverlay className = 'w-full h-full' isLoading = {isLoading || loading} text = "loading..."> 
        <div className="w-full">
          {climbObject
            .filter((item: ClimbWithDependencies) =>
              item.climb?.climbName
                .toLowerCase()
                .includes(routeFilterString.toLowerCase()),
            )

            .sort((a, b) => {
              if (sortString === 'Order By Grade DESC') {
                return compareGrades(b.climb?.rating, a.climb?.rating);
              } else if (sortString === 'Order By Grade ASC') {
                return compareGrades(a.climb?.rating, b.climb?.rating);
              }
              return 0;
            })

            .map((item: ClimbWithDependencies) => (
              <div
                key={item.climb.climbId}
                className="relative mt-5 flex w-full flex-col gap-2 rounded-md bg-white p-10 text-gray-800 shadow-sm border border-gray-200"
              >
                  <div
                    onClick={() => mp_page(item)}
                    className="absolute left-2 top-1 cursor-pointer rounded-lg p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 hover:opacity-75"
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
                    setTickObjectCallBack={setTickObjectCallBack}
                    attemptObject={item.attempts}
                    tickObject={item.ticks}
                    chatObject={item.chatObject}
                    setClimbIdForAttemptAndTick={setClimbIdForAttemptAndTick}
                    setClimbChatForChatCallBack={setClimbChatForChatCallBack}
                    chatDisplayTriggerCallBack={chatDisplayTriggerCallBack}
                    tagInputCallBack={tagInputCallBack}
                    setClimbIdForClimbChat={setClimbIdForClimbChat}
                    setTickOverlayDisplayTrigger={setTickOverlayDisplayTrigger}
                    setAttemptOverlayDisplayTrigger={
                      setAttemptOverlayDisplayTrigger
                    }
                    mapId={mapId}
                    closeModalCallBack={closeModalCallBack}
                    AllClimbsOnModal={climbObject}
                    type="climb"
                  />

                  <div className="mt-5 flex items-center gap-5 font-semibold text-gray-800">
                    <div className="">{item.climb.climbName}</div>
                    <div className="border-r border-gray-300"></div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <div className="w-4 h-4 flex-shrink-0">
                        {gradeIcon}
                      </div>
                      {item.climb.rating}
                    </div>
                    <div className="border-r border-gray-300"></div>
                    <div className="text-sm italic flex-shrink-0">
                      {item.climb.climbType}
                    </div>
                  </div>

                  {item.associatedAt && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 italic">
                      <div className="w-4 h-4 flex-shrink-0">
                        {calendarIcon}
                      </div>
                      Added on {new Date(item.associatedAt).toLocaleDateString()}
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <div className="w-4 h-4 flex-shrink-0">
                      {locationIcon}
                    </div>
                    {item.climb.location}
                  </div>
                  <div className="mt-2 flex min-h-8 items-center gap-2 text-xs font-bold text-gray-800">
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <div className="w-4 h-4 flex-shrink-0">
                        {usersIcon}
                      </div>
                      Climbers:
                    </div>
                    {item.userObjectForFeature?.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-md border-2 border-violet-300 bg-violet-200 p-1 text-violet-800"
                      >
                        {item.username}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex min-h-8 w-2/3 flex-wrap items-center gap-2 text-xs font-bold text-gray-800">
                    <div className="flex items-start gap-2 flex-shrink-0">
                      <div className="w-4 h-4 flex-shrink-0">
                        {tagIcon}
                      </div>
                      Tags:
                    </div>
                    {item.tags?.length > 0
                      ? item.tags.map((tagsOnClimb) => (
                          <Tooltip
                            deleteItemCallBack={deleteTagCallBack}
                            item={tagsOnClimb}
                            key={tagsOnClimb.tagId}
                          >
                            <div className="rounded-md border-2 border-green-300 bg-green-200 p-1 text-green-800 hover:opacity-75">
                              {tagsOnClimb.tagName}
                            </div>
                          </Tooltip>
                        ))
                      : null}
                  </div>
                </div>
              ))}
        </div>
        </LoadingOverlay>
      </ZincModal>
    </>
  );
};
export default ClimbModal;
