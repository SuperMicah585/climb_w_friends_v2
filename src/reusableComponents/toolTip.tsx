import { useState, useRef, useEffect } from 'react';
import { closeIcon, triangleIcon } from './styles';
interface TooltipProps {
  children: React.ReactNode;
  item: any;
  deleteItemCallBack: (item: any) => void;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  item,
  deleteItemCallBack,
}) => {
  const [popUpShow, setpopUpShow] = useState(false);
  const tagRef = useRef<HTMLDivElement | null>(null);
  const toolTipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Add event listener
    const handleMouseDown = (event: MouseEvent) => {
      if (
        tagRef.current &&
        !tagRef.current.contains(event.target as Node) &&
        toolTipRef.current &&
        !toolTipRef.current.contains(event.target as Node)
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

  return (
    <div className="relative flex flex-col">
      {popUpShow ? (
        <div
          ref={toolTipRef}
          className="absolute right-0 top-0 z-20 -translate-y-9 transform rounded text-white"
        >
          <div
            onClick={() => {
              deleteItemCallBack(item);
              setpopUpShow(false);
            }}
            className="transform cursor-pointer rounded-md bg-zinc-950 text-violet-500 text-white"
          >
            {closeIcon}
          </div>
          <div className="rotate-90 skew-y-3 fill-violet-500 text-zinc-950">
            {' '}
            {triangleIcon}
          </div>
        </div>
      ) : null}
      <div
        ref={tagRef}
        onClick={() => setpopUpShow((prev) => !prev)}
        className={`cursor-pointer border-2 border-transparent`}
      >
        {children}
      </div>
    </div>
  );
};
export default Tooltip;
