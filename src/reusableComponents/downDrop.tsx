import { basicDropDownStyleContainer, dropDownStyles } from './styles';
import { forwardRef } from 'react';
interface FilterDropDownProps {
  filterTypes: string[];
  setSelectedFilterCallBack: (item: string) => void;
  setDropDownToggleCallBack: (booleanValue: boolean) => void;
  selectedFilter?: string;
  downDropWidth: string;
  color?: string;
}
const DownDrop = forwardRef<HTMLDivElement, FilterDropDownProps>(
  (
    {
      filterTypes,
      setSelectedFilterCallBack,
      setDropDownToggleCallBack,
      selectedFilter,
      downDropWidth,
      color,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`absolute right-0 top-16 z-10 ${basicDropDownStyleContainer(downDropWidth)}`}
      >
        {filterTypes.map((item) => (
          <>
            <div
              key={item}
              onClick={() => {
                setDropDownToggleCallBack(false);
                setSelectedFilterCallBack(item);
              }}
              className={color ? dropDownStyles(color) : dropDownStyles('gray')}
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
  },
);
export default DownDrop;
