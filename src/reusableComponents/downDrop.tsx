import { basicDropDownStyleContainer, darkDropDownStyleContainer, dropDownStyles } from './styles';
import { forwardRef } from 'react';
interface FilterDropDownProps {
  filterTypes: string[];
  setSelectedFilterCallBack: (item: string) => void;
  setDropDownToggleCallBack: (booleanValue: boolean) => void;
  selectedFilter?: string;
  downDropWidth: string;
  color?: string;
  theme?: 'light' | 'dark';
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
      theme = 'light',
    },
    ref,
  ) => {
    const getItemStyle = () => {
      if (theme === 'dark') {
        return 'flex items-center text-sm border-b border-zinc-700 bg-customGray cursor-pointer hover:bg-neutral-700 p-2 text-white';
      }
      return color ? dropDownStyles(color) : dropDownStyles('gray');
    };

    const containerStyle = theme === 'dark' 
      ? darkDropDownStyleContainer(downDropWidth)
      : basicDropDownStyleContainer(downDropWidth);

    return (
      <div
        ref={ref}
        className={`absolute right-0 top-16 z-10 ${containerStyle}`}
      >
        {filterTypes.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setDropDownToggleCallBack(false);
              setSelectedFilterCallBack(item);
            }}
            className={getItemStyle()}
          >
            <div className="flex-col">
              <div> {item} </div>
              <div
                className={`${selectedFilter === item ? 'w-content border-b-2 border-violet-500' : ''}`}
              >
                {' '}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },
);
export default DownDrop;
