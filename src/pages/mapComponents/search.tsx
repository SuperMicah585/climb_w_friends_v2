import { useState } from 'react';
import { climbType, usStateAbbreviations } from './mapObjects';
import DropDown from '../../reusableComponents/dropDown';

import {
  climbTypeDropDownStyle,
  stateDropDownStyle,
} from '../../reusableComponents/styles';
/*
Need to add callBack for both climb and state


*/
type SearchProps = {
  closeAddClimbsModalCallBack: (trigger: boolean) => void;
  climbTypeDropDownValueCallBack: (value: string) => void;
  stateDropDownNameCallBack: (value: string) => void;
  climbTypeDropDownValue: string;
  stateDropDownName: string;
};
const Search: React.FC<SearchProps> = ({
  closeAddClimbsModalCallBack,
  climbTypeDropDownValueCallBack,
  stateDropDownNameCallBack,
  climbTypeDropDownValue,
  stateDropDownName,
}) => {
  return (
    <>
      <div className="z-20 flex w-96 items-center gap-10">
        <div
          onClick={() => closeAddClimbsModalCallBack(true)}
          className={`w-full flex-grow cursor-pointer rounded-xl border border-slate-500 bg-zinc-900 bg-opacity-90 p-3 pl-40 text-white shadow-lg hover:border-violet-500`}
        >
          Search For Climbs
        </div>
        <div className="absolute flex items-center gap-2 pl-1">
          <DropDown
            dropDownWidth={'w-[84px]'}
            dropDownButtonStyle={climbTypeDropDownStyle}
            dropDownItems={climbType}
            selectedDropDownItemCallBack={climbTypeDropDownValueCallBack}
            initDropDownItem={climbTypeDropDownValue}
          />
          <DropDown
            dropDownWidth={'w-14'}
            dropDownButtonStyle={stateDropDownStyle}
            dropDownItems={usStateAbbreviations}
            selectedDropDownItemCallBack={stateDropDownNameCallBack}
            initDropDownItem={stateDropDownName}
          />
        </div>
      </div>
    </>
  );
};
export default Search;
