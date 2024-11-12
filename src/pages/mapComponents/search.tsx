import { useState, useEffect, useRef } from 'react';
import { climbType, usStates } from './mapObjects';
import { supabase } from '../../supaBaseClient';
import { ClimbsTableResponse } from '../../types/interfaces';
import InputComponent from '../../reusableComponents/input';
import SearchDropDown from '../../reusableComponents/searchDropDown';

import {
  dropDownStyles,
  dropDownSvgOpen,
  dropDownSvgClosed,
  climbTypeDropDownStyle,
  stateDropDownStyle,
  basicDropDownStyleContainer,
  searchDropDownStyleContainer,
} from '../../reusableComponents/styles';

type SearchProps = {
  selectedClimbCallBack: (climb: ClimbsTableResponse) => void;
};
const Search: React.FC<SearchProps> = ({ selectedClimbCallBack }) => {
  const [toggleClimbTypeDropDown, setToggleClimbTypeDropDown] =
    useState<boolean>(false);
  const [toggleStateDropDown, setToggleStateDropDown] =
    useState<boolean>(false);
  const [toggleSearchDropDown, setToggleSearchDropDown] =
    useState<boolean>(false);
  const [climbTypeDropDownValue, setclimbTypeDropDown] = useState('Boulder');
  const [stateDropDownValue, setStateDropDown] = useState('WA');
  const [searchResults, setsearchResults] = useState<ClimbsTableResponse[]>([]);
  const [stateDropDownName, setStateDropDownName] = useState('Washington');

  const climbTypeRefDropdownRef = useRef<HTMLDivElement | null>(null);
  const climbTypeRefButtonRef = useRef<HTMLDivElement | null>(null);
  const stateRefDropdownRef = useRef<HTMLDivElement | null>(null);
  const stateRefButtonRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClickOutside = (event: any) => {
    if (
      climbTypeRefDropdownRef.current &&
      climbTypeRefButtonRef.current &&
      !climbTypeRefButtonRef.current.contains(event.target) &&
      !climbTypeRefDropdownRef.current.contains(event.target)
    ) {
      setToggleClimbTypeDropDown(false);
    }

    if (
      stateRefDropdownRef.current &&
      !stateRefDropdownRef.current.contains(event.target) &&
      stateRefButtonRef.current &&
      !stateRefButtonRef.current.contains(event.target)
    ) {
      setToggleStateDropDown(false);
    }
  };

  const setToggleSearchDropDownCallBack = (booleanValue: boolean) => {
    setToggleSearchDropDown(booleanValue);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [climbTypeRefDropdownRef, stateRefDropdownRef]);

  const StateDropDown = () => {
    return (
      <div
        ref={stateRefDropdownRef}
        className={basicDropDownStyleContainer('w-14')}
      >
        {usStates.map((item) =>
          item.abbreviation !== stateDropDownValue ? (
            <div
              onClick={() => {
                setStateDropDownName(item.name);
                setStateDropDown(item.abbreviation);
                setToggleStateDropDown(false);
              }}
              className={dropDownStyles}
              key={item.abbreviation}
            >
              {' '}
              {item.abbreviation}{' '}
            </div>
          ) : null,
        )}
      </div>
    );
  };

  const ClimbDropDown = () => {
    return (
      <div
        ref={climbTypeRefDropdownRef}
        className={basicDropDownStyleContainer('w-20')}
      >
        {climbType.map((item) =>
          item !== climbTypeDropDownValue ? (
            <div
              onClick={() => {
                setclimbTypeDropDown(item);
                setToggleClimbTypeDropDown(false);
              }}
              className={dropDownStyles}
              key={item}
            >
              {' '}
              {item}{' '}
            </div>
          ) : null,
        )}
      </div>
    );
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
        .ilike('Location', `%${stateDropDownName}%`)
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
          <div className="flex flex-col items-center justify-center">
            <div
              ref={climbTypeRefButtonRef}
              onClick={() => setToggleClimbTypeDropDown((prev) => !prev)}
              className={climbTypeDropDownStyle}
            >
              {climbTypeDropDownValue}
              {toggleClimbTypeDropDown ? dropDownSvgOpen : dropDownSvgClosed}
            </div>
            {toggleClimbTypeDropDown ? (
              <div className="absolute top-11">
                {' '}
                <ClimbDropDown />{' '}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-center justify-center">
            <div
              ref={stateRefButtonRef}
              onClick={() => setToggleStateDropDown((prev) => !prev)}
              className={stateDropDownStyle}
            >
              {stateDropDownValue}
              {toggleStateDropDown ? dropDownSvgOpen : dropDownSvgClosed}
            </div>
            {toggleStateDropDown ? (
              <div className="absolute top-11">
                {' '}
                <StateDropDown />{' '}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default Search;
