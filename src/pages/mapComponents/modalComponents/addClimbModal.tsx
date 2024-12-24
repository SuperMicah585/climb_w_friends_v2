import { supabase } from '../../../supaBaseClient';
import {
  GeoJsonFeature,
  ChatObject,
  Tags,
  AddClimbsModalProps,
  deleteTagItem,
  ClimbTagItem,
  ClimbsTableResponse,
  ClimbWithDependencies,
  
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
import { retrieveClimbs,addClimbsToMap,addUserToClimb } from '../mapApiRequests';

const AddClimbModal: React.FC<AddClimbsModalProps> = ({
  closeAddClimbsModalCallBack,
  location,
  routeType,
  mapId,
  setRenderFeatureTrigger,
  AllClimbsOnMap
}) => {
  const [searchResults, setsearchResults] = useState<ClimbsTableResponse[]>([]);
  const [toggleSearchDropDown, setToggleSearchDropDown] =
    useState<boolean>(false);
  const [climbsArray, setClimbsArray] = useState<ClimbWithDependencies[]>([]);
  const [inputQuery,setInputQuery] = useState<string>('')
  const [tagObject, setTagObject] = useState<Tags[]>([]);
  const [tagsOnMount, setTagsOnMount] = useState<Tags[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [climbNameForChat, setClimbNameForChat] = useState('');
  const [displayTrigger, setDisplayTrigger] = useState(0);
  const [climbGradeForChat, setClimbGradeForChat] = useState('');
  const [climbChatForChat, setClimbChatForChat] = useState<ChatObject[]>([]);
  const [tickOverlayDisplayTrigger, setTickOverlayDisplayTrigger] =
    useState<number>(0);
  const [tickinfo, setTickInfo] = useState({});
  const [climbsOnMap,setClimbsOnMap] = useState<number[]>([])

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

  useEffect(()=>{
for(let feature of AllClimbsOnMap.features){
    setClimbsOnMap(prev=> [...prev,...feature.properties.climbs])
}
  },[AllClimbsOnMap])


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

    setInputQuery(query)
  };


  useEffect(()=>{
    const filerResults= async() =>{
    if (inputQuery.length === 0) {
      return setsearchResults([]);
    }
  

    const data = await retrieveClimbs(inputQuery);

    if (data) {

      setsearchResults(data.filter((item:ClimbsTableResponse) => {

        return !climbsArray.some(x => x.climb.climbId === item.climbId) 
               && !climbsOnMap.includes(item.climbId);
      }));
    } else {
      setsearchResults([]); // or handle as needed if data is null
    }
  }

  filerResults()
  },[climbsArray,inputQuery])



  const handleModalSubmit = async()=>{
//addUserToClimb
   await addClimbsToMap(mapId,climbsArray)
   
   const promises = climbsArray.map((item) => {
    const auth0ID = item.userObjectForFeature?.[0]?.auth0ID || '';
    if (auth0ID) {
      return addUserToClimb(item.climb.climbId, auth0ID, mapId);
    } else {
      console.warn(`No auth0ID found for climb ID ${item.climb.climbId}`);
      return Promise.resolve(); // Return a resolved promise for items without auth0ID
    }
  });
  
  await Promise.all(promises);
  
    setRenderFeatureTrigger(prev=>prev+1)

  }

  const handleClimbSelect = (item: ClimbsTableResponse) => {
    setClimbsArray((prev) => [
      ...prev,
      {
        climb: item,
        tags: [],
        userObjectForFeature: [
          {
            auth0ID: user?.sub || '',  // Ensure user?.sub is defined, or use an empty string if undefined
            username: user?.nickname,
          },
        ],
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
        <TickOverlay
          displayTrigger={tickOverlayDisplayTrigger}
          climbName={climbNameForChat}
          climbGrade={climbGradeForChat}
          tickInfo={tickinfo}
        />
      </div>

      <ZincModal
        maxHeight={'max-h-[700px]'}
        maxWidth={'max-w-[700px]'}
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
        
        searchResults
          .map((item) => (
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
                climbObject={item.climb}
                climberObject={item.userObjectForFeature}
                setClimbNameForChatCallBack={setClimbNameForChatCallBack}
                setClimbGradeForChatCallBack={setClimbGradeForChatCallBack}
                setClimbChatForChatCallBack={setClimbChatForChatCallBack}
                chatDisplayTriggerCallBack={chatDisplayTriggerCallBack}
                tagInputCallBack={tagInputCallBack}
                setClimbObject={setClimbsArray}
                setTickOverlayDisplayTrigger={setTickOverlayDisplayTrigger}
              />
            </div>
          ))}
        </div>

        <div
          onClick={() => {handleModalSubmit();closeAddClimbsModalCallBack(false)}}
          className="absolute bottom-0 right-5 flex h-16 w-full items-center justify-end bg-zinc-900"
        >
          <PurpleButton>Add Climbs</PurpleButton>
        </div>
      </ZincModal>
    </>
  );
};
export default AddClimbModal;
