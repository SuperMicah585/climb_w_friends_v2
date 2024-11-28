import { supabase } from '../../supaBaseClient';
import { ClimbsTableResponse } from '../../types/interfaces';
import InputComponent from '../../reusableComponents/input';
import SearchDropDown from '../../reusableComponents/searchDropDown';
import ZincModal from '../../reusableComponents/zincModal';
import { useState, useRef } from 'react';
import { dropDownStyles } from '../../reusableComponents/styles';
import PurpleButton from '../../reusableComponents/purpleButton';

interface AddClimbsModalProps {
  location: string;
  routeType: string;
  closeAddClimbsModalCallBack: (trigger: boolean) => void;
}
//usStateDictionary[stateDropDownName]

const AddClimbModal: React.FC<AddClimbsModalProps> = ({
  closeAddClimbsModalCallBack,
  location,
  routeType,
}) => {
  const [searchResults, setsearchResults] = useState<ClimbsTableResponse[]>([]);
  const [toggleSearchDropDown, setToggleSearchDropDown] =
    useState<boolean>(false);
  const [climbsArray, setClimbsArray] = useState<ClimbsTableResponse[]>([]);
  const inputRef = useRef(null);
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

        .ilike('Location', `%${location}%`)
        .ilike('Route Type', `%${routeType}%`)
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
    setClimbsArray((prev) => [...prev, item]);
  };

  //<div className = 'text-5xl w-full'>{location} | {routeType} </div>
  return (
    <ZincModal
      maxHeight={'max-h-[700px]'}
      maxWidth={'max-w-[700px]'}
      closeModalCallBack={closeAddClimbsModalCallBack}
    >
      <div className="flex w-full flex-col gap-5">
        <div ref={inputRef} className="w-96">
          <InputComponent
            setToggleSearchDropDown={setToggleSearchDropDownCallBack}
            setPlaceHolder={`Search for ${routeType} climbs in ${location}`}
            handleSearch={handleClimbSearch}
            paddingLeft={'pl-2'}
          />
        </div>
        <div className="border-b border-neutral-500"> </div>
      </div>

      {toggleSearchDropDown ? (
        <div className="w-content absolute top-[72px] z-10">
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

      <div className="flex w-full flex-col overflow-y-scroll pb-12">
        {climbsArray.map((item) => (
          <div
            key={item.ID}
            className="relative mt-5 flex flex-col gap-2 rounded-md bg-zinc-800 p-10 text-black shadow-sm shadow-violet-200"
          >
            <div className="flex gap-5 font-semibold text-white">
              <div>{item.Route}</div>
              <div className="white border-r"></div>
              <div>{item.Rating}</div>
            </div>
            <div className="text-sm italic text-white">
              {item['Route Type']}
            </div>
            <div className="text-xs text-white">{item.Location}</div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 right-5 flex h-16 w-full items-center justify-end bg-zinc-900">
        <PurpleButton>Add Climbs</PurpleButton>
      </div>
    </ZincModal>
  );
};
export default AddClimbModal;
