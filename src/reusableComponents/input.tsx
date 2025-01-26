import { useState, useEffect, forwardRef } from 'react';

interface InputComponentProps {
  handleSearch: (query: string) => void;
  setToggleSearchDropDown?: (value: boolean) => void; // Optional
  paddingLeft: string;
  setPlaceHolder?: string;
  bgColor?: string;
  focusColor?: string;
}

const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
  (
    {
      handleSearch,
      setToggleSearchDropDown,
      paddingLeft,
      setPlaceHolder,
      bgColor,
      focusColor,
    },
    ref,
  ) => {
    const [query, setQuery] = useState<string>('');
    const [debouncedQuery, setDebouncedQuery] = useState<string>(query);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedQuery(query);
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }, [query]);

    useEffect(() => {
      handleSearch(debouncedQuery);
    }, [debouncedQuery]);

    return (
      <input
        ref={ref} // Now correctly forwarding the ref
        onFocus={() => setToggleSearchDropDown && setToggleSearchDropDown(true)}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder={`${setPlaceHolder ? setPlaceHolder : 'Search for Climbs'}`}
        className={`rounded-xl ${bgColor ? bgColor + ' ' + 'border-black text-black' : 'border-neutral-500 bg-zinc-900 text-white'} bg-opacity-90 ${paddingLeft} w-full flex-grow border p-3 focus:outline-none focus:ring-1 ${focusColor ? focusColor : 'focus:ring-violet-500'}`}
      />
    );
  },
);

export default InputComponent;
