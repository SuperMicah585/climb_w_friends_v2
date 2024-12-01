
import {useState,useEffect,useRef} from 'react'
import DownDrop from "../../reusableComponents/downDrop";
import {GeoJsonFeature} from "../../types/interfaces"

interface TickClimbsComponent{
    setisClimbTicked: React.Dispatch<React.SetStateAction<boolean>>
    setDropDownItemsState:boolean
    setDropDownItemsStateCallBack:(value:boolean)=>void
}
const TickClimbsComponent:React.FC<TickClimbsComponent> = ({setDropDownItemsState,setisClimbTicked,setDropDownItemsStateCallBack}) => {
const filterTypes = ['Quick Tick','Tick']
const downDropRef = useRef<HTMLDivElement | null>(null)


const setSelectedTickCallBack = (item:string)=>{
    setisClimbTicked(true)
    console.log(item)

}







return(
<div className="absolute right-0 top-0">
  {setDropDownItemsState === true? (
    <DownDrop
      ref={downDropRef}
      downDropWidth="w-32"
      setSelectedFilterCallBack={setSelectedTickCallBack}
      setDropDownToggleCallBack = {setDropDownItemsStateCallBack}
      filterTypes={filterTypes}
    />
  ):null}
</div>
)

}; export default TickClimbsComponent;