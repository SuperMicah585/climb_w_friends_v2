import { useState, useRef } from 'react';
import {
  climbType,
  usStateAbbreviations,
  usStateDictionary,
} from './mapObjects';
import DropDown from '../../reusableComponents/dropDown';
import InputComponent from '../../reusableComponents/input';
import SearchDropDown from '../../reusableComponents/searchDropDown';
import { retrieveClimbs } from './mapApiRequests';
import { ClimbsTableResponse } from '../../types/interfaces';
import { createMarker } from './mapLayers';

import {
  climbTypeDropDownStyle,
  stateDropDownStyle,
  dropDownStyles,
  switchIcon,
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
  setSearchToggle: React.Dispatch<React.SetStateAction<boolean>>;
  searchToggle: boolean;
  map: any;
};
const Search: React.FC<SearchProps> = ({
  closeAddClimbsModalCallBack,
  climbTypeDropDownValueCallBack,
  stateDropDownNameCallBack,
  climbTypeDropDownValue,
  stateDropDownName,
  setSearchToggle,
  searchToggle,
  map,
}) => {
  const [searchDropDown, setSearchDrownDown] = useState(false);
  const [searchResults, setsearchResults] = useState<ClimbsTableResponse[]>([]);

  const inputRef = useRef(null);

  const setToggleSearchDropDownCallBack = (booleanValue: boolean) => {
    setSearchDrownDown(booleanValue);
  };

  const handleClimbSearch = async (query: string) => {
    if (query.length === 0) {
      return setsearchResults([]);
    }

    const data = await retrieveClimbs(
      query,
      usStateDictionary[stateDropDownName],
      climbTypeDropDownValue,
    );

    if (data) {
      setsearchResults(data);
    } else {
      setsearchResults([]); // or handle as needed if data is null
    }
  };

  const handleClimbSelect = (climb: ClimbsTableResponse) => {
    createMarker(
      climb.coordinates[1],
      climb.coordinates[0],
      climb.climbName,
      climb.location,
      climb.rating,
      map,
    );
  };

  return (
    <>
      <div className="flex w-full items-center">
        <div className="z-20 flex min-w-96 items-center">
          {searchToggle ? (
            <div
              onClick={() => closeAddClimbsModalCallBack(true)}
              className={`w-full flex-grow cursor-pointer rounded-xl border border-neutral-500 bg-zinc-900 bg-opacity-90 p-3 pl-40 text-neutral-400 shadow-lg hover:border-violet-500`}
            >
              Add Climbs To Map
            </div>
          ) : (
            <div className="flex w-full flex-col gap-5">
              <div className="w-96">
                <InputComponent
                  setToggleSearchDropDown={setToggleSearchDropDownCallBack}
                  setPlaceHolder={`Search For Climbs`}
                  handleSearch={handleClimbSearch}
                  paddingLeft={'pl-40'}
                  focusColor={'focus:ring-green-500'}
                  bgColor={'bg-zinc-900'}
                  ref={inputRef}
                />
              </div>

              {searchDropDown ? (
                <div className="w-content absolute top-[62px] z-10">
                  <SearchDropDown
                    width={'w-96'}
                    maxHeight={'max-h-48'}
                    dropDownStatus={searchDropDown}
                    inputRef={inputRef}
                    closeDropDownCallBack={setToggleSearchDropDownCallBack}
                    theme="dark"
                  >
                    {searchResults.length > 0 ? (
                      searchResults.map((item) => (
                        <div
                          onClick={() => {
                            handleClimbSelect(item);
                            setSearchDrownDown(false);
                          }}
                          className={dropDownStyles('zinc')}
                          key={item.climbId}
                        >
                          <div className="flex flex-col gap-2 p-2">
                            <div>
                              <div className="flex gap-2 font-semibold">
                                <div> {item.climbName} </div>
                                <div> {item.rating} </div>
                              </div>
                              <div className="text-xs font-thin italic">
                                {' '}
                                {item.climbType}{' '}
                              </div>
                            </div>

                            <div className="text-xs font-thin">
                              {item.location}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        onClick={() => {
                          setSearchDrownDown(false);
                        }}
                        className="flex w-96 items-center p-2 text-sm text-gray-700"
                      >
                        {' '}
                        No Results{' '}
                      </div>
                    )}
                  </SearchDropDown>
                </div>
              ) : null}
            </div>
          )}

          <div className="absolute flex items-center gap-2 pl-1">
            <DropDown
              dropDownWidth={'w-[84px]'}
              dropDownButtonStyle={climbTypeDropDownStyle}
              dropDownItems={climbType}
              selectedDropDownItemCallBack={climbTypeDropDownValueCallBack}
              initDropDownItem={climbTypeDropDownValue}
              theme="dark"
            />
            <DropDown
              dropDownWidth={'w-14'}
              dropDownButtonStyle={stateDropDownStyle}
              dropDownItems={usStateAbbreviations}
              selectedDropDownItemCallBack={stateDropDownNameCallBack}
              initDropDownItem={stateDropDownName}
              theme="dark"
            />
          </div>
        </div>
        <div
          onClick={() => setSearchToggle((prev) => !prev)}
          className={`${searchToggle ? 'bg-violet-500' : 'bg-green-500'} ml-1 cursor-pointer rounded-lg p-2 hover:opacity-75`}
        >
          {' '}
          {switchIcon}{' '}
        </div>
        <div className="ml-5 h-10 border-r border-white"> </div>
      </div>
    </>
  );
};
export default Search;
