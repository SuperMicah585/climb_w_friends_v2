import DropDown from '../../../../reusableComponents/dropDown';
import {
  climbTypeForFilter,
  ropeClimbingGrades,
  boulderingClimbingGrades,
} from '../../mapObjects';
import { filterObject } from '../../../../types/interfaces';
import {
  AddGradeRangeFilter,
  removeGradeRangeFilter,
} from '../../mapApiRequests';
interface GradeDropDownsProps {
  setModifiedFiltersOnMap: React.Dispatch<React.SetStateAction<filterObject>>;
  filtersOnMap: filterObject;
  auth0Id: string;
  mapId: number;
}
const GradeDropDowns: React.FC<GradeDropDownsProps> = ({
  setModifiedFiltersOnMap,
  filtersOnMap,
  auth0Id,
  mapId,
}) => {
  const climbTypeCallBack = async (item: string) => {
    setModifiedFiltersOnMap((prev) => ({
      ...prev,
      gradeRangeFilters: {
        ...prev.gradeRangeFilters, // Preserve other properties in gradeRange
        type: item, // Update the specific key with the new value
      },
    }));

    if (item === 'Boulder') {
      const response = await AddGradeRangeFilter(
        auth0Id,
        mapId,
        'V1',
        'V1',
        'Boulder',
      );
      //AddGradeRangeFilter(auth0Id,mapId,'V1','V1','Boulder')

      if (response) {
        setModifiedFiltersOnMap((prev) => ({
          ...prev,
          gradeRangeFilters: [response],
        }));
      }
    } else if (item === 'Rock') {
      const response = await AddGradeRangeFilter(
        auth0Id,
        mapId,
        '5.9',
        '5.9',
        'Rock',
      );
      //AddGradeRangeFilter(auth0Id,mapId,'5.9','5.9','Rock')

      if (response) {
        setModifiedFiltersOnMap((prev) => ({
          ...prev,
          gradeRangeFilters: [response],
        }));
      }
    } else if (item === 'None') {
      removeGradeRangeFilter(auth0Id, mapId);
      setModifiedFiltersOnMap((prev) => ({
        ...prev,
        gradeRangeFilters: [{ fromGrade: '', toGrade: '', type: 'None' }],
      }));
    }
  };

  const fromGradeCallBack = (value: string) => {
    AddGradeRangeFilter(auth0Id, mapId, value, '', '');

    setModifiedFiltersOnMap((prev) => ({
      ...prev,
      gradeRangeFilters: {
        ...prev.gradeRangeFilters, // Preserve other properties in gradeRange
        fromGrade: value, // Update the specific key with the new value
      },
    }));
  };

  const toGradeCallBack = (value: string) => {
    AddGradeRangeFilter(auth0Id, mapId, '', value, '');
    setModifiedFiltersOnMap((prev) => ({
      ...prev,
      gradeRangeFilters: {
        ...prev.gradeRangeFilters, // Preserve other properties in gradeRange
        toGrade: value, // Update the specific key with the new value
      },
    }));
  };

  const climbButtonStyle =
    'bg-customGray border-slate-500 border text-white flex font-semibold text-sm w-[84px] justify-between gap-1 items-center hover:opacity-75 cursor-pointer rounded-lg p-2';

  return (
    <div className="flex items-end gap-5">
      <div className="flex flex-col items-center text-sm">
        <DropDown
          selectedDropDownItemCallBack={climbTypeCallBack}
          dropDownButtonStyle={climbButtonStyle}
          dropDownItems={climbTypeForFilter}
          initDropDownItem={filtersOnMap.gradeRangeFilters[0]?.type}
          dropDownWidth={'w-[84px] '}
          dropDownHeight={'max-h-32'}
        />
      </div>
      {filtersOnMap.gradeRangeFilters[0]?.type !== 'None' && (
        <div className="flex items-center gap-2 text-sm">
          From
          <DropDown
            selectedDropDownItemCallBack={fromGradeCallBack}
            dropDownButtonStyle={climbButtonStyle}
            dropDownItems={
              filtersOnMap.gradeRangeFilters[0]?.type === 'Boulder'
                ? boulderingClimbingGrades
                : ropeClimbingGrades
            }
            initDropDownItem={filtersOnMap.gradeRangeFilters[0]?.fromGrade}
            dropDownWidth={'w-[84px] '}
            dropDownHeight={'max-h-32'}
          />
        </div>
      )}
      {filtersOnMap.gradeRangeFilters[0]?.type !== 'None' && (
        <div className="flex items-center gap-2 text-sm">
          To
          <DropDown
            selectedDropDownItemCallBack={toGradeCallBack}
            dropDownButtonStyle={climbButtonStyle}
            dropDownItems={
              filtersOnMap.gradeRangeFilters[0]?.type === 'Boulder'
                ? boulderingClimbingGrades
                : ropeClimbingGrades
            }
            initDropDownItem={filtersOnMap.gradeRangeFilters[0]?.toGrade}
            dropDownWidth={'w-[84px] '}
            dropDownHeight={'max-h-32'}
          />
        </div>
      )}
    </div>
  );
};
export default GradeDropDowns;
