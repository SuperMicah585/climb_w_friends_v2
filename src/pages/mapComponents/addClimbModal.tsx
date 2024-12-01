import { supabase } from '../../supaBaseClient';
import { GeoJsonFeature, ChatObject, Tags,AddClimbsModalProps,deleteTagItem,ClimbTagItem,TempDic } from '../../types/interfaces';
import { ClimbsTableResponse } from '../../types/interfaces';
import InputComponent from '../../reusableComponents/input';
import SearchDropDown from '../../reusableComponents/searchDropDown';
import ZincModal from '../../reusableComponents/zincModal';
import { useState, useRef,useEffect } from 'react';
import { dropDownStyles } from '../../reusableComponents/styles';
import PurpleButton from '../../reusableComponents/purpleButton';
import ClimbModalBar from '../../reusableComponents/climbModalBar';
import { tagsObject, exampleTagOnClimb, micah } from './mapObjects';
import Tooltip from '../../reusableComponents/toolTip';
import { newWindowIcon,minusIcon } from '../../reusableComponents/styles';

const AddClimbModal: React.FC<AddClimbsModalProps> = ({
  closeAddClimbsModalCallBack,
  location,
  routeType,
}) => {
  const [searchResults, setsearchResults] = useState<ClimbsTableResponse[]>([]);
  const [toggleSearchDropDown, setToggleSearchDropDown] =
    useState<boolean>(false);
  const [climbsArray, setClimbsArray] = useState<ClimbsTableResponse[]>([]);
  const [featureTagObject, setFeatureTagObject] = useState<TempDic>({});
  const [tagObject, setTagObject] = useState<Tags[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [climbNameForChat, setClimbNameForChat] = useState('');
  const [displayTrigger, setDisplayTrigger] = useState(0);
  const [climbGradeForChat, setClimbGradeForChat] = useState('');
  const [climbChatForChat, setClimbChatForChat] = useState<ChatObject[]>([]);


  const inputRef = useRef(null);
console.log(climbsArray)
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

  const deleteTagCallBack = (item: deleteTagItem) => {
    setFeatureTagObject((prev) => {
      if (prev[item[0]] && prev[item[0]].length > 0) {
        return {
          ...prev,
          [item[0]]: prev[item[0]].filter((tag) => tag?.id !== item[1]),
        };
      } else {
        return prev;
      }
    });
  };

  const tagInputCallBack = (item: string) => {
    setTagInput(item);
  };

  useEffect(() => {
    setTagObject(tagsObject);
  }, [tagsObject]);

  useEffect(() => {
    setTagObject(tagsObject.filter((item) => item.tag.includes(tagInput)));
  }, [tagInput]);

  const setToggleSearchDropDownCallBack = (booleanValue: boolean) => {
    setToggleSearchDropDown(booleanValue);
  };

  const handleClimbSearch = async (query: string) => {
    if (query.length === 0) {
      return setsearchResults([]);
    }

    const { data, error }: { data: ClimbsTableResponse[] | null; error: any } =
      await supabase
        .from('climbs_test')
        .select('*')
        .ilike('name', `%${query}%`)
        .ilike('Location', `%${location}%`)
        .ilike('Route Type', `%${routeType}%`)
        .limit(10);
    if (error) {
      console.error('Error fetching climbs:', error);
      return;
    }

    if (data) {
        setsearchResults(data)
            
        
    } else {
      setsearchResults([]); // or handle as needed if data is null
    }
  };

  const handleClimbSelect = (item: ClimbsTableResponse) => {
    setClimbsArray((prev) => [...prev, {...item,climber_names:["Micah"]}]);
  };

  const handleTagSelect = (item: ClimbTagItem) => {

    setFeatureTagObject((prev) => {
      const newState = { ...prev };
      const key = item[1];
      const value = item[0];
      if (newState[key]) {
        newState[key] = [...newState[key], value];
      } else {
        newState[key] = [value];
      }

      return newState;
    });
  };

  const mp_page = (item: GeoJsonFeature) => {
    const url = item.URL
    window.open(url, '_blank'); // Open in a new tab
  };

  const handleRemoveClimb = (item:ClimbsTableResponse) =>{
    setClimbsArray(prev=>prev.filter((mapItem)=>
    mapItem.id !== item.id
    ))

  }

  /*
  useEffect(()=>{

    setClimbsArray(prev=>prev.filter((mapItem)=>
    mapItem.climber_names.length===0?true:false))

  },[climbsArray])

  */
//()=>{handleRemoveClimb(item)}
  //<div className = 'text-5xl w-full'>{location} | {routeType} </div>
  return (
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
              searchResults.filter((item)=>
              climbsArray.length>0?!climbsArray.some((x)=>x.id ===item.id):true
             
             ).map((item) => (
                <div
                  onClick={() => {
                    handleClimbSelect(item);
                    setToggleSearchDropDown(false);
                  }}
                  className={dropDownStyles}
                  key={item.id}
                >
                  <div className="flex flex-col gap-2 p-2">
                    <div>
                      <div className="flex gap-2 font-semibold">
                        <div> {item.name} </div>
                        <div> {item.grade} </div>
                      </div>
                      <div className="text-xs font-thin italic">
                        {' '}
                        {item['Route Type']}{' '}
                      </div>
                    </div>

                    <div className="text-xs font-thin">{item.Location}</div>
                  </div>
                </div>
              ))
            ) : (
              <div
                onClick={() => {
                  setToggleSearchDropDown(false);
                }}
                className="flex w-96 items-center p-2 text-sm text-white"
              >
                {' '}
                No Results{' '}
              </div>
            )}
          </SearchDropDown>
        </div>
      ) : null}

      <div className="flex w-full flex-col overflow-y-scroll pb-12">
        {climbsArray.map((item) => (
          <div
            key={item.id}
            className="relative mt-5 flex flex-col gap-2 rounded-md bg-zinc-800 p-10 text-black shadow-sm shadow-violet-200"
          >
                <div
                    onClick={() => mp_page(item)}
                    className="absolute left-2 top-1 cursor-pointer rounded-lg p-1 text-neutral-500 hover:bg-slate-500 hover:text-neutral-400 hover:opacity-75"
                  >
                    {' '}
                    {newWindowIcon}{' '}
                  </div>

   
            <div className="flex gap-5 mt-5 font-semibold text-white">
              <div>{item.name}</div>
              <div className="white border-r"></div>
              <div>{item.grade}</div>
            </div>
            <div className="text-sm italic text-white">
              {item['Route Type']}
            </div>
            <div className="text-xs text-white">{item.Location}</div>

            <div className="mt-2 flex items-center gap-2 h-7 text-xs font-bold text-white">
                    Climbers:
                 
                      <div className="rounded-lg bg-violet-800 p-1">
                        {item.climber_names.map((item)=>item)}
                      </div>
                 
                  </div>
                  
            <div className="mt-2 flex w-2/3 flex-wrap items-center h-7 gap-2 text-xs font-bold text-white">
                    Tags:
                    {featureTagObject[item.id]?.length > 0
                      ? featureTagObject[item.id]?.map((tagsOnClimb) => (
                          <Tooltip
                            deleteItemCallBack={deleteTagCallBack}
                            item={[item.id, tagsOnClimb?.id]}
                          >
                            <div
                              key={tagsOnClimb?.id}
                              className="rounded-md bg-green-800 p-1 text-white"
                            >
                              {tagsOnClimb?.tag}
                            </div>
                          </Tooltip>
                        ))
                      : null}
                  </div>
            <ClimbModalBar
                    featureTagObject={featureTagObject}
                    handleTagSelect={handleTagSelect}
                    tagObject={tagObject}
                    climbObject={item}
                    setClimbNameForChatCallBack={setClimbNameForChatCallBack}
                    setClimbGradeForChatCallBack={setClimbGradeForChatCallBack}
                    setClimbChatForChatCallBack={setClimbChatForChatCallBack}
                    chatDisplayTriggerCallBack={chatDisplayTriggerCallBack}
                    tagInputCallBack={tagInputCallBack}
                    setClimbObject={setClimbsArray}
                    
                  />
          </div>
        ))}

      </div>

      <div onClick = {()=>closeAddClimbsModalCallBack(false)} className="absolute bottom-0 right-5 flex h-16 w-full items-center justify-end bg-zinc-900">
        <PurpleButton>Add Climbs</PurpleButton>
      </div>
    </ZincModal>
  );
};
export default AddClimbModal;
