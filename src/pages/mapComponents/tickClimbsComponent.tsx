import { useState, useEffect, useRef } from 'react';
import DownDrop from '../../reusableComponents/downDrop';
import { GeoJsonFeature } from '../../types/interfaces';

interface TickClimbsComponent {
  setisClimbTicked: React.Dispatch<React.SetStateAction<boolean>>;
  setDropDownItemsState: boolean;
  setDropDownItemsStateCallBack: (value: boolean) => void;
  climbObject: GeoJsonFeature;
  setTickOverlayDisplayTrigger: React.Dispatch<React.SetStateAction<number>>;
  setClimbNameForChatCallBack: (climbName: string) => void;
  setClimbGradeForChatCallBack: (climbGrade: string) => void;
}
const TickClimbsComponent: React.FC<TickClimbsComponent> = ({
  setClimbGradeForChatCallBack,
  setClimbNameForChatCallBack,
  setDropDownItemsState,
  setisClimbTicked,
  setDropDownItemsStateCallBack,
  setTickOverlayDisplayTrigger,
  climbObject,
}) => {
  const filterTypes = ['Tick', 'Tick With Note'];
  const downDropRef = useRef<HTMLDivElement | null>(null);

  const setSelectedTickCallBack = (item: string) => {
    setisClimbTicked(true);
    if (item === 'Tick With Note') {
      setClimbGradeForChatCallBack(climbObject.grade);
      setClimbNameForChatCallBack(climbObject.name);
      setTickOverlayDisplayTrigger((prev) => prev + 1);
    }
    //console.log(climbObject)
  };

  return (
    <div className="absolute right-0 top-0">
      {setDropDownItemsState === true ? (
        <DownDrop
          ref={downDropRef}
          downDropWidth="w-32"
          setSelectedFilterCallBack={setSelectedTickCallBack}
          setDropDownToggleCallBack={setDropDownItemsStateCallBack}
          filterTypes={filterTypes}
        />
      ) : null}
    </div>
  );
};
export default TickClimbsComponent;
