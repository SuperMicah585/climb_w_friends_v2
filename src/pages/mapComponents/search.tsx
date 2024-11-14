import { useState, useRef } from 'react';
import {
  climbType,
  usStateAbbreviations,
  usStateDictionary,
} from './mapObjects';
import { supabase } from '../../supaBaseClient';
import { ClimbsTableResponse } from '../../types/interfaces';
import InputComponent from '../../reusableComponents/input';
import SearchDropDown from '../../reusableComponents/searchDropDown';
import DropDown from '../../reusableComponents/dropDown';

import {
  dropDownStyles,
  climbTypeDropDownStyle,
  stateDropDownStyle,
} from '../../reusableComponents/styles';

type SearchProps = {
  selectedClimbCallBack: (climb: ClimbsTableResponse) => void;
};
const Search: React.FC<SearchProps> = ({ selectedClimbCallBack }) => {
  const [toggleSearchDropDown, setToggleSearchDropDown] =
    useState<boolean>(false);
  const [climbTypeDropDownValue, setclimbTypeDropDown] = useState('Boulder');
  const [searchResults, setsearchResults] = useState<ClimbsTableResponse[]>([]);
  const [stateDropDownName, setStateDropDownName] = useState('WA');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setToggleSearchDropDownCallBack = (booleanValue: boolean) => {
    setToggleSearchDropDown(booleanValue);
  };

  const handleClimbSearch = async (query: string) => {
    if (query.length === 0) {
      return setsearchResults([]);
    }

    const { data, error }: { data: ClimbsTableResponse[] | null; error: any } =
      await supabase
        .from('climbs_test')
        .select('*')
        .ilike('Route', `%${query}%`)

        .ilike('Location', `%${usStateDictionary[stateDropDownName]}%`)
        .ilike('Route Type', `%${climbTypeDropDownValue}%`)
        .limit(10);
    if (error) {
      console.error('Error fetching climbs:', error);
      return;
    }

    if (data) {
      setsearchResults(data);
    } else {
      setsearchResults([]); // or handle as needed if data is null
    }
  };

  const handleClimbSelect = (item: ClimbsTableResponse) => {
    selectedClimbCallBack(item);
  };

  const climbTypeCallBack = (item: string) => {
    setclimbTypeDropDown(item);
  };

  const stateNameCallBack = (item: string) => {
    setStateDropDownName(item);
  };

  return (
    <>
      <div className="z-20 flex w-96 items-center gap-10">
        <InputComponent
          paddingLeft={'pl-40'}
          ref={inputRef}
          handleSearch={handleClimbSearch}
          setToggleSearchDropDown={setToggleSearchDropDownCallBack}
        />

        {toggleSearchDropDown ? (
          <div className="w-content absolute top-[60px]">
            <SearchDropDown
              width={'w-96'}
              maxHeight={'max-h-48'}
              dropDownStatus={toggleSearchDropDown}
              inputRef={inputRef}
              closeDropDownCallBack={setToggleSearchDropDownCallBack}
            >
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <div
                    onClick={() => {
                      handleClimbSelect(item);
                      setToggleSearchDropDown(false);
                    }}
                    className={dropDownStyles}
                    key={item.ID}
                  >
                    <div className="flex flex-col gap-2 p-2">
                      <div>
                        <div className="flex gap-2 font-semibold">
                          <div> {item.Route} </div>
                          <div> {item.Rating} </div>
                        </div>
                        <div className="text-xs font-thin italic">
                          {' '}
                          {item['Route Type']}{' '}
                        </div>
                      </div>

                      <div className="text-xs font-thin">{item.Location}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  onClick={() => {
                    setToggleSearchDropDown(false);
                  }}
                  className="flex w-96 items-center p-2 text-sm text-white"
                >
                  {' '}
                  No Results{' '}
                </div>
              )}
            </SearchDropDown>
          </div>
        ) : null}

        <div className="absolute flex items-center gap-2 pl-1">
          <DropDown
            dropDownWidth={'w-[84px]'}
            dropDownButtonStyle={climbTypeDropDownStyle}
            dropDownItems={climbType}
            selectedDropDownItemCallBack={climbTypeCallBack}
            initDropDownItem={climbTypeDropDownValue}
          />
          <DropDown
            dropDownWidth={'w-14'}
            dropDownButtonStyle={stateDropDownStyle}
            dropDownItems={usStateAbbreviations}
            selectedDropDownItemCallBack={stateNameCallBack}
            initDropDownItem={stateDropDownName}
          />
        </div>
      </div>
    </>
  );
};
export default Search;
