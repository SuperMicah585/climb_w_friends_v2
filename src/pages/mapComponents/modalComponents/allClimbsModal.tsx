import ClimbModal from './climbModal';
import { testData } from '../mapObjects';
import { useEffect, useState } from 'react';
import { GeoJsonFeature } from '../../../types/interfaces';
interface AllClimbsProps {
  closeModalCallBack: (trigger: boolean) => void;
}
const AllClimbsModal: React.FC<AllClimbsProps> = ({ closeModalCallBack }) => {
  const [climbsOnMap, setClimbsOnMap] = useState<GeoJsonFeature[] | []>([]);

  useEffect(() => {
    const arrayOfClimbs: GeoJsonFeature[] = [];
    testData.features.forEach((feature) => {
      feature.properties.climbs.forEach((climb) => {
        arrayOfClimbs.push(climb);
      });
    });

    setClimbsOnMap(arrayOfClimbs);
  }, [testData]);

  return (
    <ClimbModal
      clickedFeatureClimbs={climbsOnMap}
      closeModalCallBack={closeModalCallBack}
    />
  );
};
export default AllClimbsModal;
