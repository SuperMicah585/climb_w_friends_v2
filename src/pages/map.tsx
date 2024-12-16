// Import Mapbox GL, and CSS
import { useState, useEffect, useRef, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import Search from './mapComponents/search';
import ActivityFeed from './mapComponents/activityFeed';
import ClimbModal from './mapComponents/modalComponents/climbModal';
import MapNavBar from './mapComponents/mapNavBar';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  ClimbsTableResponse,
  GeoJsonFeature,
  Tags,
  GeoJsonObject,
} from '../types/interfaces';
import TagModal from './mapComponents/modalComponents/modalTag';
import FilterModal from './mapComponents/modalComponents/filterModal';
import TagOverlay from './mapComponents/modalComponents/tagOverlay';
import AllClimbsModal from './mapComponents/modalComponents/allClimbsModal';
import AddClimbModal from './mapComponents/modalComponents/addClimbModal';
import { useAuth0 } from '@auth0/auth0-react';
import { exampleMapObjects } from './dashboardComponents/dashboardObjects';
import { usStateDictionary } from './mapComponents/mapObjects';
import { useParams } from 'react-router-dom';
import LogoutButton from '../reusableComponents/logoutButton';
import {
  createMarker,
  createClimbingShapes,
  updateLayerVisibility,
  //shapeColors,
} from './mapComponents/mapLayers';
import { retrieveFeatures } from './mapComponents/mapApiRequests';
// Set Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_KEY;

type MapProps = {
  zoomLevel: number;
};
/*
notes:
Mess with dropdown position so that is does not get in the way
Clicking on check will trigger dropDown that will give following options

1) Quick Send
OR
2) Send with Additional information -> open an overlay similar to chat where user can add additional information related to send

*/

const Map: React.FC<MapProps> = ({ zoomLevel }) => {
  const map = useRef<mapboxgl.Map>();
  const [displayTagOverlay, setDisplayTagOverlay] = useState<boolean>(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedClimb, setSelectedClimb] =
    useState<ClimbsTableResponse | null>(null);
  const { id } = useParams();
  const mapIdNumber = Number(id);
  const [currentMarker, setCurrentMarker] = useState<any>(null);
  const [polygonOrCircleDisplay, setpolygonOrCircleDisplay] =
    useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [clickedFeatureClimbs, setClickedFeatureClimbs] = useState<number>(-1);

  const [addClimbsModalDisplay, setAddClimbsModalDisplay] = useState(false);
  const [geoJsonObject, setGeoJsonObject] = useState<GeoJsonObject | {}>({});
  const [
    clickedFeatureModalTriggerBoolean,
    setClickedFeatureModalTriggerBoolean,
  ] = useState<boolean>(false);

  const [tagModalDisplay, setTagModalDisplay] = useState<boolean>(false);
  const [filterModalDisplay, setFilterModalDisplay] = useState<boolean>(false);
  const [allClimbsModalDisplay, setAllClimbsModalDisplay] =
    useState<boolean>(false);
  const [feedToggle, setFeedToggle] = useState<boolean>(false);
  const [climbTypeDropDownValue, setclimbTypeDropDown] =
    useState<string>('Boulder');

  const [stateDropDownName, setStateDropDownName] = useState<string>('WA');

  const {
    getAccessTokenSilently,
    user,
    isAuthenticated,
    loginWithRedirect,
    isLoading,
  } = useAuth0();

  const climbTypeDropDownValueCallBack = (value: string) => {
    setclimbTypeDropDown(value);
  };

  const stateDropDownNameCallBack = (value: string) => {
    setStateDropDownName(value);
  };
  const feedToggleCallBack = () => {
    setFeedToggle((prev) => !prev);
  };

  const allClimbsCallBack = () => {
    setAllClimbsModalDisplay((prev) => !prev);
  };

  const closeAddClimbsModalCallBack = (trigger: boolean) => {
    setAddClimbsModalDisplay(trigger);
  };

  const tagToggleCallBack = () => {
    setTagModalDisplay(true);
  };

  const filterToggleCallBack = () => {
    setFilterModalDisplay(true);
  };

  const closeModalCallBack = (trigger: boolean) => {
    setClickedFeatureClimbs(-1);
    setClickedFeatureModalTriggerBoolean(trigger);
  };

  const closeFilterModalCallBack = (trigger: boolean) => {
    setFilterModalDisplay(trigger);
  };

  const closeTagModalCallBack = (trigger: boolean) => {
    setTagModalDisplay(trigger);
  };

  const closeAllClimbsModalCallBack = (trigger: boolean) => {
    setAllClimbsModalDisplay(trigger);
  };

  const clickedFeatureClimbCallBack = (featureId: number) => {
    setClickedFeatureClimbs(featureId);
  };

  useEffect(() => {
    console.log('inside');
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current, // Container for the map
        style: 'mapbox://styles/mapbox/outdoors-v12', // Mapbox style
        center: [-74.5, 40], // Starting position [lng, lat]
        zoom: zoomLevel, // Starting zoom level
        projection: 'globe', // Enable the globe projection
      });
    }

    map.current?.on('zoomend', () => {
      const currentZoom = map.current?.getZoom() ?? 2;
      if (currentZoom > 12) {
        setpolygonOrCircleDisplay(true);
      } else {
        setpolygonOrCircleDisplay(false);
      }
    });

    const renderFeatures = async () => {
      const features = await retrieveFeatures(mapIdNumber);
      createClimbingShapes(map, clickedFeatureClimbCallBack, features);
      setGeoJsonObject(features);
    };

    renderFeatures();
    map.current?.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
    return () => map.current?.remove(); // Clean up on unmount
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  useEffect(() => {
    const onLoadHandler = () => {
      setMapLoaded(true); // Map has finished loading
    };

    if (map.current) {
      map.current.on('load', onLoadHandler);
    }

    // Cleanup function to remove the "load" event listener
    return () => {
      if (map.current) {
        map.current.off('load', onLoadHandler);
      }
    };
  }, []); // Only run once on mount
  /*
  useEffect(() => {
    if (mapLoaded) {
      shapeColors(map, 2);
    }
  }, [mapLoaded]);
*/
  useEffect(() => {
    if (selectedClimb && map?.current) {
      if (currentMarker) {
        currentMarker.remove();
      }

      const newMarker = createMarker(
        selectedClimb.areaLatitude,
        selectedClimb.areaLongitude,
        selectedClimb.climbName,
        map.current,
      );

      setCurrentMarker(newMarker);
    }
  }, [selectedClimb]);

  useEffect(() => {
    if (mapLoaded && 'type' in geoJsonObject) {
      updateLayerVisibility(map, polygonOrCircleDisplay, geoJsonObject);
    }
  }, [polygonOrCircleDisplay, mapLoaded, geoJsonObject]);

  useEffect(() => {
    // setClickedFeatureModalTrigger(prev=>prev+1)
    if (clickedFeatureClimbs >= 0) {
      setClickedFeatureModalTriggerBoolean(true);
    }
  }, [clickedFeatureClimbs]);

  return (
    <>
      <MapNavBar
        allClimbsToggle={allClimbsModalDisplay}
        allClimbsCallBack={allClimbsCallBack}
        feedToggle={feedToggle}
        tagToggle={tagModalDisplay}
        filterModalDisplay={filterModalDisplay}
        filterToggleCallBack={filterToggleCallBack}
        feedToggleCallBack={feedToggleCallBack}
        tagToggleCallBack={tagToggleCallBack}
      >
        <div className="flex w-full items-center justify-start gap-5">
          <div className="z-10 max-w-96 flex-grow">
            {' '}
            <Search
              stateDropDownName={stateDropDownName}
              climbTypeDropDownValue={climbTypeDropDownValue}
              stateDropDownNameCallBack={stateDropDownNameCallBack}
              climbTypeDropDownValueCallBack={climbTypeDropDownValueCallBack}
              closeAddClimbsModalCallBack={closeAddClimbsModalCallBack}
            />{' '}
          </div>
        </div>
      </MapNavBar>
      <div className="absolute right-5 top-4 z-10">
        {' '}
        <LogoutButton />{' '}
      </div>
      <ActivityFeed feedToggle={feedToggle} />
      {clickedFeatureModalTriggerBoolean ? (
        <ClimbModal
          closeModalCallBack={closeModalCallBack}
          clickedFeatureClimbs={clickedFeatureClimbs}
          mapId={mapIdNumber}
        />
      ) : null}

      {tagModalDisplay ? (
        <TagModal mapId={mapIdNumber} closelCallBack={closeTagModalCallBack} />
      ) : null}

      {filterModalDisplay ? (
        <FilterModal
          mapId={mapIdNumber}
          closeTagModalCallBack={closeFilterModalCallBack}
        />
      ) : null}

      {addClimbsModalDisplay ? (
        <AddClimbModal
          routeType={climbTypeDropDownValue}
          location={usStateDictionary[stateDropDownName]}
          closeAddClimbsModalCallBack={closeAddClimbsModalCallBack}
          mapId={mapIdNumber}
        />
      ) : null}

      {allClimbsModalDisplay ? (
        <AllClimbsModal
          mapId={mapIdNumber}
          climbsObject={geoJsonObject}
          closeModalCallBack={closeAllClimbsModalCallBack}
        />
      ) : null}

      {displayTagOverlay ? <TagOverlay /> : null}

      <div className="h-screen w-screen" ref={mapContainer} />
    </>
  );
};

export default Map;
