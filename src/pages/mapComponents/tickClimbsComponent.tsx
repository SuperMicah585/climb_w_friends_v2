import { useState, useEffect, useRef } from 'react';
import DownDrop from '../../reusableComponents/downDrop';
import { GeoJsonFeature, ClimbsTableResponse,AttemptObject } from '../../types/interfaces';

interface TickClimbsComponent {
  setTickClimbColor: React.Dispatch<React.SetStateAction<string>>;
  setDropDownItemsState: boolean;
  setDropDownItemsStateCallBack: (value: boolean) => void;
  climbObject: ClimbsTableResponse;
  setTickOverlayDisplayTrigger: React.Dispatch<React.SetStateAction<number>>;
  setAttemptOverlayDisplayTrigger:React.Dispatch<React.SetStateAction<number>>;
  setClimbNameForChatCallBack: (climbName: string) => void;
  setClimbGradeForChatCallBack: (climbGrade: string) => void;

}
const TickClimbsComponent: React.FC<TickClimbsComponent> = ({
  setClimbGradeForChatCallBack,
  setClimbNameForChatCallBack,
  setDropDownItemsState,
  setTickClimbColor,
  setDropDownItemsStateCallBack,
  setTickOverlayDisplayTrigger,
  setAttemptOverlayDisplayTrigger,
  climbObject,
  
}) => {
  const filterTypes = ['Attempt','Attempt With Details','Tick', 'Tick With Details'];
  const downDropRef = useRef<HTMLDivElement | null>(null);



  const setSelectedTickCallBack = (item: string) => {
    
    if (item === 'Tick With Details') {
      setClimbGradeForChatCallBack(climbObject.rating);
      setClimbNameForChatCallBack(climbObject.climbName);
      setTickOverlayDisplayTrigger((prev) => prev + 1);


    }

    if (item === 'Attempt With Details') {
      setClimbGradeForChatCallBack(climbObject.rating);
      setClimbNameForChatCallBack(climbObject.climbName);
      setAttemptOverlayDisplayTrigger((prev) => prev + 1);

    }
    //console.log(climbObject)
  };

  return (
    <div className="absolute right-0 top-0">
      {setDropDownItemsState === true ? (
        <DownDrop
          color="zinc"
          ref={downDropRef}
          downDropWidth="w-36"
          setSelectedFilterCallBack={setSelectedTickCallBack}
          setDropDownToggleCallBack={setDropDownItemsStateCallBack}
          filterTypes={filterTypes}
        />
      ) : null}
    </div>
  );
};
export default TickClimbsComponent;
