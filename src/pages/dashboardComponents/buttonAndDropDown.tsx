import { 
  verticalDotIcon, 
  editMapIcon, 
  addFriendsIcon, 
  deleteMapIcon 
} from '../../reusableComponents/styles';
import { MapObject } from '../../types/interfaces';

import { useEffect, useState, useRef } from 'react';
interface ButtonAndDropDownProps {
  setEditMapObject: React.Dispatch<React.SetStateAction<MapObject>>; // If MapObject can be null
  setMapId: React.Dispatch<React.SetStateAction<number>>;
  mapItem: MapObject;
  setModalToDisplayCallBack: (value: string) => void;
}
const ButtonAndDropDown: React.FC<ButtonAndDropDownProps> = ({
  setEditMapObject,
  setMapId,
  mapItem,
  setModalToDisplayCallBack,
}) => {
  const downDropRef = useRef<HTMLDivElement | null>(null);
  const verticalRef = useRef<HTMLDivElement | null>(null);
  const [dropDownTrigger, setDropDownTrigger] = useState<boolean>(false);


  const mapDropDownItems = [
    { label: 'Edit Map', icon: editMapIcon },
    { label: 'Add Friends', icon: addFriendsIcon },
    { label: 'Delete Map', icon: deleteMapIcon }
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        downDropRef.current &&
        !downDropRef.current.contains(event.target as Node) &&
        verticalRef.current &&
        !verticalRef.current.contains(event.target as Node)
      ) {
        setDropDownTrigger(false);
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [verticalRef, downDropRef]);

  const handleItemClick = (label: string) => {
    setModalToDisplayCallBack(label);
    setDropDownTrigger(false);
  };

  return (
    <div className="absolute right-2 top-2">
      <div
        onClick={() => {
          setEditMapObject(mapItem);
          setMapId(mapItem.mapId);
          setDropDownTrigger((prev) => !prev);
        }}
        ref={verticalRef}
        className="cursor-pointer rounded-full p-1 text-white hover:bg-neutral-500 hover:opacity-75"
      >
        {verticalDotIcon}
      </div>

      {dropDownTrigger && (
        <div className="absolute right-0 top-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-50" ref={downDropRef}>
          <div className="py-1">
            {mapDropDownItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item.label)}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="w-4 h-4">
                  {item.icon}
                </div>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ButtonAndDropDown;
