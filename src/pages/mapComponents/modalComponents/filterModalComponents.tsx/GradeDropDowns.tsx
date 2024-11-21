import DropDown from '../../../../reusableComponents/dropDown';
import {
  climbTypeForFilter,
  ropeClimbingGrades,
  boulderingClimbingGrades,
} from '../../mapObjects';
import { useState } from 'react';
const GradeDropDowns = () => {
  const [currentClimbType, setCurrentClimbType] = useState<string>('None');

  const climbTypeCallBack = (item: string) => {
    setCurrentClimbType(item);
  };

  const fromGradeCallBack = (item: string) => {
    console.log(item);
  };

  const toGradeCallBack = (item: string) => {
    console.log(item);
  };

  const climbButtonStyle =
    'bg-zinc-800 border-slate-500 border text-white flex font-semibold text-sm w-[84px] justify-between gap-1 items-center hover:opacity-75 cursor-pointer rounded-lg p-2';

  return (
    <div className="flex items-end gap-5">
      <div className="flex flex-col items-center text-sm">
        <DropDown
          selectedDropDownItemCallBack={climbTypeCallBack}
          dropDownButtonStyle={climbButtonStyle}
          dropDownItems={climbTypeForFilter}
          initDropDownItem={'None'}
          dropDownWidth={'w-[84px] '}
        />
      </div>
      {currentClimbType !== 'None' && (
        <div className="flex items-center gap-2 text-sm">
          From
          <DropDown
            selectedDropDownItemCallBack={fromGradeCallBack}
            dropDownButtonStyle={climbButtonStyle}
            dropDownItems={
              currentClimbType === 'Boulder'
                ? boulderingClimbingGrades
                : ropeClimbingGrades
            }
            initDropDownItem={currentClimbType === 'Boulder' ? 'V1' : '5.9'}
            dropDownWidth={'w-[84px] '}
          />
        </div>
      )}
      {currentClimbType !== 'None' && (
        <div className="flex items-center gap-2 text-sm">
          To
          <DropDown
            selectedDropDownItemCallBack={toGradeCallBack}
            dropDownButtonStyle={climbButtonStyle}
            dropDownItems={
              currentClimbType === 'Boulder'
                ? boulderingClimbingGrades
                : ropeClimbingGrades
            }
            initDropDownItem={currentClimbType === 'Boulder' ? 'V1' : '5.9'}
            dropDownWidth={'w-[84px] '}
          />
        </div>
      )}
    </div>
  );
};
export default GradeDropDowns;
