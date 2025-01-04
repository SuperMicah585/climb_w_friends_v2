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
  UserFilter,
  TagFilter
} from '../../../types/interfaces';
import GradeDropDowns from './filterModalComponents.tsx/GradeDropDowns';
import {
  dropDownStyles,
  threeLineDropDownIcon,
} from '../../../reusableComponents/styles';
import { retrieveTagsOnMap,retrieveFiltersOnMap,AddTagFilter,AddUserFilter,removeTagFilter,removeUserFilter } from '../mapApiRequests';
import { retrieveUsersOnMap } from '../../dashboardComponents/utilityFunctions';
import { filterItems } from '../../mapComponents/mapObjects';

interface FilterModalProps {
  closeTagModalCallBack: (value: boolean) => void;
  mapId: number;
  auth0Id:string;
}
const FilterModal: React.FC<FilterModalProps> = ({
  closeTagModalCallBack,
  mapId,
  auth0Id
}) => {
  //Pass filters to backend. Have backend grab all climbs on the map that have the dependency Id(tagId,userId). TagToMap and MapToUser Join.
  //Based on these returned climbs, I will then check every climb to see if the string grade is between the values that were passed. Will need to recreate the functions
  //Will then use the remaining climbs to create shapes.

  //Filters will also need to filter endpoint for hover of shapes/clicked shape/all climbs modal since all these calls are based on featureId/mapId and not the climbs on the map.
  //alternatively, I can do a promise.all for shape hovers and individual features based on the ID's within the shape. A combination of this
  //Based on this, filters should be held in the database so that client doesn't have send the data everytime within the get request
  //Three Tables
  // TagFilters: Id/TagID/Auth0Id/MapId/TagToMapID -- TagToMap navigation/cascade
  // UserFilters: Id/userAuth0Id/filteredUserAuth0ID/MapId/UserToMapId --UserToMap navigation/cascade
  // GradeRangeFilter: To/From/Type/MapId/Auth0Id  --Map navigation property/cascade
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

  const modifyFriendArray = async(item: UserFilter) => {

    const response = await AddUserFilter(item.auth0ID || ''  ,auth0Id,mapId)
    if(response){
    setModifiedFiltersOnMap((prev) => ({
      ...prev,
      userFilters: [...prev.userFilters, item],
    }));
  }
  };

  const [tagArrayForSearch, setTagArrayForSearch] = useState<TagFilter[]>([]);
  const [userArrayForSearch, setUserArrayForSearch] = useState<
  UserFilter[]
  >([]);

  const modifyTagArray = async(item: TagFilter) => {
    const response = await AddTagFilter(auth0Id,mapId,item.tagId)
    if(response){
    setModifiedFiltersOnMap((prev) => ({
      ...prev,
      tagFilters: [...prev.tagFilters, item],
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
          item.tagName.includes(searchString) &&
          !modifiedFiltersOnMap.tagFilters.find((tag) => item.tagId === tag.tagId),
      );

      setSearchResults(filteredTags);
    } else if (selectedFilter === 'climber') {


      let filteredClimber = userArrayForSearch.filter(
        (item) =>
          (item.name?.includes(searchString) ||
            item.username?.includes(searchString)) &&
            !modifiedFiltersOnMap.userFilters.find((user) => {
              const itemAuth0ID = item.auth0ID || item.auth0Id; // Check both possible properties
              const userAuth0ID = user.auth0ID || user.auth0Id; // Check both possible properties
              return itemAuth0ID && userAuth0ID && itemAuth0ID === userAuth0ID; // Compare if both are set
            }),
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

  const deleteTagCallBack = async(item: Tags) => {
    const response = await removeTagFilter(item.tagId)

    if(response){
    setModifiedFiltersOnMap((prev) => ({
      ...prev,
      tagFilters: prev.tagFilters.filter((tag) => tag.tagId !== item.tagId),
    }));
  }
  };


  const deleteUserCallBack = async(item: UserFilter) => {

    const response = await removeUserFilter(item.auth0Id || item.auth0ID || '')
    if(response){
    setModifiedFiltersOnMap((prev) => ({
      ...prev,
      userFilters: prev.userFilters.filter((user) => user.auth0Id  !== item.auth0Id),
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
    const fetchFiltersOnMap = async() =>{
 
      const data = await retrieveFiltersOnMap(mapId,auth0Id)

      if(data[0].gradeRangeFilters.length===0){
  
        data[0].gradeRangeFilters[0] = { fromGrade: '', toGrade: '', type: 'None' }
      }
      setModifiedFiltersOnMap(data[0]);
      
    }

    if(mapId && auth0Id){

    fetchFiltersOnMap()
    }
  }, [mapId,auth0Id]);


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
            filtersOnMap={modifiedFiltersOnMap}
            setModifiedFiltersOnMap={setModifiedFiltersOnMap}
            mapId = {mapId}
            auth0Id= {auth0Id}
          />

          <div className="font-semibold text-white"> Filters on Map</div>
          <div className="flex flex-wrap gap-2">
            {modifiedFiltersOnMap.tagFilters.map((item, index) => (
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
            {modifiedFiltersOnMap.userFilters.map((item, index) => (
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
              {searchResults?.length > 0 ? (
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
