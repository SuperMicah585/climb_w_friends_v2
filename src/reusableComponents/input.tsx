import React, { useState, useEffect, forwardRef } from 'react';

interface InputComponentProps {
  handleSearch: (query: string) => void;
  setToggleSearchDropDown?: (value: boolean) => void; // Optional
  paddingLeft: string;
}

const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
  ({ handleSearch, setToggleSearchDropDown, paddingLeft }, ref) => {
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
        placeholder="Search for Climbs"
        className={`rounded-xl bg-zinc-900 bg-opacity-90 text-white ${paddingLeft} w-full flex-grow border border-slate-500 p-3 shadow-lg focus:outline-none focus:ring-1 focus:ring-violet-500`}
      />
    );
  },
);

export default InputComponent;
