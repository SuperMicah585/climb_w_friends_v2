import { useEffect, useState } from 'react';
import { MapEvent } from '../../types/interfaces';
import Draggable from 'react-draggable';
import { eventLogDataFetch } from './mapApiRequests';

interface ActivityFeedProps {
  mapId: number;
  getTimeForAuditLog: string;
}
const ActivityFeed: React.FC<ActivityFeedProps> = ({
  mapId,
  getTimeForAuditLog,
}) => {
  const [events, setEvents] = useState<MapEvent[]>([]);
  const [datetoFetchFrom, setDatetoFetchFrom] = useState<string>('');

  useEffect(() => {
    const fetchActivityFeedData = async () => {
      let data: any; //we will always get data ust need to declare so no error
      if (datetoFetchFrom) {
        data = await eventLogDataFetch(mapId, datetoFetchFrom);
      } else {
        data = await eventLogDataFetch(mapId, getTimeForAuditLog);
      }

      const eventData = data.activities.map((item: any) => {
        const date = new Date(item.updatedAt);

        const pacificTime = date.toLocaleString('en-US', {
          timeZone: 'America/Los_Angeles',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });

        return {
          action: item.action,
          details: item.details,
          updatedAt: pacificTime,
          username: data.userInfo[item.userId].username,
          name: data.userInfo[item.userId].name,
        };
      });
      setEvents((prev) => [...eventData, ...prev]);
    };
    // Initial fetch
    fetchActivityFeedData();
  }, [mapId, datetoFetchFrom]);

  useEffect(() => {
    const setTime = () => {
      if (datetoFetchFrom) {
        setDatetoFetchFrom((prev) => {
          const prevDate = new Date(prev); // Convert string to Date
          const updatedDate = new Date(prevDate.getTime() + 10000); // Add 10 seconds
          return updatedDate.toISOString(); // Convert back to ISO string
        });
      } else {
        const currentTimestamp = new Date(); // Create a Date object
        const updatedDate = new Date(currentTimestamp.getTime() - 10000); // Subtract 10 seconds
        setDatetoFetchFrom(updatedDate.toISOString()); // Convert to ISO string and update state
      }
    };
    const intervalId = setInterval(setTime, 10000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const borderColors = {
    AddClimb: 'border-green-400',
    UserJoined: 'border-blue-400',
    UserLeft: 'border-red-400',
    RemoveClimb: 'border-orange-400',
  };

  const textColors = {
    AddClimb: 'text-green-400',
    UserJoined: 'text-blue-400',
    UserLeft: 'text-red-400',
    RemoveClimb: 'text-orange-400',
  };

  return (
    <Draggable>
      <div className="absolute right-5 top-20 z-10 flex cursor-grab flex-col items-center justify-center rounded-lg border border-slate-500 bg-zinc-900 bg-opacity-90 pb-3 pt-3 text-white">
        <div className="flex w-full items-center justify-center border-b border-slate-500 pb-2 font-semibold">
          {' '}
          Event Log
        </div>
        <div className="mt-2 flex h-80 w-96 flex-col items-center gap-5 overflow-y-scroll pl-5 pr-2">
          <div className="flex w-full flex-col gap-2 text-white">
            {events.map((item, index) => (
              <div
                className={`flex flex-col justify-center gap-2 ${borderColors[item.action] || 'border-gray-500'} border-l-2 bg-opacity-75 pb-2 pl-5 pr-5 pt-2`}
                key={index}
              >
                <div className="flex flex-col justify-center gap-1">
                  <div className="flex items-center gap-2">
                    <div className=""> {item.name}</div>
                    <div> - </div>
                    <div className="text-sm font-thin"> {item.username}</div>
                  </div>

                  <div className="text-xs font-thin">
                    {' '}
                    {item.updatedAt + ' ' + 'PT'}
                  </div>
                </div>
                <div className={` ${textColors[item.action]}`}>
                  {item.details}{' '}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Draggable>
  );
};
export default ActivityFeed;
