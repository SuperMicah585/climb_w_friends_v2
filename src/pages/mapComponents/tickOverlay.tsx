import { useEffect, useState, useRef } from 'react';
import { backArrowIcon } from '../../reusableComponents/styles';
import ChatInput from '../../reusableComponents/chatInput';
import { ChatObject } from '../../types/interfaces';
import PurpleButton from '../../reusableComponents/purpleButton';

interface TickOverlayProps {
  displayTrigger: number;
  climbName: string;
  climbGrade: string;
  tickInfo: any; //change
}

const TickOverlay: React.FC<TickOverlayProps> = ({
  displayTrigger,
  climbName,
  climbGrade,
  tickInfo,
}) => {
  const [displayChat, setDisplayChat] = useState(false);
  const [tickObject, setTickObject] = useState<ChatObject[]>([]);
  const [value, setValue] = useState<string>('');
  const [attemptValue, setAttemptValue] = useState<string>('Flash');
  const [difficultyValue, setDifficultyValue] = useState<string>('Soft');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (displayTrigger > 0) {
      setDisplayChat((prev) => !prev);
    }
  }, [displayTrigger]);

  useEffect(() => {
    setTickObject(tickInfo);
  }, [tickInfo]);

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const AttemptArray = ['Flash', 'A Few', 'Meh Amount', 'A Lot'];
  const difficultyArray = ['Soft', 'Benchmark', 'Sandbagged'];

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
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <div className="border-b-2 border-transparent font-bold">
                  {' '}
                  Attempts:
                </div>{' '}
                {AttemptArray.map((item) => (
                  <div
                    className={`${item === attemptValue ? 'border-violet-500' : ''} cursor-pointer border-b-2 border-transparent text-sm font-semibold`}
                    onClick={() => setAttemptValue(item)}
                  >
                    {' '}
                    {item}
                  </div>
                ))}{' '}
              </div>

              <div className="flex items-center gap-5">
                <div className="border-b-2 border-transparent font-bold">
                  {' '}
                  Difficulty:
                </div>{' '}
                {difficultyArray.map((item) => (
                  <div
                    className={`${item === difficultyValue ? 'border-violet-500' : ''} cursor-pointer border-b-2 border-transparent text-sm font-semibold`}
                    onClick={() => setDifficultyValue(item)}
                  >
                    {' '}
                    {item}
                  </div>
                ))}{' '}
              </div>
            </div>

            <textarea
              value={value}
              onChange={handleChange}
              placeholder="input tick notes here"
              className="h-full w-full"
            />
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
            <div onClick={() => setDisplayChat(false)}>
              <PurpleButton> Apply </PurpleButton>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default TickOverlay;
