import { useRef, useState, useEffect } from 'react';
import {
  basicDropDownStyleContainer,
  darkDropDownStyleContainer,
  dropDownStyles,
  dropDownSvgOpen,
  dropDownSvgClosed,
} from '../reusableComponents/styles';

interface DropDownProps {
  dropDownItems: string[];
  initDropDownItem: string;
  selectedDropDownItemCallBack: (item: string) => void;
  dropDownButtonStyle: string;
  dropDownWidth: string;
  dropDownHeight?: string;
  color?: string;
  theme?: 'light' | 'dark';
}
const DropDown: React.FC<DropDownProps> = ({
  dropDownItems,
  selectedDropDownItemCallBack,
  initDropDownItem,
  dropDownButtonStyle,
  dropDownWidth,
  dropDownHeight,
  color,
  theme = 'light',
}) => {
  const [dropDownItemsState, setDropDownItemsState] = useState<boolean>(false);
  const [stateDropDownItem, setStateDropDownItem] = useState<string>('');

  const dropDownItemsRef = useRef<HTMLDivElement | null>(null);
  const dropDownButtonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setStateDropDownItem(initDropDownItem);
  }, [initDropDownItem]);

  const handleClickOutside = (event: any) => {
    if (
      dropDownItemsRef.current &&
      dropDownButtonRef.current &&
      !dropDownItemsRef.current.contains(event.target) &&
      !dropDownButtonRef.current.contains(event.target)
    ) {
      setDropDownItemsState(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDownItemsRef]);

  const getItemStyle = () => {
    if (theme === 'dark') {
      return 'flex items-center text-sm border-b border-zinc-700 bg-customGray cursor-pointer hover:bg-neutral-700 p-2 text-white';
    }
    return color ? dropDownStyles(color) : dropDownStyles('gray');
  };

  const DropDownItems = () => {
    const containerStyle = theme === 'dark' 
      ? darkDropDownStyleContainer(dropDownWidth, dropDownHeight)
      : basicDropDownStyleContainer(dropDownWidth, dropDownHeight);
      
    return (
      <div
        ref={dropDownItemsRef}
        className={containerStyle}
      >
        {dropDownItems.map((item) =>
          item !== stateDropDownItem ? (
            <div
              onClick={() => {
                setStateDropDownItem(item);
                setDropDownItemsState(false);
                selectedDropDownItemCallBack(item);
              }}
              className={getItemStyle()}
              key={item}
            >
              {' '}
              {item}{' '}
            </div>
          ) : null,
        )}
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div
        ref={dropDownButtonRef}
        onClick={() => setDropDownItemsState((prev) => !prev)}
        className={dropDownButtonStyle}
      >
        {stateDropDownItem}
        {dropDownItemsState ? dropDownSvgClosed : dropDownSvgOpen}
      </div>
      {dropDownItemsState ? (
        <div className="absolute top-11 z-10">
          {' '}
          <DropDownItems />{' '}
        </div>
      ) : null}
    </div>
  );
};
export default DropDown;
