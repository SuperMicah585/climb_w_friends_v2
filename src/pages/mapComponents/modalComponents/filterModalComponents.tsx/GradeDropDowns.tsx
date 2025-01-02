import DropDown from '../../../../reusableComponents/dropDown';
import {
  climbTypeForFilter,
  ropeClimbingGrades,
  boulderingClimbingGrades,
} from '../../mapObjects';
import { useState, useEffect } from 'react';
import { filterObject } from '../../../../types/interfaces';
interface GradeDropDownsProps {
  setModifiedFiltersOnMap: React.Dispatch<React.SetStateAction<filterObject>>;
  filtersOnMap: filterObject;
  modifiedFiltersOnMap: filterObject;
}
const GradeDropDowns: React.FC<GradeDropDownsProps> = ({
  setModifiedFiltersOnMap,
  filtersOnMap,
  modifiedFiltersOnMap,
}) => {
  const [currentClimbType, setCurrentClimbType] = useState<string>('None');

  const climbTypeCallBack = (item: string) => {
    setCurrentClimbType(item);
    setModifiedFiltersOnMap((prev) => ({
      ...prev,
      gradeRange: {
        ...prev.gradeRange, // Preserve other properties in gradeRange
        type: item, // Update the specific key with the new value
      },
    }));

    if (item === 'Boulder') {
      fromGradeCallBack('V1');
      toGradeCallBack('V1');
    }
    if (item === 'Rock') {
      fromGradeCallBack('5.9');
      toGradeCallBack('5.9');
    }
    if (item === 'None') {
      fromGradeCallBack('');
      toGradeCallBack('');
    }
  };

  const fromGradeCallBack = (value: string) => {
    setModifiedFiltersOnMap((prev) => ({
      ...prev,
      gradeRange: {
        ...prev.gradeRange, // Preserve other properties in gradeRange
        gradeStart: value, // Update the specific key with the new value
      },
    }));
  };

  const toGradeCallBack = (value: string) => {
    setModifiedFiltersOnMap((prev) => ({
      ...prev,
      gradeRange: {
        ...prev.gradeRange, // Preserve other properties in gradeRange
        gradeEnd: value, // Update the specific key with the new value
      },
    }));
  };

  useEffect(() => {
    console.log(filtersOnMap, 'Sdfsdf');
    fromGradeCallBack(filtersOnMap.gradeRange.gradeStart);
    toGradeCallBack(filtersOnMap.gradeRange.gradeEnd);
    setCurrentClimbType(filtersOnMap.gradeRange.type);
  }, [filtersOnMap]);

  const climbButtonStyle =
    'bg-customGray border-slate-500 border text-white flex font-semibold text-sm w-[84px] justify-between gap-1 items-center hover:opacity-75 cursor-pointer rounded-lg p-2';

  return (
    <div className="flex items-end gap-5">
      <div className="flex flex-col items-center text-sm">
        <DropDown
          selectedDropDownItemCallBack={climbTypeCallBack}
          dropDownButtonStyle={climbButtonStyle}
          dropDownItems={climbTypeForFilter}
          initDropDownItem={modifiedFiltersOnMap.gradeRange.type}
          dropDownWidth={'w-[84px] '}
          dropDownHeight={'max-h-32'}
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
            initDropDownItem={modifiedFiltersOnMap.gradeRange.gradeStart}
            dropDownWidth={'w-[84px] '}
            dropDownHeight={'max-h-32'}
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
            initDropDownItem={modifiedFiltersOnMap.gradeRange.gradeEnd}
            dropDownWidth={'w-[84px] '}
            dropDownHeight={'max-h-32'}
          />
        </div>
      )}
    </div>
  );
};
export default GradeDropDowns;
