
import {GeoJsonFeature} from '../../types/interfaces'
import {checkBadge,chatIcon,minusIcon,closeIcon} from '../../reusableComponents/styles'
import ModalSearch from './modalComponents/modalSearch'
import {useState} from 'react'
type ClimbModalProps = {



    clickedFeatureClimbs: GeoJsonFeature[];
    closeModalCallBack: (trigger: boolean) => void;
  };
  const ClimbModal: React.FC<ClimbModalProps> = ({
    clickedFeatureClimbs,
    closeModalCallBack = () => {}
  }) => {

const [routeFilterString,setRouteFilterString] = useState<string>('')


 const searchFilterCallBack=(data:string)=>{

    setRouteFilterString(data)

  }





//add input so that users can search for climbs within a point

return(
    
    <div onClick = {()=>closeModalCallBack(false)} className = 'flex justify-center z-20 items-center bg-slate-500 w-screen h-screen bg-opacity-75 bg-blur-md absolute'> 

    <div onClick={(event) => event.stopPropagation()} className = 'bg-zinc-900 rounded-lg relative shadow-md shadow-opacity-50 shadow-violet-200 gap-2 pt-5 pb-5 overflow-y-scroll h-1/2 w-1/2 items-center flex flex-col pl-10 pr-10 min-h-96 min-w-96 z-36'>    
    <div onClick = {()=>closeModalCallBack(false)} className = 'absolute hover:bg-slate-500 rounded-full hover:opacity-75 p-1 cursor-pointer text-white right-2 top-2'> {closeIcon} </div>

<ModalSearch searchFilterCallBack ={searchFilterCallBack}/>
    
   <div> 
   
   <div className="w-full rounded-md bg-zinc-900">
   {clickedFeatureClimbs
  .filter((item: GeoJsonFeature) => item.name.toLowerCase().includes(routeFilterString.toLowerCase()))
  .map((item: GeoJsonFeature) => (
    <div key={item.id} className="flex flex-col shadow-sm shadow-violet-200 gap-2 mt-5 bg-zinc-800 rounded-md text-black p-10 relative">
      <div className='absolute top-2 right-2 hover:bg-slate-500 rounded-full hover:opacity-75 p-1 cursor-pointer text-red-300'>{minusIcon}</div>
      <div className='absolute flex items-center gap-2 right-2 bottom-2'>
        <div className="hover:bg-slate-500 hover:text-green-500 rounded-full hover:opacity-75 p-1 cursor-pointer text-neutral-500">{checkBadge}</div>
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
        <div className='p-1 rounded-md bg-violet-300'>Theresa</div>
        <div className='p-1 rounded-md bg-violet-300'>Micah</div>
        <div className='p-1 rounded-md bg-violet-300'>Corbin</div>
        <div className='p-1 rounded-md bg-violet-300'>Leavy</div>
      </div>
    </div>
  ))}

</div>

    
    </div> 
    </div>

    </div>
)


}; export default ClimbModal;