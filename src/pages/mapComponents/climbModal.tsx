import { GeoJsonFeature, ChatObject, Tags } from '../../types/interfaces';
import {
  checkBadge,
  chatIcon,
  minusIcon,
  addIcon,
  newWindowIcon,
  backArrowIcon,
  expandArrowIcon,
  dropDownStyles,
} from '../../reusableComponents/styles';
import ModalSearch from './modalComponents/modalSearch';
import ModalChat from './modalComponents/chatOverlay';
import ZincModal from '../../reusableComponents/zincModal';
import TagInput from '../../reusableComponents/input';
import SearchDropeDown from '../../reusableComponents/searchDropDown';
import { tagsObject } from './mapObjects';
import { useState, useEffect, useRef } from 'react';
type ClimbModalProps = {
  clickedFeatureClimbs: GeoJsonFeature[];
  closeModalCallBack: (trigger: boolean) => void;
};

type ClimbTagItem = [Tags, string];
const ClimbModal: React.FC<ClimbModalProps> = ({
  clickedFeatureClimbs,
  closeModalCallBack = () => {},
}) => {
  const [isClimbAdded, setIsClimbAdded] = useState<boolean>(false);
  const [routeFilterString, setRouteFilterString] = useState<string>('');
  const [sortString, setSortString] = useState('Order Grade ASC');
  const [isClimbTicked, setisClimbTicked] = useState(false);
  const [displayTrigger, setDisplayTrigger] = useState(0);
  const [climbNameForChat, setClimbNameForChat] = useState('');
  const [climbGradeForChat, setClimbGradeForChat] = useState('');
  const [climbChatForChat, setClimbChatForChat] = useState<ChatObject[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [configToggle, setConfigToggle] = useState<string>('');
  const [dropDownToggle, setDropDownToggle] = useState<boolean>(false);
  const [tagObject, setTagObject] = useState<Tags[]>([]);
  const [tagClimbArray, setTagClimbArray] = useState<ClimbTagItem[]>([]);

  console.log(tagClimbArray);

  const tagInputRef = useRef(null);
  const closeDropDownCallBack = (value: boolean) => {
    setDropDownToggle(value);
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

  const handleTagSelect = (item: ClimbTagItem) => {
    setTagClimbArray((prev) => [...prev, item]);
  };

  const mp_page = (item: GeoJsonFeature) => {
    const url = `https://www.mountainproject.com/route/${item.id}/${encodeURIComponent(item.name)}`;
    window.open(url, '_blank'); // Open in a new tab
  };

  useEffect(() => {
    console.log(tagInput);
  }, [tagInput]);

  useEffect(() => {
    setTagObject(tagsObject);
  }, [tagsObject]);

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

        <div>
          <div className="w-full rounded-md bg-zinc-900">
            {clickedFeatureClimbs
              .filter((item: GeoJsonFeature) =>
                item.name
                  .toLowerCase()
                  .includes(routeFilterString.toLowerCase()),
              )

              .sort((a, b) => {
                if (sortString === 'Order Route ASC') {
                  return a.name.localeCompare(b.name); // Sort alphabetically by name
                } else if (sortString === 'Order Route DESC') {
                  return b.name.localeCompare(a.name); // Sort in reverse alphabetical order
                }
                return 0;
              })

              .map((item: GeoJsonFeature) => (
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
                  <div
                    onClick={() => setIsClimbAdded((prev) => !prev)}
                    className={`absolute right-2 top-2 cursor-pointer rounded-full p-1 hover:bg-slate-500 hover:opacity-75 ${isClimbAdded ? 'text-red-300' : 'text-green-300'}`}
                  >
                    {isClimbAdded ? minusIcon : addIcon}
                  </div>

                  <div className="absolute bottom-2 right-2 flex items-center gap-2">
                    {configToggle === item.id ? (
                      <div className="flex h-12 items-center">
                        <div
                          onClick={() => setConfigToggle('')}
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
                            <SearchDropeDown
                              maxHeight={'max-h-32'}
                              width={'w-32'}
                              dropDownStatus={dropDownToggle}
                              inputRef={tagInputRef}
                              closeDropDownCallBack={closeDropDownCallBack}
                            >
                              {tagObject.length > 0 ? (
                                tagObject.map((tagObj) => (
                                  <div
                                    onClick={() => {
                                      handleTagSelect([tagObj, item.id]);
                                      setDropDownToggle(false);
                                    }}
                                    className={dropDownStyles}
                                    key={item.id}
                                  >
                                    <div className="flex flex-col gap-2 p-2">
                                      <div>
                                        <div className="flex gap-2 font-semibold">
                                          <div> {tagObj.tag} </div>
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
                                  {' '}
                                  No Results{' '}
                                </div>
                              )}
                            </SearchDropeDown>
                          </div>
                        ) : null}

                        <div
                          onClick={() => setisClimbTicked((prev) => !prev)}
                          className={`cursor-pointer rounded-full p-1 hover:bg-slate-500 hover:opacity-75 ${isClimbTicked ? 'text-green-500' : 'text-neutral-500 hover:text-neutral-400'}`}
                        >
                          {checkBadge}
                        </div>
                        <div
                          onClick={() => {
                            setDisplayTrigger((prev) => prev + 1);
                            setClimbNameForChat(item.name);
                            setClimbGradeForChat(item.grade);
                            setClimbChatForChat(item.conversation);
                          }}
                          className="cursor-pointer rounded-full p-1 text-blue-500 hover:bg-slate-500 hover:opacity-75"
                        >
                          {chatIcon}
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => setConfigToggle(item.id)}
                        className="flex h-12 items-center text-white hover:cursor-pointer hover:text-violet-500"
                      >
                        {' '}
                        {backArrowIcon}{' '}
                      </div>
                    )}
                  </div>

                  {/* Main details section */}
                  <div className="flex gap-5 font-semibold text-white">
                    <div>{item.name}</div>
                    <div className="white border-r"></div>
                    <div>{item.grade}</div>
                  </div>

                  <div className="text-sm italic text-white">Sport</div>

                  <div className="text-xs text-white">
                    Roadside Boulder &gt; Jefferson Lake &gt; Olympic Bouldering
                    &gt; Olympic National Park &gt; Olympics & Pacific Coast
                    &gt; Washington
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-xs font-bold italic text-black">
                    {item.climber_names.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-md border-2 border-violet-500 p-1 text-white"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs font-bold italic text-black">
                    {tagClimbArray.map((itemArray) =>
                      itemArray[1] === item.id ? (
                        <div
                          key={'itemArray' + itemArray[1]}
                          className="rounded-md border-2 border-violet-500 p-1 text-white"
                        >
                          {itemArray[0].tag}
                        </div>
                      ) : null,
                    )}
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
