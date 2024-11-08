import React, { useState, useEffect, forwardRef,useRef } from 'react';
import {ChatObject} from '../types/interfaces'
import {submitAirplane} from './styles'
interface InputComponentProps {
  handleSearch: (query: ChatObject) => void;
  paddingLeft: string
}




const chatInput = forwardRef<HTMLTextAreaElement, InputComponentProps>(
  ({ handleSearch,paddingLeft }, ref) => {
    const [query, setQuery] = useState<string>('');




 


    return (
      <div className = 'flex justify-end items-center relative w-full'> 
      <textarea
        style={{ resize: "none" }}
        ref={ref} // Now correctly forwarding the ref
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder="Send Message"
        className={`rounded-xl z-10 p-2.5 h-12 pr-12 box-border text-white bg-zinc-900 bg-opacity-90 ${paddingLeft} flex-grow max-w-96 border border-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500 shadow-lg`}
      />
    <div onClick = {()=>{ handleSearch({'message':query,'name':'Micah'}) ; setQuery('')}} className = 'absolute z-10 p-1 hover:bg-slate-500 rounded-full cursor-pointer hover:opacity-75 right-5'> 
      {submitAirplane}
      </div>
      </div>
    );
  }
);



export default chatInput;
