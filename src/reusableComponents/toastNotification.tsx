import { useEffect, useState } from 'react';
import { toastIcon, toastCloseIcon } from './styles';
interface GenericToastProps {
  message: string;
  type: string;
  mode: string;
  id: number;
  removeToast: (id: number) => void;
}

const GenericToast: React.FC<GenericToastProps> = ({
  message,
  type,
  mode,
  id,
  removeToast,
}) => {
  const [timeLeft, setTimeLeft] = useState(5);
  useEffect(() => {
    setTimeLeft(5);
  }, [id]);

  useEffect(() => {
    // Stop the countdown if timeLeft reaches 0
    if (timeLeft < 0) {
      removeToast(id);
      return;
    }

    // Set up the interval
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Clean up the interval on component unmount or when timeLeft changes
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const SuccessToast = (
    <div
      className={`relative rounded-md pb-3 pl-2 pr-10 pt-4 ${mode === 'dark' ? 'bg-black' : 'bg-white'} flex items-center justify-center shadow-lg`}
    >
      <div
        onClick={() => setTimeLeft(-1)}
        className="absolute right-1 top-1 cursor-pointer text-zinc-400"
      >
        {' '}
        {toastCloseIcon}{' '}
      </div>
      <div className="flex max-w-72 items-center justify-center gap-2">
        <div
          className={`${type === 'error' ? 'fill-red-400' : 'fill-green-400'} ${mode === 'dark' ? 'text-black' : 'text-white'}`}
        >
          {' '}
          {toastIcon}{' '}
        </div>
        <div className={`${mode === 'dark' ? 'text-white' : 'text-zinc-600'}`}>
          {message}
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-1 rounded-md bg-green-400 transition-all duration-1000 ease-linear"
        style={{
          width: `${(timeLeft / 5) * 100}%`,
        }}
      ></div>
    </div>
  );

  const errorToast = (
    <div
      className={`relative rounded-md pb-3 pl-2 pr-10 pt-4 ${mode === 'dark' ? 'bg-black' : 'bg-white'} flex items-center justify-center shadow-lg`}
    >
      <div
        onClick={() => setTimeLeft(-1)}
        className="absolute right-1 top-1 cursor-pointer text-zinc-400"
      >
        {' '}
        {toastCloseIcon}{' '}
      </div>
      <div className="flex max-w-72 items-center justify-center gap-2">
        <div
          className={`${type === 'error' ? 'fill-red-400' : 'fill-green-400'} ${mode === 'dark' ? 'text-black' : 'text-white'}`}
        >
          {' '}
          {toastIcon}{' '}
        </div>
        <div className={`${mode === 'dark' ? 'text-white' : 'text-zinc-600'}`}>
          {message}
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-1 rounded-md bg-red-400 transition-all duration-1000 ease-linear"
        style={{
          width: `${(timeLeft / 5) * 100}%`,
        }}
      ></div>
    </div>
  );

  return (
    <div className="">
      {type === 'success' && id && timeLeft >= 0 && SuccessToast}

      {type === 'error' && id && timeLeft >= 0 && errorToast}
    </div>
  );
};
export default GenericToast;
