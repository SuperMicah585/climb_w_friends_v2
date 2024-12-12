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
  GeoJsonFeature,
  Tags,
  Micah,
} from '../types/interfaces';
import SearchDropDown from './searchDropDown';
import { micah } from '../pages/mapComponents/mapObjects';
import TagInput from './input';
import { useState, useRef, useEffect } from 'react';
import TickClimbsComponent from '../pages/mapComponents/tickClimbsComponent';

import { useFilterContext } from '../pages/filterProvider';
type ClimbTagItem = [Tags, number];

interface ClimbModalBarProps {
  tagInputCallBack: (item: string) => void;
  climbObject: ClimbsTableResponse;
  tagObject: Tags[];
  handleTagSelect: (item: ClimbTagItem) => void;
  featureTagObject: TempDic;
  chatDisplayTriggerCallBack: () => void;
  setClimbNameForChatCallBack: (climbName: string) => void;
  setClimbGradeForChatCallBack: (climbGrade: string) => void;
  setClimbChatForChatCallBack: (climbConversation: ChatObject[]) => void;
  setClimbObject: React.Dispatch<React.SetStateAction<ClimbsTableResponse[]>>;
  setTickOverlayDisplayTrigger: React.Dispatch<React.SetStateAction<number>>;
}
type TempDic = {
  [key: string]: (Tags | null)[];
};

const ClimbModalBar: React.FC<ClimbModalBarProps> = ({
  tagInputCallBack,
  climbObject,
  tagObject,
  handleTagSelect,
  featureTagObject,
  chatDisplayTriggerCallBack,
  setClimbNameForChatCallBack,
  setClimbGradeForChatCallBack,
  setClimbChatForChatCallBack,
  setClimbObject,
  setTickOverlayDisplayTrigger,
}) => {
  const [dropDownToggle, setDropDownToggle] = useState<boolean>(false);
  const [isClimbTicked, setisClimbTicked] = useState(false);
  const [configToggle, setConfigToggle] = useState<number>(0);
  const [dropDownItemsState, setDropDownItemsState] = useState<boolean>(false);
  const tagInputRef = useRef(null);

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

  const removeOrAddClimb = (id: number, name: string, action: string) => {
    /* setClimbsArray(prev=>prev.filter((mapItem)=>
    mapItem.climber_names.length===0?true:false))*/
    if (action === 'remove') {
      setClimbObject((prev) => {
        const tmpArray = prev.map((item) =>
          item.climbId === id
            ? {
                ...item,
                climber_names: item.climber_names.filter(
                  (climber) => climber !== name,
                ),
              }
            : item,
        );

        return tmpArray.filter((mapItem) =>
          mapItem.climber_names.length === 0 ? false : true,
        );
      });
    }

    if (action === 'add') {
      setClimbObject((prev) =>
        prev.map((item) =>
          item.climbId === id
            ? {
                ...item,
                climber_names: [...item.climber_names, name],
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
                      !featureTagObject[climbObject.climbId]?.some(
                        (tag) => tag?.tagId === tagObj.tagId,
                      ),
                  ).length > 0 ? (
                    tagObject
                      .filter(
                        (tagObj) =>
                          !featureTagObject[climbObject.climbId]?.some(
                            (tag) => tag?.tagId === tagObj.tagId,
                          ),
                      )
                      .map((tagObj) => (
                        <div
                          onClick={() => {
                            handleTagSelect([tagObj, climbObject.climbId]);
                            setDropDownToggle(false);
                          }}
                          className={dropDownStyles}
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
            }}
            className={`cursor-pointer rounded-full p-1 hover:bg-slate-500 hover:opacity-75 ${isClimbTicked ? 'text-green-500' : 'text-neutral-500 hover:text-neutral-400'}`}
          >
            {checkBadge}
          </div>
          <div
            onClick={() => {
              chatDisplayTriggerCallBack();
              setClimbNameForChatCallBack(climbObject.climbName); //also used for ticks. Change name to be more accurate
              setClimbGradeForChatCallBack(climbObject.rating);
              setClimbChatForChatCallBack(climbObject.conversation);
            }}
            className="cursor-pointer rounded-full p-1 text-blue-500 hover:bg-slate-500 hover:opacity-75"
          >
            {chatIcon}
          </div>
          <div ref={tickButtonDropDown}>
            <TickClimbsComponent
              setClimbGradeForChatCallBack={setClimbGradeForChatCallBack}
              setClimbNameForChatCallBack={setClimbNameForChatCallBack}
              setTickOverlayDisplayTrigger={setTickOverlayDisplayTrigger}
              climbObject={climbObject}
              setDropDownItemsStateCallBack={setDropDownItemsStateCallBack}
              setisClimbTicked={setisClimbTicked}
              setDropDownItemsState={dropDownItemsState}
            />
          </div>
          <div
            onClick={() =>
              removeOrAddClimb(
                climbObject.climbId,
                micah.name,
                climbObject.climber_names.includes(micah.name)
                  ? 'remove'
                  : 'add',
              )
            }
            className={`cursor-pointer rounded-full p-1 hover:bg-slate-500 hover:opacity-75 ${climbObject.climber_names.includes(micah.name) ? 'text-red-300' : 'text-green-300'}`}
          >
            {climbObject.climber_names.includes(micah.name)
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
