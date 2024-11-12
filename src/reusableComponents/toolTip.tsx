import { Tags } from "../types/interfaces";
import {useState,useRef,useEffect} from 'react'
import { closeIcon,triangleIcon } from "./styles";
interface TooltipProps{
    children: React.ReactNode
    tag:Tags
    deleteItemCallBack:(item:any)=>void
}

const Tooltip:React.FC<TooltipProps> = ({children,tag,deleteItemCallBack}) =>{
const [popUpShow,setpopUpShow] = useState(false)
const tagRef = useRef<HTMLDivElement | null>(null)
const toolTipRef = useRef<HTMLDivElement | null>(null)




    useEffect(() => {
        // Add event listener
        const handleMouseDown = (event: MouseEvent) => {

          if (
            (tagRef.current && !tagRef.current.contains(event.target as Node)) &&
            (toolTipRef.current && !toolTipRef.current.contains(event.target as Node))
          ) {
            setpopUpShow(false);
          }
        };
      
        document.addEventListener('mousedown', handleMouseDown);
      
        // Cleanup event listener
        return () => {
          document.removeEventListener('mousedown', handleMouseDown);
        };
      }, []);
    
    return(
<div className="relative flex flex-col">
  {popUpShow ? (
    <div ref = {toolTipRef} className="absolute top-0 right-0 transform -translate-y-9 z-20 text-white rounded">
        <div onClick = {()=>{deleteItemCallBack(tag);setpopUpShow(false)}} className="transform scale-100 bg-zinc-950 rounded-md text-white cursor-pointer">
        
    {closeIcon}
  </div>
  <div className ='rotate-90 text-zinc-950'> {triangleIcon}</div> 
    </div>
  ) : null}
  <div ref = {tagRef} onClick={() => setpopUpShow(prev => !prev)} className="cursor-pointer">
    {children}
  </div>
</div>

    )
};export default Tooltip;