import { Tags } from '../types/interfaces';
import { useState, useRef, useEffect } from 'react';
import { closeIcon, triangleIcon } from './styles';
interface TooltipProps {
  children: React.ReactNode;
  tag: Tags;
  deleteItemCallBack: (item: any) => void;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  tag,
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
              deleteItemCallBack(tag);
              setpopUpShow(false);
            }}
            className="scale-100 transform cursor-pointer rounded-md bg-zinc-950 text-white"
          >
            {closeIcon}
          </div>
          <div className="rotate-90 text-zinc-950"> {triangleIcon}</div>
        </div>
      ) : null}
      <div
        ref={tagRef}
        onClick={() => setpopUpShow((prev) => !prev)}
        className="cursor-pointer"
      >
        {children}
      </div>
    </div>
  );
};
export default Tooltip;
