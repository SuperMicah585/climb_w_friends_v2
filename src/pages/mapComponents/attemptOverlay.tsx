import { useEffect, useState, useRef } from 'react';
import { backArrowIcon } from '../../reusableComponents/styles';
import {
  AttemptObject,
  ClimbWithDependencies,
  TickAndAttemptObjectBeforeResponse,
} from '../../types/interfaces';
import PurpleButton from '../../reusableComponents/genericButton';
import { AddAttemptToClimbToUserToMap } from './mapApiRequests';
import ToastContainer from '../../reusableComponents/toastContainer';

interface AttemptOverlayProps {
  displayTrigger: number;
  climbName: string;
  climbGrade: string;
  userId: string;
  mapId: number;
  attemptObject: AttemptObject | null | TickAndAttemptObjectBeforeResponse;
  climbIdForAttemptAndTick: number;
  setClimbObject: React.Dispatch<React.SetStateAction<ClimbWithDependencies[]>>;
  type: string;
}

const AttemptOverlay: React.FC<AttemptOverlayProps> = ({
  attemptObject,
  displayTrigger,
  climbName,
  climbGrade,
  setClimbObject,
  userId,
  mapId,
  climbIdForAttemptAndTick,
  type,
}) => {
  const [displayChat, setDisplayChat] = useState(false);
  //const [attemptObjectForOverlay, setAttemptObjectForOverlay] = useState<AttemptObject | null>(null);
  const [value, setValue] = useState<string>('');
  const [attemptValue, setAttemptValue] = useState<string>('');
  const [difficultyValue, setDifficultyValue] = useState<string>('');
  const [toastTrigger, setToastTrigger] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (displayTrigger > 0) {
      setDisplayChat((prev) => !prev);
    }
  }, [displayTrigger]);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const AttemptArray = ['A Few', 'Meh Amount', 'A Lot'];
  const difficultyArray = ['Soft', 'Benchmark', 'Sandbagged'];

  const submitAttempt = async () => {
    if (type === 'climb') {
      if (climbIdForAttemptAndTick > -1) {
        try {
          const response = await AddAttemptToClimbToUserToMap(
            climbIdForAttemptAndTick,
            userId,
            mapId,
            value,
            difficultyValue,
            attemptValue,
          );

          // Update climbObject if the response is valid
          setClimbObject((prev) =>
            prev.map((dependency) =>
              dependency.climb.climbId === response.climbId
                ? { ...dependency, attempts: response }
                : dependency,
            ),
          );

          setDisplayChat(false); // Close chat on success
        } catch (error) {
          console.error('Error while submitting attempt:', error);

          // Trigger toast notification or handle error appropriately
          setToastTrigger((prev) => prev + 1);
        }
      }
    } else {
      setClimbObject((prev) =>
        prev.map(
          (dependency): ClimbWithDependencies =>
            dependency.climb.climbId === climbIdForAttemptAndTick
              ? {
                  ...dependency,
                  attempts: {
                    mapId: mapId,
                    climbId: climbIdForAttemptAndTick,
                    userId: userId,
                    notes: value,
                    difficulty: difficultyValue,
                    attempts: attemptValue,
                  },
                }
              : dependency,
        ),
      );
      setDisplayChat(false);
    }
  };

  useEffect(() => {
    if (attemptObject !== null && attemptObject !== undefined) {
      setAttemptValue(attemptObject.attempts);
      setDifficultyValue(attemptObject.difficulty);
      setValue(attemptObject.notes);
    } else {
      setAttemptValue('');
      setDifficultyValue('');
      setValue('');
    }
  }, [displayTrigger, attemptObject]);

  return (
    <>
      <ToastContainer
        message="Please add yourself to climb first"
        type="error"
        trigger={toastTrigger}
        mode="dark"
      />
      {displayChat ? (
        <div className="pointer-events-auto fixed z-10 flex h-2/3 min-h-[400px] w-[700px] min-w-[600px] flex-col items-start rounded-lg bg-zinc-900">
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
                {AttemptArray.map((item, index) => (
                  <div
                    className={`${item === attemptValue ? 'border-violet-500' : ''} cursor-pointer border-b-2 border-transparent text-sm font-semibold`}
                    onClick={() => setAttemptValue(item)}
                    key={index}
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
                {difficultyArray.map((item, index) => (
                  <div
                    className={`${item === difficultyValue ? 'border-violet-500' : ''} cursor-pointer border-b-2 border-transparent text-sm font-semibold`}
                    onClick={() => setDifficultyValue(item)}
                    key={index}
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
              placeholder="input attempt notes here"
              className="h-full w-full rounded-md border-2 border-neutral-500 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
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
            <div onClick={() => submitAttempt()}>
              <PurpleButton paddingLeft="pl-5" paddingRight="pr-5">
                {' '}
                Save{' '}
              </PurpleButton>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default AttemptOverlay;
