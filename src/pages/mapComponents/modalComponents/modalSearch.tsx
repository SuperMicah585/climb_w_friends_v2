import {filterIcon,dropDownStyles,basicDropDownStyleContainer} from '../../../reusableComponents/styles'
import {useState,useRef,useEffect} from 'react'
import Input from '../../../reusableComponents/input'
import {filterTypes} from '../mapObjects'

interface ModalSearchProps {
  searchFilterCallBack: (data: string) => void;

}


const ModalSearch: React.FC<ModalSearchProps> = ({ searchFilterCallBack }) =>{
  const [searchResults, setSearchResults] = useState('')
const [dropDownToggle,setDropDownToggle] = useState(false)
const [selectedFilter,setSelectedFilter] = useState('Order Grade ASC')
const filterDropDownRef = useRef<HTMLDivElement | null>(null)
const filterIconDownRef = useRef<HTMLDivElement | null>(null)
const inputRef = useRef<HTMLInputElement | null>(null);


useEffect(()=>{


  searchFilterCallBack(searchResults)

},[searchResults])


const handleDocumentClick = (event:any) => {
  if (filterDropDownRef.current && filterIconDownRef.current && !filterIconDownRef.current.contains(event.target) && !filterDropDownRef.current.contains(event.target)) {
    setDropDownToggle(false);
  }
  };


useEffect(() => {

  document.addEventListener('mouseup', handleDocumentClick);

  // Cleanup event listener on component unmount
  return () => {
    document.removeEventListener('mouseup', handleDocumentClick);
  };
}, []);




const handleClimbSearch = async(query:string) =>{
 

    setSearchResults(query);
  
}

const FilterDropDown = ()=>{

return(
  <div ref={filterDropDownRef}  className = {`absolute right-0 top-16 z-10 ${basicDropDownStyleContainer('w-40')}`}> 
  {filterTypes.map((item) =>
  <>
  <div onClick = {()=>{setDropDownToggle(false);setSelectedFilter(item)}} key = {item} className = {` ${dropDownStyles} `}>
  <div className = 'flex-col'> 
  <div> {item} </div>

  <div className = {`${selectedFilter ===item?'w-content border-b-2 border-violet-500':null} `}> </div>
  </div>
  </div>
  </>
  )
  
  
  }

  </div>
)

}

return(
 
   


    <div className ='flex pb-5 w-full gap-10 border-b border-neutral-500 items-center'> 

    <div className = 'flex relative items-center'> 
    <Input paddingLeft = {'pl-5'} ref={inputRef} handleSearch = {handleClimbSearch}/>
    <div ref = {filterIconDownRef} onClick = {() =>setDropDownToggle(prev=>!prev)} className = ' cursor-pointer text-white right-3 absolute p-1 hover:bg-slate-500 hover:opacity-75 rounded-full'> {filterIcon}</div>
   {dropDownToggle? <FilterDropDown/>:null}
    </div>

   
    </div>
  
   
    )

}; export default ModalSearch;