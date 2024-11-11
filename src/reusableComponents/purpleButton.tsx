
interface purpleButtonProps{
    clickCallBack:any
    children:React.ReactNode;
}
const PurpleButton:React.FC<purpleButtonProps> =({clickCallBack,children})=>{


return(
   <div onClick={()=>clickCallBack()} className="absolute font-semibold right-2 top-2 cursor-pointer bg-violet-500 rounded-lg p-2 text-zinc-900 hover:opacity-75">
    {children}
    </div>
)

}; export default PurpleButton;