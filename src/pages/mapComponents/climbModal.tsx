import { GeoJsonFeature, ChatObject, Tags,ClimbModalProps,TempDic,deleteTagItem,ClimbTagItem } from '../../types/interfaces';
import {
  minusIcon,
  addIcon,
  newWindowIcon,
} from '../../reusableComponents/styles';
import ModalSearch from './modalComponents/modalSearch';
import ModalChat from './modalComponents/chatOverlay';
import ZincModal from '../../reusableComponents/zincModal';
import Tooltip from '../../reusableComponents/toolTip';
import { tagsObject, exampleTagOnClimb, micah } from './mapObjects';
import { useState, useEffect } from 'react';
import ClimbModalBar from '../../reusableComponents/climbModalBar';

const ClimbModal: React.FC<ClimbModalProps> = ({
  clickedFeatureClimbs,
  closeModalCallBack = () => {},
}) => {
  const [routeFilterString, setRouteFilterString] = useState<string>('');
  const [sortString, setSortString] = useState('Order Grade ASC');
  const [displayTrigger, setDisplayTrigger] = useState(0);
  const [climbNameForChat, setClimbNameForChat] = useState('');
  const [climbGradeForChat, setClimbGradeForChat] = useState('');
  const [climbChatForChat, setClimbChatForChat] = useState<ChatObject[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [tagObject, setTagObject] = useState<Tags[]>([]);
  const [climbObject, setClimbObject] = useState<GeoJsonFeature[]>([]);

  const [featureTagObject, setFeatureTagObject] = useState<TempDic>({});

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

  const tagInputCallBack = (item: string) => {
    setTagInput(item);
  };

  const searchFilterCallBack = (data: string) => {
    setRouteFilterString(data);
  };

  const sortStringCallBack = (data: string) => {
    setSortString(data);
  };

  const removeOrAddClimb = (id: string, name: string, action: string) => {
    if (action === 'remove') {
      setClimbObject((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                climber_names: item.climber_names.filter(
                  (climber) => climber !== name,
                ),
              }
            : item,
        ),
      );
    }

    if (action === 'add') {
      setClimbObject((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                climber_names: [...item.climber_names, name],
              }
            : item,
        ),
      );
    }
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

  useEffect(() => {
    console.log(clickedFeatureClimbs);
    setClimbObject(clickedFeatureClimbs);
  }, [clickedFeatureClimbs]);

  useEffect(() => {
    setTagObject(tagsObject.filter((item) => item.tag.includes(tagInput)));
  }, [tagInput]);

  const mp_page = (item: GeoJsonFeature) => {
    const url = `https://www.mountainproject.com/route/${item.id}/${encodeURIComponent(item.name)}`;
    window.open(url, '_blank'); // Open in a new tab
  };

  useEffect(() => {
    setTagObject(tagsObject);
  }, [tagsObject]);

  useEffect(() => {
    let tempDic: TempDic = {};

    for (let item of climbObject) {
      tempDic[item.id] = exampleTagOnClimb.filter(
        (tagItem) => tagItem.climbID === item.id,
      );
    }

    setFeatureTagObject(tempDic);
  }, [exampleTagOnClimb, climbObject]);

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
            {climbObject
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
                    onClick={() =>
                      removeOrAddClimb(
                        item.id,
                        micah.name,
                        item.climber_names.includes(micah.name)
                          ? 'remove'
                          : 'add',
                      )
                    }
                    className={`absolute right-2 top-2 cursor-pointer rounded-full p-1 hover:bg-slate-500 hover:opacity-75 ${item.climber_names.includes(micah.name) ? 'text-red-300' : 'text-green-300'}`}
                  >
                    {item.climber_names.includes(micah.name)
                      ? minusIcon
                      : addIcon}
                  </div>
                  {/* climbObject, tagObject, handleTagSelect, featureTagObject*/}
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
                  />
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
                  <div className="mt-2 flex items-center h-7 gap-2 text-xs font-bold text-white">
                    Climbers:
                    {item.climber_names.map((item, index) => (
                      <div key={index} className="rounded-lg bg-violet-800 p-1">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex w-2/3 flex-wrap h-7 items-center gap-2 text-xs font-bold text-white">
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
                </div>
              ))}
          </div>
        </div>
      </ZincModal>
    </>
  );
};
export default ClimbModal;
