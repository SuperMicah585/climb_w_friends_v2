import ClimbModal from './climbModal';
import { useEffect, useState } from 'react';
import { GeoJsonObject, GeoJsonFeature } from '../../../types/interfaces';
interface AllClimbsProps {
  closeModalCallBack: (trigger: boolean) => void;
  climbsObject: GeoJsonObject | {};
  mapId: number;
}
const AllClimbsModal: React.FC<AllClimbsProps> = ({
  closeModalCallBack,
  climbsObject,
  mapId,
}) => {
  const [climbsOnMap, setClimbsOnMap] = useState<number[] | []>([]);

  useEffect(() => {
    const arrayOfClimbs: number[] = [];
    console.log(climbsObject);
    if ('type' in climbsObject) {
      climbsObject.features.forEach((feature: GeoJsonFeature) => {
        feature.properties.climbs.forEach((climb) => {
          arrayOfClimbs.push(climb);
        });
      });

      setClimbsOnMap(arrayOfClimbs);
    }
  }, [climbsObject]);

  return (
    <ClimbModal
      clickedFeatureClimbs={climbsOnMap}
      closeModalCallBack={closeModalCallBack}
      mapId={mapId}
    />
  );
};
export default AllClimbsModal;
