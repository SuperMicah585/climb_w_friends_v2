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

  useEffect(() => {
    const getClimbsWithDependencies = async () => {
      const results = await retrieveFeatureDependenciesByMap(mapId, auth0Id);
      setClimbsOnMap(results);
    };
    getClimbsWithDependencies();
  }, [mapId]);

  return (
    <ClimbModal
      clickedFeatureClimbs={climbsOnMap}
      closeModalCallBack={closeModalCallBack}
      mapId={mapId}
      auth0Id={auth0Id}
    />
  );
};
export default AllClimbsModal;
