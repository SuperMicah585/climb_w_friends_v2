import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { ChatObject } from '../types/interfaces';
import { submitAirplane } from './styles';
interface InputComponentProps {
  handleSearch: (query: ChatObject) => void;
  paddingLeft: string;
}

const chatInput = forwardRef<HTMLTextAreaElement, InputComponentProps>(
  ({ handleSearch, paddingLeft }, ref) => {
    const [query, setQuery] = useState<string>('');

    return (
      <div className="relative flex w-full items-center justify-end">
        <textarea
          style={{ resize: 'none' }}
          ref={ref} // Now correctly forwarding the ref
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Send Message"
          className={`z-10 box-border h-12 rounded-xl bg-zinc-900 bg-opacity-90 p-2.5 pr-12 text-white ${paddingLeft} max-w-96 flex-grow border border-slate-500 shadow-lg focus:outline-none focus:ring-1 focus:ring-violet-500`}
        />
        <div
          onClick={() => {
            handleSearch({ message: query, name: 'Micah' });
            setQuery('');
          }}
          className="absolute right-5 z-10 cursor-pointer rounded-full p-1 text-white hover:bg-slate-500 hover:opacity-75"
        >
          {submitAirplane}
        </div>
      </div>
    );
  },
);

export default chatInput;
