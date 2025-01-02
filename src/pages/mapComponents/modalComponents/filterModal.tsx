import ZincModal from '../../../reusableComponents/genericModal';
import DownDrop from '../../../reusableComponents/downDrop';
import Tooltip from '../../../reusableComponents/toolTip';
import Input from '../../../reusableComponents/input';
import PurpleButton from '../../../reusableComponents/genericButton';
import { useState, useRef, useEffect } from 'react';
import SearchDropDown from '../../../reusableComponents/searchDropDown';
import {
  Tags,
  UserObjectForFeature,
  filterObject,
} from '../../../types/interfaces';
import GradeDropDowns from './filterModalComponents.tsx/GradeDropDowns';
import { useFilterContext } from '../../filterProvider';
import {
  dropDownStyles,
  threeLineDropDownIcon,
} from '../../../reusableComponents/styles';
import { retrieveTagsOnMap } from '../mapApiRequests';
import { retrieveUsersOnMap } from '../../dashboardComponents/utilityFunctions';
import { filterItems } from '../../mapComponents/mapObjects';

interface FilterModalProps {
  closeTagModalCallBack: (value: boolean) => void;
  mapId: number;
  setFiltersOnMap: React.Dispatch<React.SetStateAction<filterObject>>;
  filtersOnMap: filterObject;
}
const FilterModal: React.FC<FilterModalProps> = ({
  closeTagModalCallBack,
  mapId,
  setFiltersOnMap,
  filtersOnMap,
}) => {
  //const { setFilterFunctions, filters } = useFilterContext();
  // const [setFilterFunctions,filters] = useState<filterObject>({users:[],tags:[],gradeRange:[]})
  const [searchString, setSearchString] = useState<string>('');
  const [toggleFilterDropDown, setToggleFilterDropDown] =
    useState<boolean>(false);
  const inputFilterRef = useRef<HTMLInputElement | null>(null);

  const [searchResults, setSearchResults] = useState<
    Tags[] | UserObjectForFeature[]
  >([]);
  const [modifiedFiltersOnMap, setModifiedFiltersOnMap] =
    useState<filterObject>({
      users: [],
      tags: [],
      gradeRange: { gradeStart: '', gradeEnd: '', type: 'None' },
    });
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

  const modifyFriendArray = (item: UserObjectForFeature) => {
    setModifiedFiltersOnMap((prev) => ({
      ...prev,
      users: [...prev.users, item],
    }));
  };

  const [tagArrayForSearch, setTagArrayForSearch] = useState<Tags[]>([]);
  const [userArrayForSearch, setUserArrayForSearch] = useState<
    UserObjectForFeature[]
  >([]);

  const modifyTagArray = (item: Tags) => {
    setModifiedFiltersOnMap((prev) => ({
      ...prev,
      tags: [...prev.tags, item],
    }));
  };
  const handleClickedTag = (item: Tags | UserObjectForFeature) => {
    if ('tagName' in item) {
      modifyTagArray(item);
    } else if ('username' in item) {
      modifyFriendArray(item);
    }
    //setModifiedFiltersOnMap((prev) => [...prev.users, item]);
  };

  useEffect(() => {
    if (selectedFilter === 'tag') {
      let filteredTags = tagArrayForSearch.filter(
        (item) =>
          item.tagName.includes(searchString) &&
          !modifiedFiltersOnMap.tags.find((tag) => item.tagId === tag.tagId),
      );

      setSearchResults(filteredTags);
    } else if (selectedFilter === 'climber') {
      let filteredClimber = userArrayForSearch.filter(
        (item) =>
          (item.name?.includes(searchString) ||
            item.username?.includes(searchString)) &&
          !modifiedFiltersOnMap.users.find(
            (user) => item.userId === user.userId,
          ),
      );
      setSearchResults(filteredClimber);
    }
  }, [
    searchString,
    tagArrayForSearch,
    userArrayForSearch,
    modifiedFiltersOnMap,
    selectedFilter,
  ]);

  useEffect(() => {
    const retrieveAndSetTagsOnMap = async (mapId: number) => {
      const tagResponse = await retrieveTagsOnMap(mapId);
      setTagArrayForSearch(tagResponse);
    };

    const retrieveAndSetUsersOnMap = async (mapId: number) => {
      const userResponse = await retrieveUsersOnMap(mapId);

      setUserArrayForSearch(userResponse);
    };
    retrieveAndSetUsersOnMap(mapId);
    retrieveAndSetTagsOnMap(mapId);
  }, [mapId]);

  const deleteTagCallBack = (item: Tags) => {
    setModifiedFiltersOnMap((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag.tagId !== item.tagId),
    }));
  };

  console.log(modifiedFiltersOnMap);
  const deleteUserCallBack = (item: UserObjectForFeature) => {
    setModifiedFiltersOnMap((prev) => ({
      ...prev,
      users: prev.users.filter((user) => user.userId !== item.userId),
    }));
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

  useEffect(() => {
    setModifiedFiltersOnMap(filtersOnMap);
  }, [filtersOnMap]);

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
                    color="zinc"
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
          <GradeDropDowns
            modifiedFiltersOnMap={modifiedFiltersOnMap}
            filtersOnMap={filtersOnMap}
            setModifiedFiltersOnMap={setModifiedFiltersOnMap}
          />

          <div className="font-semibold text-white"> Filters on Map</div>
          <div className="flex flex-wrap gap-2">
            {modifiedFiltersOnMap.tags.map((item, index) => (
              <Tooltip deleteItemCallBack={deleteTagCallBack} item={item}>
                {' '}
                <div
                  key={index}
                  className={`flex cursor-pointer rounded-md border-2 border-green-900 bg-green-600 p-1 text-center text-sm hover:opacity-75`}
                >
                  {item.tagName}
                </div>
              </Tooltip>
            ))}
            {modifiedFiltersOnMap.users.map((item, index) => (
              <Tooltip deleteItemCallBack={deleteUserCallBack} item={item}>
                {' '}
                <div
                  key={index}
                  className={`flex cursor-pointer rounded-md border-2 border-violet-900 bg-violet-600 p-1 text-center text-sm hover:opacity-75`}
                >
                  {item.username}
                </div>
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 flex h-12 w-full items-end justify-end">
          <div
            onClick={() => {
              setFiltersOnMap(modifiedFiltersOnMap);
              closeTagModalCallBack(false);
            }}
            className=" "
          >
            <PurpleButton
              paddingBottom="pb-3"
              paddingTop="pt-3"
              paddingLeft="pl-5"
              paddingRight="pr-5"
              roundedCorners="rounded-full"
            >
              {' '}
              Apply
            </PurpleButton>{' '}
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
                    className={dropDownStyles('zinc')}
                    key={index}
                  >
                    <div className="flex flex-col gap-2 p-2">
                      <div>
                        {' '}
                        {'username' in item ? (
                          <div className="flex flex-col">
                            {' '}
                            <div> {item.name} </div>{' '}
                            <div className="text-xs font-thin">
                              {' '}
                              {item.username}{' '}
                            </div>{' '}
                          </div>
                        ) : 'tagName' in item ? (
                          item.tagName
                        ) : null}
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
