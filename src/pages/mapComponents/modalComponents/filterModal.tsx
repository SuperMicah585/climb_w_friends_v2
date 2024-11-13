import ZincModal from '../../../reusableComponents/zincModal';
import Tooltip from '../../../reusableComponents/toolTip';
import Input from '../../../reusableComponents/input';
import { useState, useRef, useEffect } from 'react';
import SearchDropDown from '../../../reusableComponents/searchDropDown';
import { Tags } from '../../../types/interfaces';
import { dropDownStyles } from '../../../reusableComponents/styles';
interface FilterModalProps {
  closeTagModalCallBack: (value: boolean) => void;
  tagsOnMap: Tags[];
}
const FilterModal: React.FC<FilterModalProps> = ({
  closeTagModalCallBack,
  tagsOnMap,
}) => {
  const [searchString, setSearchString] = useState<string>('');
  const [toggleFilterDropDown, setToggleFilterDropDown] =
    useState<boolean>(false);
  const inputFilterRef = useRef<HTMLInputElement | null>(null);
  const [tagsOnMount, setTagsOnMount] = useState<Tags[]>([]);
  const [searchResults, setSearchResults] = useState<Tags[]>([]);
  const [tagFiltersOnMap, setTagFiltersOnMap] = useState<Tags[]>([]);

  const handleSearch = (results: string) => {
    setSearchString(results);
  };

  const setToggleFilterDropDownCallBack = (booleanValue: boolean) => {
    setToggleFilterDropDown(booleanValue);
  };

  const handleClickedTag = (item: Tags) => {
    //need to filter out duplicates
    setTagFiltersOnMap((prev) => [...prev, item]);
  };

  useEffect(() => {
    let filteredTags = tagsOnMount.filter((number) =>
      number.tag.includes(searchString),
    );

    setSearchResults(filteredTags);
  }, [searchString]);

  useEffect(() => {
    setTagsOnMount(tagsOnMap);
  }, [tagsOnMount]);

  const deleteTagCallBack = (item: Tags) => {
    console.log(item);
  };

  return (
    <ZincModal
      maxHeight={'max-h-[500px]'}
      maxWidth={'max-w-[500px]'}
      closeModalCallBack={closeTagModalCallBack}
    >
      <div className="mt-10 flex h-10 w-40 w-full h-full flex-col gap-5">
        <div className ='flex justify-between'> 
        <div className="flex w-52 flex-col gap-2">
          <div>Filter Map by Tag</div>
          <Input
            ref={inputFilterRef}
            setToggleSearchDropDown={setToggleFilterDropDownCallBack}
            setPlaceHolder={'search tags'}
            handleSearch={handleSearch}
            paddingLeft={'pl-2'}
          />
        </div>
        <div className="flex w-52 flex-col gap-2 ">
          <div>Filter By Grade</div>

        </div>
        </div>
        Filters on Map
        <div className="flex flex-wrap gap-2">
          {tagFiltersOnMap.map((item) => (
            <Tooltip deleteItemCallBack={deleteTagCallBack} tag={item}>
  
              <div className="flex cursor-pointer rounded-md border-2 border-neutral-600 bg-neutral-500 p-1 text-center text-sm hover:opacity-75">
                {item.tag}
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      <div>
        {toggleFilterDropDown ? (
          <div className="w-content absolute top-[145px]">
            <SearchDropDown
              width={'w-52'}
              maxHeight={'max-h-48'}
              dropDownStatus={toggleFilterDropDown}
              inputRef={inputFilterRef}
              closeDropDownCallBack={setToggleFilterDropDownCallBack}
            >
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <div
                    onClick={() => {
                      handleClickedTag(item);
                      setToggleFilterDropDown(false);
                    }}
                    className={dropDownStyles}
                    key={item.id}
                  >
                    <div className="flex flex-col gap-2 p-2">
                      <div> {item.tag} </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  onClick={() => {
                    setToggleFilterDropDown(false);
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
      </div>
    </ZincModal>
  );
};
export default FilterModal;
