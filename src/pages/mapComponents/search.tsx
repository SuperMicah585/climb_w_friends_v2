import {useState,useEffect,useRef} from 'react'
import {climbType,usStates} from './mapObjects'
import { supabase } from '../../supaBaseClient';
import {ClimbsTableResponse} from '../../types/interfaces'
import {
  dropDownStyles,
  dropDownSvgOpen,
  dropDownSvgClosed,
  climbTypeDropDownStyle,
  stateDropDownStyle,
  climbDropDownStyleContainer,
  stateDropDownStyleContainer,
  searchDropDownStyleContainer,
} from './mapStyles'; 
const Search = () =>{

const [toggleClimbTypeDropDown,setToggleClimbTypeDropDown] = useState<boolean>(false)
const [toggleStateDropDown,setToggleStateDropDown] = useState<boolean>(false)
const [toggleSearchDropDown,setToggleSearchDropDown] = useState<boolean>(false)
const [climbTypeDropDownValue,setclimbTypeDropDown] = useState('Boulder')
const [stateDropDownValue,setStateDropDown] = useState('WA')
const [query, setQuery] = useState('');
const [debouncedQuery, setDebouncedQuery] = useState(query);
const [searchResults,setsearchResults] = useState<ClimbsTableResponse[]>([]);
const [stateDropDownName,setStateDropDownName] = useState('Washington')


const climbTypeRefDropdownRef = useRef<HTMLDivElement | null>(null)
const climbTypeRefButtonRef = useRef<HTMLDivElement | null>(null)
const stateRefDropdownRef = useRef<HTMLDivElement | null>(null)
const stateRefButtonRef = useRef<HTMLDivElement | null>(null)
const searchTypeRefDropdownRef = useRef<HTMLDivElement | null>(null)
const inputRef = useRef<HTMLInputElement | null>(null)

//debouncing
useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedQuery(query);
  }, 500);

  return () => {
    clearTimeout(handler);
  };
}, [query]);


useEffect(() => {
  
 

    handleClimbSearch(debouncedQuery)

  
}, [debouncedQuery]);


//check to see if mouse click outside of drops(to close them)

const handleClickOutside = (event:any) => {
  
  if (climbTypeRefDropdownRef.current && climbTypeRefButtonRef.current && !climbTypeRefButtonRef.current.contains(event.target) && !climbTypeRefDropdownRef.current.contains(event.target)) {
    setToggleClimbTypeDropDown(false);
  }

  if (stateRefDropdownRef.current && !stateRefDropdownRef.current.contains(event.target) && stateRefButtonRef.current && !stateRefButtonRef.current.contains(event.target)) {
    setToggleStateDropDown(false);
  }

  if (searchTypeRefDropdownRef.current && !searchTypeRefDropdownRef.current.contains(event.target) && inputRef.current && !inputRef.current.contains(event.target)) {
    setToggleSearchDropDown(false);
  } 


};


useEffect(() => {

  document.addEventListener('mousedown', handleClickOutside);


  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [climbTypeRefDropdownRef,stateRefDropdownRef,searchTypeRefDropdownRef]);


const StateDropDown = () => {
  return (
    <div ref = {stateRefDropdownRef} className={stateDropDownStyleContainer}>
      {usStates.map((item) => (
      item.abbreviation !== stateDropDownValue? 
      <div onClick = {()=>{setStateDropDownName(item.name);setStateDropDown(item.abbreviation);setToggleStateDropDown(false);}} className = {dropDownStyles} key={item.abbreviation}> {item.abbreviation} </div>:null
      ))}
    </div>
  );
};


const ClimbDropDown = () => {
  return (
    <div ref = {climbTypeRefDropdownRef} className={climbDropDownStyleContainer}>
      {climbType.map((item) => (
        item !== climbTypeDropDownValue? 
        <div onClick = {()=>{setclimbTypeDropDown(item);setToggleClimbTypeDropDown(false);}} className = {dropDownStyles} key={item}> {item} </div>:null
      ))}
    </div>
  );
};

const SearchDropDown = () =>{

  return (
    <div ref = {searchTypeRefDropdownRef} className={searchDropDownStyleContainer}>

      {searchResults.length>0?searchResults.map((item) => (
        <div onClick = {()=>{handleClimbSelect(item);setToggleSearchDropDown(false);}} className = {dropDownStyles} key={item.ID}> 
       
        <div className = 'flex p-2 gap-2 flex-col'> 
        <div> 
        <div className='flex gap-2 font-semibold'> 
        <div> {item.Route} </div>
        <div> {item.Rating} </div>
        </div> 
        <div className = 'text-xs font-thin italic'> {item["Route Type"]} </div>
        </div>
        
        <div className= 'text-xs font-thin'>{item.Location}</div>
       
        </div> 

        </div>
      )): <div onClick = {()=>{setToggleSearchDropDown(false)}} className = 'flex items-center text-sm p-2 text-black '> No Results </div>
    
    }
    </div>
  );

}

const handleClimbSearch = async(query:string) =>{
 
  if(query.length===0){
    return setsearchResults([]);
  }



  const { data, error }:{ data: ClimbsTableResponse[] | null; error: any }  = await supabase
    .from('climbs_test')
    .select('*')
    .ilike('Route', `%${query}%`)
    .ilike('Location', `%${stateDropDownName}%`) 
    .ilike("Route Type", `%${climbTypeDropDownValue}%`)
    .limit(10); 
  if (error) {
    
    console.error('Error fetching climbs:', error);
    return;
  }

  if (data) {
    
    setsearchResults(data);

  } else {
    setsearchResults([]); // or handle as needed if data is null
  }
}

const handleClimbSelect = (item: ClimbsTableResponse ) => {

  console.log(item)

}


return(
  <>  


  
    <div className='absolute flex  items-center z-10 left-5 top-5 gap-10 '>
    
    <input
      ref = {inputRef}
      onFocus = {()=>setToggleSearchDropDown(true)}
      onChange={(e) => setQuery(e.target.value)}
      type='text'
      placeholder='Search for Climbs'
      className='rounded-xl text-black bg-white pl-40 w-96 p-3 w-64 focus:outline-none text-black bg-slate-50 focus:ring-2 focus:ring-zinc-700 shadow-lg'
    />


{toggleSearchDropDown?<div className = 'absolute w-content left-40 top-[50px] z-10'> 
    <SearchDropDown/>
    </div>:null}

      <div className = 'absolute pl-1 items-center gap-2 flex'>

        <div className = 'flex flex-col items-center justify-center'> 

        
    <div ref = {climbTypeRefButtonRef} onClick = {()=>setToggleClimbTypeDropDown(prev=>!prev)} className={climbTypeDropDownStyle}>
      {climbTypeDropDownValue}
      {toggleClimbTypeDropDown?dropDownSvgOpen:dropDownSvgClosed}

    

    </div>
    {toggleClimbTypeDropDown?<div className = 'absolute top-11 z-10'> <ClimbDropDown/> </div>:null}
    </div>

    <div className = 'flex flex-col items-center justify-center'> 
    <div ref={stateRefButtonRef} onClick = {()=>setToggleStateDropDown(prev=>!prev)} className={stateDropDownStyle}>
       {stateDropDownValue}
      {toggleStateDropDown?dropDownSvgOpen:dropDownSvgClosed}

      


    </div>
    {toggleStateDropDown?<div className = 'absolute top-11 z-10'> <StateDropDown/> </div>:null}
    </div>



  </div>


  </div>
  
  </>
)


}; export default Search; 