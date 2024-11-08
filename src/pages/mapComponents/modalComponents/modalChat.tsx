import {useEffect,useState,useRef} from 'react'
import {backArrowIcon} from '../../../reusableComponents/styles'
import ChatInput from '../../../reusableComponents/chatInput'
import {ChatProps,ChatObject} from '../../../types/interfaces'
import {conversation} from '../mapObjects'

const ModalChat: React.FC<ChatProps> = ({displayTrigger,climbName,climbGrade}) =>{

const[displayChat,setDisplayChat] = useState(false)
const[chatArray,setChatArray] = useState<ChatObject[]>(conversation)
const containerRef = useRef<HTMLDivElement>(null);

const handleChatInputCallBack = (chat:ChatObject) =>{


    setChatArray((prev) => [...prev, chat]);

}

useEffect(()=>{
  
if(displayTrigger>0){
    setDisplayChat(prev=>!prev)
}
},[displayTrigger])


useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatArray]);


return(
<> 
  {displayChat?<div
    className="absolute pointer-events-auto bg-zinc-900 max-w-[700px] rounded-lg  items-start flex flex-col z-10"
    style={{
      width: displayChat ? '50%' : '0',        // Smoothly transition width
      minWidth: displayChat ? '24rem' : '0',
      height: displayChat ? '50%' : '0',        // Smoothly transition width
      minHeight: displayChat ? '24rem' : '0',   // Optional for minimum width
    }}
  >
    <div className="flex gap-5 text-2xl p-5 border-b border-neutral-500 w-full text-white font-semibold">
      <div>{climbName}</div>
      <div className='border-r white'></div>
      <div>{climbGrade}</div>
    </div>

    <div ref = {containerRef} className="flex flex-col p-5 pb-20 gap-5 w-full h-full overflow-y-scroll">
      {chatArray.map((item, index) =>
        item.name === "Micah" ? (
          <div style={{
            whiteSpace: 'pre-wrap', // This preserves line breaks
          }} key={index} className="rounded-lg p-2 bg-violet-700 text-white self-end max-w-[66.6667%] break-words">
            {item.message}
          </div>
        ) : (
          <div style={{
            whiteSpace: 'pre-wrap', // This preserves line breaks
          }} key={index} className="rounded-lg p-2 bg-zinc-700 text-white self-start max-w-[66.6667%] break-words">
            <div className="font-semibold text-green-500">{item.name}</div>
            {item.message}
          </div>
        )
      )}
    </div>

    <div className="flex p-2 items-center justify-between absolute border-t border-neutral-500 bottom-0 w-full h-16 bg-zinc-900">
      {displayChat ? (
        <div onClick={() => setDisplayChat(false)} className="z-10 ml-2 text-white hover:bg-slate-500 rounded-full hover:opacity-75 p-1 cursor-pointer">
          {backArrowIcon}
        </div>
      ) : null}
      <ChatInput handleSearch={handleChatInputCallBack} paddingLeft="pl-5" />
    </div>
  </div>:null}
  </>

)

}; export default ModalChat