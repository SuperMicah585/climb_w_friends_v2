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
  theme?: 'light' | 'dark';
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
  theme = 'light',
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

  const getDefaultStyling = () => {
    if (theme === 'dark') {
      return 'border border-neutral-700 bg-customGray text-white';
    }
    return 'border border-gray-200 bg-white text-gray-800';
  };

  return dropDownStatus ? (
    <div
      ref={dropdownRef}
      className={`${maxHeight + ' ' + width} overflow-hidden overflow-y-scroll rounded-md ${textColor ? textColor : theme === 'dark' ? 'text-white' : 'text-gray-800'} ${bgColor ? bgColor + ' ' + 'shadow-lg' : getDefaultStyling()} ${bgOpacity ? bgOpacity : ''}`}
    >
      {children}
    </div>
  ) : null;
};
export default SearchDropDown;
