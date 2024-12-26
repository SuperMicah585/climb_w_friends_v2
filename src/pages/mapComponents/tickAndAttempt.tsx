import { useState, useEffect, useRef } from 'react';
import DownDrop from '../../reusableComponents/downDrop';
import { GeoJsonFeature, ClimbsTableResponse,AttemptObject,ClimbWithDependencies,TickObject } from '../../types/interfaces';
import { removeAttempt,removeTick } from './mapApiRequests';

interface TickClimbsComponent {
  setTickClimbColor: React.Dispatch<React.SetStateAction<string>>;
  setDropDownItemsState: boolean;
  setDropDownItemsStateCallBack: (value: boolean) => void;
  climbObject: ClimbsTableResponse;
  setTickOverlayDisplayTrigger: React.Dispatch<React.SetStateAction<number>>;
  setAttemptOverlayDisplayTrigger:React.Dispatch<React.SetStateAction<number>>;
  setClimbNameForChatCallBack: (climbName: string) => void;
  setClimbGradeForChatCallBack: (climbGrade: string) => void;
  attemptObject:AttemptObject;
  tickObject:TickObject;
  setClimbObject:React.Dispatch<React.SetStateAction<ClimbWithDependencies[]>>;
  type:string

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
  attemptObject,
  tickObject,
  setClimbObject,
  type
  
}) => {

  const [filterLogtype,setFilterTypes] = useState<string[]>(['Log Attempt','Remove Attempt','Log Tick','Remove Tick'])
  const downDropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (attemptObject !== null && tickObject !== null) {
      setFilterTypes(['Log Attempt', 'Remove Attempt', 'Log Tick', 'Remove Tick']);
    } else if (attemptObject !== null && tickObject === null) {
      setFilterTypes(['Log Attempt', 'Remove Attempt', 'Log Tick']);
    } else if (attemptObject === null && tickObject !== null) {
      setFilterTypes(['Log Attempt', 'Log Tick', 'Remove Tick']);
    } else {
      setFilterTypes(['Log Attempt', 'Log Tick']);
    }
  }, [attemptObject, tickObject, setDropDownItemsState]);
  

 


  const setSelectedTickCallBack = async(item: string) => {
    
    if (item === 'Log Tick') {
      setClimbGradeForChatCallBack(climbObject.rating);
      setClimbNameForChatCallBack(climbObject.climbName);
      setTickOverlayDisplayTrigger((prev) => prev + 1);


    }

    if (item === 'Log Attempt') {
      setClimbGradeForChatCallBack(climbObject.rating);
      setClimbNameForChatCallBack(climbObject.climbName);
      setAttemptOverlayDisplayTrigger((prev) => prev + 1);

    }

    if (item === 'Remove Attempt') {
      if(type ==='climb'){
      const responseBoolean = await removeAttempt(attemptObject.attemptId)
      if(responseBoolean){
      setClimbObject(prev => 
        prev.map(obj => {
          if (obj.attempts && 'attemptId' in obj.attempts) {
          // Check if the current object's attemptId matches the target attemptId
          if (obj?.attempts?.attemptId === attemptObject?.attemptId) {
            return {
              ...obj, // Copy the current object
              attempts: null, // Set attempts to null
            };
          }}
          return obj; // Return the object unchanged
      })
      );
    }
  }
  else{
    setClimbObject(prev => 
      prev.map(obj => {
        // Check if the current object's attemptId matches the target attemptId
        if (obj.attempts && 'climbId' in obj.attempts) {
        if (obj?.attempts?.climbId === attemptObject?.climbId) {
          return {
            ...obj, // Copy the current object
            attempts: null, // Set attempts to null
          };
        }}
        return obj; // Return the object unchanged
      })
    );
  }
  }

  if (item === 'Remove Tick') {
    if(type==='climb'){
    const responseBoolean = await removeTick(tickObject.tickId)

    if(responseBoolean){
    setClimbObject(prev => 
      prev.map(obj => {
        // Check if the current object's attemptId matches the target attemptId
        if (obj.ticks && 'tickId' in obj.ticks) {
        if (obj?.ticks?.tickId === tickObject?.tickId) {
          return {
            ...obj, // Copy the current object
            ticks: null, // Set attempts to null
          };
        }}
        return obj; // Return the object unchanged
      })
    );
  }
    }
  

  else{

    setClimbObject(prev => 
      prev.map(obj => {
        // Check if the current object's attemptId matches the target attemptId
        if (obj.ticks && 'climbId' in obj.ticks) {
        if (obj?.ticks?.climbId === tickObject?.climbId) {
          return {
            ...obj, // Copy the current object
            ticks: null, // Set attempts to null
          };
        }}
        return obj; // Return the object unchanged
      })
    );

  }
}
  }


  return (
    <div className="absolute right-0 top-0">
      {setDropDownItemsState === true ? (
        <DownDrop
          color="zinc"
          ref={downDropRef}
          downDropWidth="w-36"
          setSelectedFilterCallBack={setSelectedTickCallBack}
          setDropDownToggleCallBack={setDropDownItemsStateCallBack}
          filterTypes={filterLogtype}
        />
      ) : null}
    </div>
  );
};
export default TickClimbsComponent;
