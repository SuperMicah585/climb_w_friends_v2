import { useState, useEffect } from 'react';
import { getTicksByMap, getAttemptsByMap } from '../mapApiRequests';
import GenericModal from '../../../reusableComponents/genericModal';
import LoadingSpinner from '../../../reusableComponents/loadingSpinner';
import Input from '../../../reusableComponents/input';

interface TickAttemptModalProps {
  mapId: number;
  closeModalCallBack: (trigger: boolean) => void;
}

interface TickData {
  tickId: number;
  mapId: number;
  climbId: number;
  attempts: string;
  difficulty: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  user: {
    userId: number;
    auth0ID: string;
    name: string;
    username: string;
  };
  climb: {
    climbId: number;
    climbName: string;
    rating: string;
    climbType: string;
  };
}

interface AttemptData {
  attemptId: number;
  mapId: number;
  climbId: number;
  attempts: string;
  difficulty: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  user: {
    userId: number;
    auth0ID: string;
    name: string;
    username: string;
  };
  climb: {
    climbId: number;
    climbName: string;
    rating: string;
    climbType: string;
  };
}

interface GroupedData {
  climbId: number;
  climbName: string;
  rating: string;
  climbType: string;
  ticks: TickData[];
  attempts: AttemptData[];
}

const TickAttemptModal: React.FC<TickAttemptModalProps> = ({
  mapId,
  closeModalCallBack,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [groupedData, setGroupedData] = useState<GroupedData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch both ticks and attempts
        const [ticksData, attemptsData] = await Promise.all([
          getTicksByMap(mapId),
          getAttemptsByMap(mapId),
        ]);

        // Group data by climb
        const climbMap = new Map<number, GroupedData>();

        // Process ticks
        ticksData.forEach((tick: TickData) => {
          if (!climbMap.has(tick.climbId)) {
            climbMap.set(tick.climbId, {
              climbId: tick.climbId,
              climbName: tick.climb.climbName,
              rating: tick.climb.rating,
              climbType: tick.climb.climbType,
              ticks: [],
              attempts: [],
            });
          }
          climbMap.get(tick.climbId)!.ticks.push(tick);
        });

        // Process attempts
        attemptsData.forEach((attempt: AttemptData) => {
          if (!climbMap.has(attempt.climbId)) {
            climbMap.set(attempt.climbId, {
              climbId: attempt.climbId,
              climbName: attempt.climb.climbName,
              rating: attempt.climb.rating,
              climbType: attempt.climb.climbType,
              ticks: [],
              attempts: [],
            });
          }
          climbMap.get(attempt.climbId)!.attempts.push(attempt);
        });

        // Convert map to array and sort by climb name
        const sortedData = Array.from(climbMap.values()).sort((a, b) =>
          a.climbName.localeCompare(b.climbName)
        );

        setGroupedData(sortedData);
      } catch (err) {
        console.error('Error fetching tick/attempt data:', err);
        setError('Failed to load tick and attempt data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [mapId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'soft':
        return 'text-green-400';
      case 'benchmark':
        return 'text-yellow-400';
      case 'sandbagged':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const filteredData = groupedData.filter((climb) => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Search in climb name
    if (climb.climbName.toLowerCase().includes(searchLower)) return true;
    
    // Search in user names (ticks)
    if (climb.ticks.some(tick => 
      tick.user.name.toLowerCase().includes(searchLower) ||
      tick.user.username.toLowerCase().includes(searchLower) ||
      (tick.notes && tick.notes.toLowerCase().includes(searchLower))
    )) return true;
    
    // Search in user names (attempts)
    if (climb.attempts.some(attempt => 
      attempt.user.name.toLowerCase().includes(searchLower) ||
      attempt.user.username.toLowerCase().includes(searchLower) ||
      (attempt.notes && attempt.notes.toLowerCase().includes(searchLower))
    )) return true;
    
    return false;
  });

  if (isLoading) {
    return (
      <GenericModal
        closeModalCallBack={closeModalCallBack}
        maxHeight="h-[80vh]"
        maxWidth="w-[80vw]"
      >
        <div className="flex items-center justify-center p-8">
          <LoadingSpinner size="large" />
        </div>
      </GenericModal>
    );
  }

  if (error) {
    return (
      <GenericModal
        closeModalCallBack={closeModalCallBack}
        maxHeight="h-[80vh]"
        maxWidth="w-[80vw]"
      >
        <div className="flex items-center justify-center p-8">
          <div className="text-red-500 text-center">
            <p className="text-lg font-semibold mb-2">Error Loading Data</p>
            <p>{error}</p>
          </div>
        </div>
      </GenericModal>
    );
  }

  return (
    <GenericModal
      closeModalCallBack={closeModalCallBack}
      maxHeight="h-[80vh]"
      maxWidth="w-[80vw]"
    >
      <div className="w-full h-full flex flex-col">
        <h2 className="text-3xl font-bold text-white mb-6">Map Climbing Activity</h2>
        
        {/* Search Input */}
        <div className="mb-6 border-b border-neutral-500 pb-5">
          <Input
            paddingLeft={'pl-4'}
            handleSearch={handleSearch}
            setPlaceHolder={'Search by climb name, climber, or notes...'}
          />
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredData.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p className="text-lg">{searchTerm ? 'No results found for your search.' : 'No ticks or attempts found for this map.'}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredData.map((climb) => (
                <div
                  key={climb.climbId}
                  className="relative mt-5 flex w-full flex-col gap-2 rounded-md bg-customGray p-10 text-black shadow-sm shadow-white"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {climb.climbName}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-white">
                      <span className="bg-zinc-700 px-2 py-1 rounded">
                        {climb.rating}
                      </span>
                      <span className="bg-zinc-700 px-2 py-1 rounded">
                        {climb.climbType}
                      </span>
                      <span className="text-green-500">
                        {climb.ticks.length} Tick{climb.ticks.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-amber-500">
                        {climb.attempts.length} Attempt{climb.attempts.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Ticks Section */}
                  {climb.ticks.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-green-500 mb-2 flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Ticks ({climb.ticks.length})
                      </h4>
                      <div className="space-y-3">
                        {climb.ticks.map((tick) => (
                          <div
                            key={tick.tickId}
                            className="bg-zinc-700 rounded p-3 border-l-4 border-green-500"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white">
                                  {tick.user.name || tick.user.username}
                                </span>
                                <span className="text-sm text-white">
                                  {tick.attempts} attempt{tick.attempts !== '1' ? 's' : ''}
                                </span>
                              </div>
                              <span className={`text-sm font-medium ${getDifficultyColor(tick.difficulty)}`}>
                                {tick.difficulty}
                              </span>
                            </div>
                            {tick.notes && (
                              <p className="text-white text-sm mb-2">{tick.notes}</p>
                            )}
                            <div className="text-xs text-white">
                              {formatDate(tick.createdAt)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Attempts Section */}
                  {climb.attempts.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-amber-500 mb-2 flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Attempts ({climb.attempts.length})
                      </h4>
                      <div className="space-y-3">
                        {climb.attempts.map((attempt) => (
                          <div
                            key={attempt.attemptId}
                            className="bg-zinc-700 rounded p-3 border-l-4 border-amber-500"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white">
                                  {attempt.user.name || attempt.user.username}
                                </span>
                                <span className="text-sm text-white">
                                  {attempt.attempts} attempt{attempt.attempts !== '1' ? 's' : ''}
                                </span>
                              </div>
                              <span className={`text-sm font-medium ${getDifficultyColor(attempt.difficulty)}`}>
                                {attempt.difficulty}
                              </span>
                            </div>
                            {attempt.notes && (
                              <p className="text-white text-sm mb-2">{attempt.notes}</p>
                            )}
                            <div className="text-xs text-white">
                              {formatDate(attempt.createdAt)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </GenericModal>
  );
};

export default TickAttemptModal; 