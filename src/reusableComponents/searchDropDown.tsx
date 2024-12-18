import { useEffect, useRef, RefObject } from 'react';
interface DropDownProps {
  closeDropDownCallBack: (value: boolean) => void;
  children: React.ReactNode;
  inputRef: RefObject<HTMLInputElement>;
  dropDownStatus: boolean;
  maxHeight: string;
  width: string;
  bgColor?: string;
  textColor?: string;
  bgOpacity?: string;
}

const SearchDropDown: React.FC<DropDownProps> = ({
  dropDownStatus,
  closeDropDownCallBack,
  inputRef,
  maxHeight,
  width,
  bgColor,
  textColor,
  bgOpacity,
  children,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleClickOutside = (event: any) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      closeDropDownCallBack(false);
    }
  };

  return dropDownStatus ? (
    <div
      ref={dropdownRef}
      className={`${maxHeight + ' ' + width} overflow-hidden overflow-y-scroll rounded-md ${textColor ? textColor : 'text-white'} ${bgColor ? bgColor + ' ' + 'shadow-lg':'border border-slate-500 bg-customGray'} ${bgOpacity ? bgOpacity : ''}`}
    >
      {children}
    </div>
  ) : null;
};
export default SearchDropDown;
