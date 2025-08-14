import ClimbModal from './climbModal';
import { useEffect, useState } from 'react';
import { ClimbWithDependencies } from '../../../types/interfaces';
import { retrieveFeatureDependenciesByMap } from '../mapApiRequests';
interface AllClimbsProps {
  closeModalCallBack: (trigger: boolean) => void;
  mapId: number;
  auth0Id: string;
}
const AllClimbsModal: React.FC<AllClimbsProps> = ({
  closeModalCallBack,
  mapId,
  auth0Id,
}) => {
  const [climbsOnMap, setClimbsOnMap] = useState<ClimbWithDependencies[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    const getClimbsWithDependencies = async () => {
      setIsLoading(true);
      
      try {
        const results = await retrieveFeatureDependenciesByMap(mapId, auth0Id);
        setClimbsOnMap(results);
      } catch (error) {
        console.error('Error fetching climbs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getClimbsWithDependencies();
  }, [mapId, auth0Id]);

  return (
    <ClimbModal
      clickedFeatureClimbs={climbsOnMap}
      closeModalCallBack={closeModalCallBack}
      mapId={mapId}
      auth0Id={auth0Id}
      isLoading={isLoading}
    />
  );
};
export default AllClimbsModal;
