import ZincModal from '../../../reusableComponents/genericModal';
import DownDrop from '../../../reusableComponents/downDrop';
import Tooltip from '../../../reusableComponents/toolTip';
import Input from '../../../reusableComponents/input';
import { useState, useRef, useEffect } from 'react';
import SearchDropDown from '../../../reusableComponents/searchDropDown';

import {
  Tags,
  filterObject,
  UserFilter,
  TagFilter,
} from '../../../types/interfaces';
import GradeDropDowns from './filterModalComponents.tsx/GradeDropDowns';
import {
  dropDownStyles,
  threeLineDropDownIcon,
} from '../../../reusableComponents/styles';
import {
  retrieveTagsOnMap,
  retrieveFiltersOnMap,
  AddTagFilter,
  AddUserFilter,
  removeTagFilter,
  removeUserFilter,
} from '../mapApiRequests';
import { retrieveUsersOnMap } from '../../dashboardComponents/utilityFunctions';
import { filterItems } from '../../mapComponents/mapObjects';

interface FilterModalProps {
  closeTagModalCallBack: (value: boolean) => void;
  mapId: number;
  auth0Id: string;
}
const FilterModal: React.FC<FilterModalProps> = ({
  closeTagModalCallBack,
  mapId,
  auth0Id,
}) => {
  const [searchString, setSearchString] = useState<string>('');
  const [toggleFilterDropDown, setToggleFilterDropDown] =
    useState<boolean>(false);
  const inputFilterRef = useRef<HTMLInputElement | null>(null);

  const [searchResults, setSearchResults] = useState<
    TagFilter[] | UserFilter[]
  >([]);
  const [modifiedFiltersOnMap, setModifiedFiltersOnMap] =
    useState<filterObject>({
      userFilters: [],
      tagFilters: [],
      gradeRangeFilters: [],
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

  const modifyFriendArray = async (item: UserFilter) => {
    const response = await AddUserFilter(item.auth0Id, auth0Id, mapId);

    if (response) {
      setModifiedFiltersOnMap((prev) => ({
        ...prev,
        userFilters: [...prev.userFilters, response],
      }));
    }
  };

  const [tagArrayForSearch, setTagArrayForSearch] = useState<TagFilter[]>([]);
  const [userArrayForSearch, setUserArrayForSearch] = useState<UserFilter[]>(
    [],
  );

  const modifyTagArray = async (item: TagFilter) => {
    const response = await AddTagFilter(auth0Id, mapId, item.tagId);

    if (response) {
      setModifiedFiltersOnMap((prev) => ({
        ...prev,
        tagFilters: [...prev.tagFilters, { ...item, ['id']: response.id }],
      }));
    }
  };

  const handleClickedTag = (item: TagFilter | UserFilter) => {
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
          item.tagName.toLowerCase().includes(searchString.toLowerCase()) &&
          !modifiedFiltersOnMap.tagFilters.find(
            (tag) => item.tagId === tag.tagId,
          ),
      );

      setSearchResults(filteredTags);
    } else if (selectedFilter === 'climber') {
      let filteredClimber = userArrayForSearch.filter(
        (item) =>
          item.name.toLowerCase().includes(searchString.toLowerCase()) &&
          !modifiedFiltersOnMap.userFilters.find(
            (user) => user.auth0Id === item.auth0Id,
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

  const deleteTagCallBack = async (item: Tags) => {
    const response = await removeTagFilter(item?.id || -1);

    if (response) {
      setModifiedFiltersOnMap((prev) => ({
        ...prev,
        tagFilters: prev.tagFilters.filter((tag) => tag.tagId !== item.tagId),
      }));
    }
  };

  const deleteUserCallBack = async (item: UserFilter) => {
    const response = await removeUserFilter(item.id);

    if (response) {
      setModifiedFiltersOnMap((prev) => ({
        ...prev,
        userFilters: prev.userFilters.filter(
          (user) => user.auth0Id !== item.auth0Id,
        ),
      }));
    }
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
    const fetchFiltersOnMap = async () => {
      const data = await retrieveFiltersOnMap(mapId, auth0Id);

      if (data[0].gradeRangeFilters.length === 0) {
        data[0].gradeRangeFilters[0] = {
          fromGrade: '',
          toGrade: '',
          type: 'None',
        };
      }
      setModifiedFiltersOnMap(data[0]);
    };

    if (mapId && auth0Id) {
      fetchFiltersOnMap();
    }
  }, [mapId, auth0Id]);

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
            <div className="font-semibold text-gray-800"> Add Filters</div>
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
                className="absolute right-2 top-2 flex cursor-pointer items-center justify-center rounded-full p-1 text-gray-800 hover:bg-gray-200"
              >
                {threeLineDropDownIcon}
              </div>

              {filterToggle ? (
                <div className="absolute right-0 top-0">
                  {' '}
                  <DownDrop
                    ref={downDropRef}
                    selectedFilter={selectedFilter}
                    color="gray"
                    theme="light"
                    downDropWidth={'w-40'}
                    setDropDownToggleCallBack={setFilterToggleCallBack}
                    filterTypes={filterItems}
                    setSelectedFilterCallBack={setSelectedFilterCallBack}
                  />{' '}
                </div>
              ) : null}
            </div>
          </div>

          <div className="font-semibold text-gray-800">Filter by Grade/Type</div>
          <GradeDropDowns
            filtersOnMap={modifiedFiltersOnMap}
            setModifiedFiltersOnMap={setModifiedFiltersOnMap}
            mapId={mapId}
            auth0Id={auth0Id}
          />

          <div className="font-semibold text-gray-800"> Filters on Map</div>
          <div className="flex flex-wrap gap-2">
            {modifiedFiltersOnMap.tagFilters.length > 0 || modifiedFiltersOnMap.userFilters.length > 0 ? (
              <>
                {modifiedFiltersOnMap.tagFilters.map((item, index) => (
                  <Tooltip
                    deleteItemCallBack={deleteTagCallBack}
                    key={index}
                    item={item}
                  >
                    {' '}
                    <div
                      className={`flex cursor-pointer rounded-md border-2 border-green-300 bg-green-200 p-1 text-center text-sm text-green-800 hover:opacity-75`}
                    >
                      {item.tagName}
                    </div>
                  </Tooltip>
                ))}
                {modifiedFiltersOnMap.userFilters.map((item, index) => (
                  <Tooltip
                    key={index}
                    deleteItemCallBack={deleteUserCallBack}
                    item={item}
                  >
                    {' '}
                    <div
                      key={index}
                      className={`flex cursor-pointer rounded-md border-2 border-violet-300 bg-violet-200 p-1 text-center text-sm text-violet-800 hover:opacity-75`}
                    >
                      {item.username}
                    </div>
                  </Tooltip>
                ))}
              </>
            ) : (
              <div className="text-gray-500 text-sm italic">
                No filters have been added yet
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 flex h-12 w-full items-end justify-end"></div>
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
              theme="light"
            >
              {searchResults?.length > 0 ? (
                searchResults.map((item, index) => (
                  <div
                    onClick={() => {
                      handleClickedTag(item);
                      setToggleFilterDropDown(false);
                    }}
                    className={dropDownStyles('gray')}
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
    </ZincModal>
  );
};
export default FilterModal;
