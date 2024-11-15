import ZincModal from '../../../reusableComponents/zincModal';
import DownDrop from '../../../reusableComponents/downDrop';
import Tooltip from '../../../reusableComponents/toolTip';
import Input from '../../../reusableComponents/input';
import PurpleButton from '../../../reusableComponents/purpleButton';
import { useState, useRef, useEffect } from 'react';
import SearchDropDown from '../../../reusableComponents/searchDropDown';
import { Tags, friendsObject } from '../../../types/interfaces';
import GradeDropDowns from './filterModalComponents.tsx/GradeDropDowns';
import {
  dropDownStyles,
  threeLineDropDownIcon,
} from '../../../reusableComponents/styles';

import {
  filterItems,
  friendsOnMapExample,
} from '../../mapComponents/mapObjects';

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
  const [searchResults, setSearchResults] = useState<Tags[] | friendsObject[]>(
    [],
  );
  const [tagFiltersOnMap, setFiltersOnMap] = useState<(Tags | friendsObject)[]>(
    [],
  );
  const [filterToggle, setFilterToggle] = useState<boolean>(false);
  const [selectedFilter, setSelecetedFilter] = useState<string>('climber');
  const filterIconRef = useRef<HTMLDivElement | null>(null);
  const downDropRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = (results: string) => {
    setSearchString(results);
  };

  const setToggleFilterDropDownCallBack = (booleanValue: boolean) => {
    setToggleFilterDropDown(booleanValue);
  };

  const handleClickedTag = (item: Tags | friendsObject) => {
    const inputItemType = 'tag' in item ? 'tag' : 'friend';

    const exists = tagFiltersOnMap.some((existingItem) => {
      const existingItemType = 'tag' in existingItem ? 'tag' : 'friend';

      if (inputItemType === 'tag' && existingItemType === 'tag') {
        return (
          existingItem.id === item.id &&
          (existingItem as Tags).tag === (item as Tags).tag
        );
      } else if (inputItemType === 'friend' && existingItemType === 'friend') {
        return (
          existingItem.id === item.id &&
          (existingItem as friendsObject).userName ===
            (item as friendsObject).userName
        );
      } else {
        return false;
      }
    });

    if (!exists) {
      setFiltersOnMap((prev) => [...prev, item]);
    } else {
      console.error('Filter Already Added');
    }
  };

  useEffect(() => {
    //if selectedFilter === 'climber'
    //if  selectedFilter === 'tags'
    if (selectedFilter === 'tag') {
      let filteredTags = tagsOnMount.filter((item) =>
        item.tag.includes(searchString),
      );
      setSearchResults(filteredTags);
    } else if (selectedFilter === 'climber') {
      let filteredClimber = friendsOnMapExample.filter(
        (item) =>
          item.firstName.includes(searchString) ||
          item.lastName.includes(searchString) ||
          item.userName.includes(searchString),
      );
      setSearchResults(filteredClimber);
    }
  }, [searchString, tagsOnMount, friendsOnMapExample, selectedFilter]);

  useEffect(() => {
    setTagsOnMount(tagsOnMap);
  }, [tagsOnMount]);

  const deleteTagCallBack = (item: Tags | friendsObject) => {
    const inputItemType = 'tag' in item ? 'tag' : 'friend';

    setFiltersOnMap((prev) =>
      prev.filter((prevItem) => {
        const prevItemType = 'tag' in prevItem ? 'tag' : 'friend';

        if (inputItemType === 'tag' && prevItemType === 'tag') {
          return !(
            prevItem.id === item.id &&
            (prevItem as Tags).tag === (item as Tags).tag
          );
        } else if (inputItemType === 'friend' && prevItemType === 'friend') {
          return !(
            prevItem.id === item.id &&
            (prevItem as friendsObject).userName ===
              (item as friendsObject).userName
          );
        } else {
          return true;
        }
      }),
    );
  };

  const setSelectedFilterCallBack = (item: string) => {
    setSelecetedFilter(item);
  };

  const setFilterToggleCallBack = (booleanValue: boolean) => {
    setFilterToggle(booleanValue);
  };

  useEffect(() => {
    const handleClick = (event: any) => {
      if (
        filterIconRef.current &&
        !filterIconRef.current.contains(event.target) &&
        downDropRef.current &&
        !downDropRef.current.contains(event.target)
      ) {
        setFilterToggle(false);
      }
    };
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  //need to filter my climber(s)
  return (
    <ZincModal
      maxHeight={'max-h-[500px]'}
      maxWidth={'max-w-[500px]'}
      closeModalCallBack={closeTagModalCallBack}
    >
      <div className="relative flex h-full w-full flex-col pb-12">
        <div className="mt-10 flex flex-grow flex-col gap-5 overflow-y-scroll">
          <div className="flex w-80 flex-col gap-2">
            <div className="font-semibold text-white"> Add Filters</div>
            <div className="relative">
              <Input
                ref={inputFilterRef}
                setToggleSearchDropDown={setToggleFilterDropDownCallBack}
                setPlaceHolder={`Add ${selectedFilter} to Filter`}
                handleSearch={handleSearch}
                paddingLeft={'pl-2'}
              />

              <div
                ref={filterIconRef}
                onClick={() => setFilterToggle((prev) => !prev)}
                className="absolute right-2 top-2 flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-slate-500"
              >
                {threeLineDropDownIcon}
              </div>

              {filterToggle ? (
                <div className="absolute right-0 top-0">
                  {' '}
                  <DownDrop
                    ref={downDropRef}
                    selectedFilter={selectedFilter}
                    downDropWidth={'w-40'}
                    setDropDownToggleCallBack={setFilterToggleCallBack}
                    filterTypes={filterItems}
                    setSelectedFilterCallBack={setSelectedFilterCallBack}
                  />{' '}
                </div>
              ) : null}
            </div>
          </div>

          <div className="font-semibold text-white">Filter by Grade/Type</div>
          <GradeDropDowns />

          <div className="font-semibold text-white"> Filters on Map</div>
          <div className="flex flex-wrap gap-2">
            {tagFiltersOnMap.map((item, index) => (
              <Tooltip deleteItemCallBack={deleteTagCallBack} item={item}>
                {' '}
                <div
                  key={index}
                  className="flex cursor-pointer rounded-md border-2 border-neutral-600 bg-neutral-500 p-1 text-center text-sm hover:opacity-75"
                >
                  {'firstName' in item
                    ? item.firstName + ' ' + item.lastName
                    : item.tag}
                </div>{' '}
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 flex h-12 w-full items-end justify-end">
          <div className=" ">
            <PurpleButton> Apply</PurpleButton>{' '}
          </div>
        </div>
      </div>

      <div className="absolute">
        {toggleFilterDropDown ? (
          <div className="w-content absolute top-[125px] z-10">
            <SearchDropDown
              width={'w-80'}
              maxHeight={'max-h-48'}
              dropDownStatus={toggleFilterDropDown}
              inputRef={inputFilterRef}
              closeDropDownCallBack={setToggleFilterDropDownCallBack}
            >
              {searchResults.length > 0 ? (
                searchResults.map((item, index) => (
                  <div
                    onClick={() => {
                      handleClickedTag(item);
                      setToggleFilterDropDown(false);
                    }}
                    className={dropDownStyles}
                    key={index}
                  >
                    <div className="flex flex-col gap-2 p-2">
                      <div>
                        {' '}
                        {'firstName' in item
                          ? item.firstName + ' ' + item.lastName
                          : item.tag}{' '}
                      </div>
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
