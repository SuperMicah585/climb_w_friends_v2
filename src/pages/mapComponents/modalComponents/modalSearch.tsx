import { filterIcon } from '../../../reusableComponents/styles';
import { useState, useRef, useEffect } from 'react';
import Input from '../../../reusableComponents/input';
import { filterTypes } from '../mapObjects';
import DownDrop from '../../../reusableComponents/downDrop';

interface ModalSearchProps {
  searchFilterCallBack: (data: string) => void;
  sortStringCallBack: (data: string) => void;
}

const ModalSearch: React.FC<ModalSearchProps> = ({
  searchFilterCallBack,
  sortStringCallBack,
}) => {
  const [searchResults, setSearchResults] = useState('');
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Order Grade ASC');
  const filterIconDownRef = useRef<HTMLDivElement | null>(null);
  const filterDropDownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    searchFilterCallBack(searchResults);
  }, [searchResults]);

  useEffect(() => {
    sortStringCallBack(selectedFilter);
  }, [selectedFilter]);

  const handleDocumentClick = (event: any) => {
    if (
      filterDropDownRef.current &&
      filterIconDownRef.current &&
      !filterIconDownRef.current.contains(event.target) &&
      !filterDropDownRef.current.contains(event.target)
    ) {
      setDropDownToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleDocumentClick);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mouseup', handleDocumentClick);
    };
  }, []);

  const handleClimbSearch = async (query: string) => {
    setSearchResults(query);
  };

  const setSelectedFilterCallBack = (item: string) => {
    setSelectedFilter(item);
  };

  const setDropDownToggleCallBack = (booleanValue: boolean) => {
    setDropDownToggle(booleanValue);
  };

  return (
    <div className="flex w-full items-center gap-10 border-b border-neutral-500 pb-5">
      <div className="relative flex max-w-96 flex-grow items-center">
        <Input
          paddingLeft={'pl-5'}
          ref={inputRef}
          handleSearch={handleClimbSearch}
          setPlaceHolder={'Search by Climb, or Tag'}
        />
        <div
          ref={filterIconDownRef}
          onClick={() => setDropDownToggle((prev) => !prev)}
          className="absolute right-3 cursor-pointer rounded-full p-1 text-white opacity-75 hover:bg-slate-500 hover:opacity-100"
        >
          {' '}
          {filterIcon}
        </div>
        {dropDownToggle ? (
          <DownDrop
            selectedFilter={selectedFilter}
            setDropDownToggleCallBack={setDropDownToggleCallBack}
            setSelectedFilterCallBack={setSelectedFilterCallBack}
            filterTypes={filterTypes}
            downDropWidth={'w-40'}
            ref={filterDropDownRef}
          />
        ) : null}
      </div>
    </div>
  );
};
export default ModalSearch;
