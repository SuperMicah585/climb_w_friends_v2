
import {ClimbsTableResponse,GeoJsonFeature} from '../../types/interfaces'

type ClimbModalProps = {
    clickedFeatureClimbs: GeoJsonFeature[];
    closeModalCallBack: (trigger: boolean) => void;
  };
  const ClimbModal: React.FC<ClimbModalProps> = ({
    clickedFeatureClimbs,
    closeModalCallBack = () => {}
  }) => {


const checkBadge = 

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" class="size-8">
<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
</svg>

const chatIcon = 


<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" class="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>

const minusIcon = 

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

const closeIcon = 

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>




return(
    
    <div onClick = {()=>closeModalCallBack(false)} className = 'flex justify-center z-20 items-center bg-slate-500 w-screen h-screen bg-opacity-75 bg-blur-md absolute'> 

    <div onClick={(event) => event.stopPropagation()} className = 'bg-zinc-900 rounded-lg relative shadow-md shadow-opacity-50 shadow-violet-200 gap-2 pt-5 pb-5 overflow-y-scroll h-1/2 w-1/2 items-center flex flex-col pl-10 pr-10 min-h-96 min-w-96 z-36'>    
    <div onClick = {()=>closeModalCallBack(false)} className = 'absolute hover:bg-slate-500 rounded-full hover:opacity-75 p-1 cursor-pointer text-white right-2 top-2'> {closeIcon} </div>

    <div className = 'text-white text-4xl tracking-widest'> CLIMBS</div>

   <div> 
   
   <div className="w-full rounded-md bg-zinc-900">
  {clickedFeatureClimbs.map((item: GeoJsonFeature) => (
    <div key={item.id} className="flex flex-col shadow-sm shadow-violet-200  gap-2 mt-5 bg-zinc-800 rounded-md text-black p-10 relative">
      

      <div className = 'absolute top-2 right-2 hover:bg-slate-500 rounded-full hover:opacity-75 p-1 cursor-pointer text-red-300'> {minusIcon} </div>
      <div className = 'absolute flex items-center gap-2 right-2 bottom-2'> 
      <div className=" hover:bg-slate-500 rounded-full hover:opacity-75 p-1 cursor-pointer text-green-500">{checkBadge}</div>
      <div className="hover:bg-slate-500 rounded-full hover:opacity-75 p-1 cursor-pointer text-blue-500">{chatIcon}</div> 
     </div>
      {/* Main details section */}
      <div className="flex gap-5 text-white font-semibold">
        <div>{item.name}</div>
        <div>{item.grade}</div>
      </div>

      <div className="italic text-white text-sm">Sport</div>

      <div className="text-white text-xs">
        Roadside Boulder &gt; Jefferson Lake &gt; Olympic Bouldering &gt; Olympic National Park &gt; Olympics & Pacific Coast &gt; Washington
      </div>

      <div className = 'flex gap-2 items-center italic font-bold text-xs text-black mt-5'> 
      <div className = 'p-1 rounded-md bg-violet-300'> Theresa</div>
      <div className = 'p-1 rounded-md bg-violet-300'> Micah</div> 
      <div className = 'p-1 rounded-md bg-violet-300'> Corbin</div> 
      <div className = 'p-1 rounded-md bg-violet-300'> Leavy</div> 
      </div>
    </div>
  ))}
</div>

    
    </div> 
    </div>

    </div>
)


}; export default ClimbModal;