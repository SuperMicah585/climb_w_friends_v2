// Import Mapbox GL, and CSS
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Search from './mapComponents/search';
import ActivityFeed from './mapComponents/activityFeed';
import ClimbModal from './mapComponents/modalComponents/climbModal';
import MapNavBar from './mapComponents/mapNavBar';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  ClimbsTableResponse,
  GeoJsonObject,
  filterObject,
} from '../types/interfaces';
import TagModal from './mapComponents/modalComponents/modalTag';
import FilterModal from './mapComponents/modalComponents/filterModal';
import TagOverlay from './mapComponents/modalComponents/tagOverlay';
import AllClimbsModal from './mapComponents/modalComponents/allClimbsModal';
import AddClimbModal from './mapComponents/modalComponents/addClimbModal';
import { useAuth0 } from '@auth0/auth0-react';
import { usStateDictionary } from './mapComponents/mapObjects';
import { useParams } from 'react-router-dom';
import LogoutButton from '../reusableComponents/logoutButton';
import {
  createMarker,
  createClimbingShapes,
  updateLayerVisibility,
  displayLayersInitial,
  //shapeColors,
} from './mapComponents/mapLayers';
import {
  retrieveFeatures,
  AddUserFilter,
} from './mapComponents/mapApiRequests';
// Set Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_KEY;

type MapProps = {
  zoomLevel: number;
};

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
  const [filtersOnMap, setFiltersOnMap] = useState<filterObject>({
    users: [],
    tags: [],
    gradeRange: { gradeStart: '', gradeEnd: '', type: 'None' },
  });
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

  const [searchToggle, setSearchToggle] = useState(true);

  const [stateDropDownName, setStateDropDownName] = useState<string>('WA');

  const [renderFeatureTrigger, setRenderFeatureTrigger] = useState<number>(0);

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

  const closeAddClimbsModalCallBack = async (trigger: boolean) => {
    setAddClimbsModalDisplay(trigger);
  };

  const tagToggleCallBack = () => {
    setTagModalDisplay(true);
  };

  const filterToggleCallBack = () => {
    setFilterModalDisplay(true);
  };

  const closeModalCallBack = async (trigger: boolean) => {
    setClickedFeatureClimbs(-1);
    setClickedFeatureModalTriggerBoolean(trigger);
    if (!trigger) {
      clearCustomLayers();

      const features = await retrieveFeatures(mapIdNumber);

      displayLayersInitial(map, clickedFeatureClimbCallBack, features);
      if (mapLoaded && 'type' in geoJsonObject) {
        updateLayerVisibility(map, geoJsonObject);
        setGeoJsonObject(features);
      }
    }
  };

  const closeFilterModalCallBack = (trigger: boolean) => {
    setFilterModalDisplay(trigger);
  };

  const closeTagModalCallBack = (trigger: boolean) => {
    setTagModalDisplay(trigger);
  };

  const closeAllClimbsModalCallBack = async (trigger: boolean) => {
    setAllClimbsModalDisplay(trigger);
    if (!trigger) {
      clearCustomLayers();

      const features = await retrieveFeatures(mapIdNumber);

      displayLayersInitial(map, clickedFeatureClimbCallBack, features);
      if (mapLoaded && 'type' in geoJsonObject) {
        updateLayerVisibility(map, geoJsonObject);
      }
    }
  };

  const clickedFeatureClimbCallBack = (featureId: number) => {
    setClickedFeatureClimbs(featureId);
  };

  function clearCustomLayers() {
    if (!map?.current) return;

    try {
      const style = map.current.getStyle();
      if (!style?.layers || !style?.sources) return;

      // Create a copy of layers array since we'll be modifying it during iteration
      const layers = [...style.layers];

      // Remove all custom layers first
      layers.forEach((layer) => {
        if (layer.id.startsWith('geojson') && map.current?.getLayer(layer.id)) {
          try {
            // Remove event listeners before removing the layer

            map.current._listeners.click = [];
            map.current._listeners.mousemove = [];
            map.current._listeners.mouseout = [];

            map.current.removeLayer(layer.id);
          } catch (error) {
            console.error(`Error removing layer ${layer.id}:`, error);
          }
        }
      });

      // Remove all custom sources
      Object.keys(style.sources).forEach((sourceId) => {
        if (sourceId.startsWith('geojson')) {
          try {
            // Double check if source still exists before removal
            if (map.current?.getSource(sourceId)) {
              map.current.removeSource(sourceId);
            }
          } catch (error) {
            console.error(`Error removing source ${sourceId}:`, error);
          }
        }
      });
    } catch (error) {
      console.error('Error in clearCustomLayers:', error);
    }
  }

  useEffect(() => {
    if (renderFeatureTrigger > 0) {
      clearCustomLayers();
      const renderFeatures = async () => {
        const features = await retrieveFeatures(mapIdNumber);
        displayLayersInitial(map, clickedFeatureClimbCallBack, features);
        setGeoJsonObject(features);
      };

      renderFeatures();
    }
  }, [renderFeatureTrigger]);

  //const layers = map.current?.getStyle().layers;
  //console.log(layers)
  useEffect(() => {
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

  useEffect(() => {
    if (selectedClimb && map?.current) {
      if (currentMarker) {
        currentMarker.remove();
      }

      const newMarker = createMarker(
        selectedClimb.areaLatitude,
        selectedClimb.areaLongitude,
        selectedClimb.climbName,
        selectedClimb.location,
        selectedClimb.rating,
        map.current,
      );

      setCurrentMarker(newMarker);
    }
  }, [selectedClimb]);

  useEffect(() => {
    if (mapLoaded && 'type' in geoJsonObject) {
      updateLayerVisibility(map, geoJsonObject);
    }
  }, [polygonOrCircleDisplay, mapLoaded, geoJsonObject]);

  useEffect(() => {
    // setClickedFeatureModalTrigger(prev=>prev+1)
    if (clickedFeatureClimbs >= 0) {
      setClickedFeatureModalTriggerBoolean(true);
    }
  }, [clickedFeatureClimbs]);

  return (
    <div className="absolute">
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
        <div className="flex w-full items-center justify-start">
          <div className="z-10 flex-grow">
            {' '}
            <Search
              searchToggle={searchToggle}
              setSearchToggle={setSearchToggle}
              stateDropDownName={stateDropDownName}
              climbTypeDropDownValue={climbTypeDropDownValue}
              stateDropDownNameCallBack={stateDropDownNameCallBack}
              climbTypeDropDownValueCallBack={climbTypeDropDownValueCallBack}
              closeAddClimbsModalCallBack={closeAddClimbsModalCallBack}
              map={map.current}
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
          auth0Id={user?.sub || ''}
        />
      ) : null}

      {tagModalDisplay ? (
        <TagModal mapId={mapIdNumber} closelCallBack={closeTagModalCallBack} />
      ) : null}

      {filterModalDisplay ? (
        <FilterModal
          mapId={mapIdNumber}
          setFiltersOnMap={setFiltersOnMap}
          closeTagModalCallBack={closeFilterModalCallBack}
          filtersOnMap={filtersOnMap}
        />
      ) : null}

      {addClimbsModalDisplay ? (
        <AddClimbModal
          routeType={climbTypeDropDownValue}
          location={usStateDictionary[stateDropDownName]}
          closeAddClimbsModalCallBack={closeAddClimbsModalCallBack}
          mapId={mapIdNumber}
          setRenderFeatureTrigger={setRenderFeatureTrigger}
          AllClimbsOnMap={geoJsonObject}
          auth0Id={user?.sub || ''}
        />
      ) : null}

      {allClimbsModalDisplay ? (
        <AllClimbsModal
          mapId={mapIdNumber}
          climbsObject={geoJsonObject}
          closeModalCallBack={closeAllClimbsModalCallBack}
          auth0Id={user?.sub || ''}
        />
      ) : null}

      {displayTagOverlay ? <TagOverlay /> : null}

      <div className="h-screen w-screen" ref={mapContainer} />
    </div>
  );
};

export default Map;
