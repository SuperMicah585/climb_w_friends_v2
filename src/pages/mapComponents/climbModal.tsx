
import {GeoJsonFeature} from '../../types/interfaces'
import {checkBadge,chatIcon,minusIcon,closeIcon,addIcon,newWindowIcon} from '../../reusableComponents/styles'
import ModalSearch from './modalComponents/modalSearch'
import {useState,useEffect} from 'react'
type ClimbModalProps = {



    clickedFeatureClimbs: GeoJsonFeature[];
    closeModalCallBack: (trigger: boolean) => void;
  };
  const ClimbModal: React.FC<ClimbModalProps> = ({
    clickedFeatureClimbs,
    closeModalCallBack = () => {}
  }) => {
  

const [isClimbAdded,setIsClimbAdded] = useState<boolean>(false)
const [routeFilterString,setRouteFilterString] = useState<string>('')
const [sortString,setSortString] = useState('Order Grade ASC')
const [isClimbTicked,setisClimbTicked] = useState(false)


 const searchFilterCallBack=(data:string)=>{

    setRouteFilterString(data)

  }

  const sortStringCallBack=(data:string)=>{

    setSortString(data)

  }


  const mp_page = ( item:GeoJsonFeature ) => { 
    const url = `https://www.mountainproject.com/route/${item.id}/${encodeURIComponent(item.name)}`;
    window.open(url, '_blank'); // Open in a new tab
};

return(
    
    <div onClick = {()=>closeModalCallBack(false)} className = 'flex justify-center z-20 items-center bg-slate-500 w-screen h-screen bg-opacity-75 bg-blur-md absolute'> 

    <div onClick={(event) => event.stopPropagation()} className = 'bg-zinc-900 rounded-lg relative shadow-sm shadow-opacity-50 shadow-violet-200 gap-2 pt-5 pb-5 overflow-y-scroll h-1/2 w-1/2 items-center flex flex-col pl-10 pr-10 min-h-96 min-w-96 z-36'>    
    <div onClick = {()=>closeModalCallBack(false)} 
    className = 'absolute hover:bg-slate-500 rounded-full hover:opacity-75 p-1 cursor-pointer text-white right-2 top-2'> {closeIcon} </div>

<ModalSearch sortStringCallBack = {sortStringCallBack} searchFilterCallBack ={searchFilterCallBack}/>
    
   <div> 
   
   <div className="w-full rounded-md bg-zinc-900">
   {clickedFeatureClimbs
  .filter((item: GeoJsonFeature) => item.name.toLowerCase().includes(routeFilterString.toLowerCase()))

  .sort((a, b) => {
    if (sortString === 'Order Route ASC') {
      return a.name.localeCompare(b.name); // Sort alphabetically by name
    } else if (sortString === 'Order Route DESC') {
      return b.name.localeCompare(a.name); // Sort in reverse alphabetical order
    }
    return 0;
  })
  
  .map((item: GeoJsonFeature) => (
    <div key={item.id} className="flex flex-col shadow-sm shadow-violet-200 gap-2 mt-5 bg-zinc-800 rounded-md text-black p-10 relative">

      <div onClick = {()=>mp_page(item)} className = 'absolute text-neutral-500 hover:text-neutral-400 hover:bg-slate-500 top-1 left-2 rounded-lg hover:opacity-75 p-1 cursor-pointer'> {newWindowIcon} </div>
      <div onClick ={()=>setIsClimbAdded(prev=>!prev)} className={`absolute top-2 right-2 hover:bg-slate-500 rounded-full hover:opacity-75 p-1 cursor-pointer ${isClimbAdded? 'text-red-300':'text-green-300'}`}>{isClimbAdded?minusIcon:addIcon}</div>

      <div className='absolute flex items-center gap-2 right-2 bottom-2'>
        <div onClick = {()=> setisClimbTicked(prev=>!prev)} className={`hover:bg-slate-500 rounded-full hover:opacity-75 p-1 cursor-pointer ${isClimbTicked?'text-green-500':'text-neutral-500 hover:text-neutral-400'}`}>{checkBadge}</div>
        <div className="hover:bg-slate-500 rounded-full hover:opacity-75 p-1 cursor-pointer text-blue-500">{chatIcon}</div>
      </div>
      {/* Main details section */}
      <div className="flex gap-5 text-white font-semibold">
        <div>{item.name}</div>
        <div className='border-r white'></div>
        <div>{item.grade}</div>
      </div>

      <div className="italic text-white text-sm">Sport</div>

      <div className="text-white text-xs">
        Roadside Boulder &gt; Jefferson Lake &gt; Olympic Bouldering &gt; Olympic National Park &gt; Olympics & Pacific Coast &gt; Washington
      </div>

      <div className='flex gap-2 items-center italic font-bold text-xs text-black mt-5'>
        <div className='p-1 text-white rounded-md border-violet-500 border-2'>Theresa</div>
        <div className='p-1 text-white rounded-md border-violet-500 border-2'>Micah</div>
        <div className='p-1 text-white rounded-md border-violet-500 border-2'>Corbin</div>
        <div className='p-1 text-white rounded-md border-violet-500 border-2'>Leavy</div>
      </div>
    </div>
  ))}

</div>

    
    </div> 
    </div>

    </div>
)


}; export default ClimbModal;