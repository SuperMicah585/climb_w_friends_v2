import {
  filterIcon,
  dropDownStyles,
  basicDropDownStyleContainer,
} from '../../../reusableComponents/styles';
import { useState, useRef, useEffect } from 'react';
import Input from '../../../reusableComponents/input';
import { filterTypes } from '../mapObjects';

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
  const filterDropDownRef = useRef<HTMLDivElement | null>(null);
  const filterIconDownRef = useRef<HTMLDivElement | null>(null);
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

  const FilterDropDown = () => {
    return (
      <div
        ref={filterDropDownRef}
        className={`absolute right-0 top-16 z-10 ${basicDropDownStyleContainer('w-40')}`}
      >
        {filterTypes.map((item) => (
          <>
            <div
              key={item}
              onClick={() => {
                setDropDownToggle(false);
                setSelectedFilter(item);
              }}
              className={` ${dropDownStyles} `}
            >
              <div className="flex-col">
                <div> {item} </div>

                <div
                  className={`${selectedFilter === item ? 'w-content border-b-2 border-violet-500' : null} `}
                >
                  {' '}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    );
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
          className="absolute right-3 cursor-pointer rounded-full p-1 text-white hover:bg-slate-500 hover:opacity-75"
        >
          {' '}
          {filterIcon}
        </div>
        {dropDownToggle ? <FilterDropDown /> : null}
      </div>
    </div>
  );
};
export default ModalSearch;
