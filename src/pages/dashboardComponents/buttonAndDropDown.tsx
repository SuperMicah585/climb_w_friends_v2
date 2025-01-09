import DownDrop from "../../reusableComponents/downDrop";
import { verticalDotIcon } from "../../reusableComponents/styles";
import { MapObject } from "../../types/interfaces";

import {useEffect,useState,useRef} from 'react'
interface ButtonAndDropDownProps{
    setEditMapObject: React.Dispatch<React.SetStateAction<MapObject>>;  // If MapObject can be null
    setMapId: React.Dispatch<React.SetStateAction<number>>; 
    mapItem:MapObject
    setModalToDisplayCallBack: (value: string) => void;

    
}
const ButtonAndDropDown:React.FC<ButtonAndDropDownProps> = ({setEditMapObject,setMapId,mapItem,setModalToDisplayCallBack}) =>{
    const downDropRef = useRef<HTMLDivElement | null>(null)
    const verticalRef = useRef<HTMLDivElement | null>(null)
    const [dropDownTrigger,setDropDownTrigger] = useState<boolean>(false)
    
const setDropDownToggleCallBack = (value:boolean) =>{
    setDropDownTrigger(value)

    }
const mapDropDownItems = ['Edit Map','Add Friends','Delete Map']



useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
        downDropRef.current && 
      !downDropRef.current.contains(event.target as Node) &&
      verticalRef.current &&
      !verticalRef.current.contains(event.target as Node)
    ) {
        setDropDownTrigger(false)
    }
  }

  // Add event listener
  document.addEventListener('mousedown', handleClickOutside);

  // Cleanup
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [verticalRef,downDropRef]);


return(


    <div
    className="absolute right-2 top-2" 
  >
     <div onClick={() => {
      setEditMapObject(mapItem);
      setMapId(mapItem.mapId);
      setDropDownTrigger(prev=>!prev)
    }} ref = {verticalRef} className = 'cursor-pointer rounded-full p-1 text-white hover:bg-neutral-500 hover:opacity-75'> {verticalDotIcon}</div>
  
   {dropDownTrigger && <div className = 'absolute top-0 right-2 -mt-4'> <DownDrop ref = {downDropRef} color = {'white'} filterTypes = {mapDropDownItems} setSelectedFilterCallBack = {setModalToDisplayCallBack}  setDropDownToggleCallBack= {setDropDownToggleCallBack} downDropWidth = 'w-40'/> </div>}
   </div>
)
};export default ButtonAndDropDown;