import { useRef, useState, useEffect } from 'react';
import {
  basicDropDownStyleContainer,
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
}
const DropDown: React.FC<DropDownProps> = ({
  dropDownItems,
  selectedDropDownItemCallBack,
  initDropDownItem,
  dropDownButtonStyle,
  dropDownWidth,
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

  const DropDownItems = () => {
    return (
      <div
        ref={dropDownItemsRef}
        className={basicDropDownStyleContainer(dropDownWidth)}
      >
        {dropDownItems.map((item) =>
          item !== stateDropDownItem ? (
            <div
              onClick={() => {
                setStateDropDownItem(item);
                setDropDownItemsState(false);
                selectedDropDownItemCallBack(item);
              }}
              className={dropDownStyles}
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
