import ClimbModal from './climbModal';
import { useEffect, useState } from 'react';
import {
  ClimbWithDependencies,
} from '../../../types/interfaces';
import { retrieveFeatureDependenciesByMap } from '../mapApiRequests';
interface AllClimbsProps {
  closeModalCallBack: (trigger: boolean) => void;
  mapId: number;
}
const AllClimbsModal: React.FC<AllClimbsProps> = ({
  closeModalCallBack,
  mapId,
}) => {
  const [climbsOnMap, setClimbsOnMap] = useState<ClimbWithDependencies[]>([]);

  useEffect(() => {
    const getClimbsWithDependencies = async () => {
      const results = await retrieveFeatureDependenciesByMap(mapId);
      console.log(results)
      setClimbsOnMap(results);
    };
    getClimbsWithDependencies();
  }, [mapId]);

  return (
    <ClimbModal
      clickedFeatureClimbs={climbsOnMap}
      closeModalCallBack={closeModalCallBack}
      mapId={mapId}
    />
  );
};
export default AllClimbsModal;
