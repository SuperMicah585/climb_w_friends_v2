import { useEffect, useState, useRef } from 'react';
import { backArrowIcon } from '../../../reusableComponents/styles';
import ChatInput from '../../../reusableComponents/chatInput';
import { ChatProps, ChatObject } from '../../../types/interfaces';

const ModalChat: React.FC<ChatProps> = ({
  displayTrigger,
  climbName,
  climbGrade,
  climbChat,
}) => {
  const [displayChat, setDisplayChat] = useState(false);
  const [chatArray, setChatArray] = useState<ChatObject[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChatInputCallBack = (chat: ChatObject) => {
    setChatArray((prev) => [...prev, chat]);
  };

  useEffect(() => {
    if (displayTrigger > 0) {
      setDisplayChat((prev) => !prev);
    }
  }, [displayTrigger]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      //Will need to pass the updated chat array to the server along with 'map id, feature id,climb id'
    }
  }, [chatArray]);

  useEffect(() => {
    setChatArray(climbChat);
  }, [climbChat]);

  return (
    <>
      {displayChat ? (
        <div className="pointer-events-auto fixed z-10 flex h-1/2 min-h-96 w-1/2 min-w-96 max-w-[700px] flex-col items-start rounded-lg bg-zinc-900">
          <div className="flex w-full gap-5 border-b border-neutral-500 p-5 text-2xl font-semibold text-white">
            <div>{climbName}</div>
            <div className="white border-r"></div>
            <div>{climbGrade}</div>
          </div>

          <div
            ref={containerRef}
            className="flex h-full w-full flex-col gap-5 overflow-y-scroll p-5 pb-20"
          >
            {chatArray.map((item, index) =>
              item.name === 'Micah' ? (
                <div
                  style={{
                    whiteSpace: 'pre-wrap', // This preserves line breaks
                  }}
                  key={index}
                  className="max-w-[66.6667%] self-end break-words rounded-lg bg-violet-700 p-2 text-white"
                >
                  {item.message}
                </div>
              ) : (
                <div
                  style={{
                    whiteSpace: 'pre-wrap', // This preserves line breaks
                  }}
                  key={index}
                  className="max-w-[66.6667%] self-start break-words rounded-lg bg-zinc-700 p-2 text-white"
                >
                  <div className="font-semibold text-green-500">
                    {item.name}
                  </div>
                  {item.message}
                </div>
              ),
            )}
          </div>

          <div className="absolute bottom-0 flex h-16 w-full items-center justify-between border-t border-neutral-500 bg-zinc-900 p-2">
            {displayChat ? (
              <div
                onClick={() => setDisplayChat(false)}
                className="z-10 ml-2 cursor-pointer rounded-full p-1 text-white hover:bg-slate-500 hover:opacity-75"
              >
                {backArrowIcon}
              </div>
            ) : null}
            <ChatInput
              handleSearch={handleChatInputCallBack}
              paddingLeft="pl-5"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ModalChat;