// Import Mapbox GL, and CSS
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Search from './mapComponents/search';
import ActivityFeed from './mapComponents/activityFeed';
import ClimbModal from './mapComponents/climbModal';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ClimbsTableResponse, GeoJsonFeature } from '../types/interfaces';
import {
  createMarker,
  createClimbingShapes,
  updateLayerVisibility,
  shapeColors,
} from './mapComponents/mapLayers';
import { notificationSVG } from '../reusableComponents/styles';

// Set Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_KEY;

type MapProps = {
  zoomLevel: number;
};

const Map: React.FC<MapProps> = ({ zoomLevel }) => {
  const map = useRef<mapboxgl.Map>();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedClimb, setSelectedClimb] =
    useState<ClimbsTableResponse | null>(null);
  const [currentMarker, setCurrentMarker] = useState<any>(null);
  const [polygonOrCircleDisplay, setpolygonOrCircleDisplay] =
    useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [clickedFeatureClimbs, setClickedFeatureClimbs] = useState<
    GeoJsonFeature[]
  >([]);
  const [
    clickedFeatureModalTriggerBoolean,
    setClickedFeatureModalTriggerBoolean,
  ] = useState<boolean>(false);
  const [feedToggle, setFeedToggle] = useState<boolean>(false);

  const selectedClimbCallBack = (climbData: ClimbsTableResponse) => {
    setSelectedClimb(climbData);
  };

  const closeModalCallBack = (trigger: boolean) => {
    setClickedFeatureClimbs([]);
    setClickedFeatureModalTriggerBoolean(trigger);
  };

  const clickedFeatureClimbCallBack: (climbData: GeoJsonFeature[]) => void = (
    climbData,
  ) => {
    setClickedFeatureClimbs((prev) => [...prev, ...climbData]);
  };

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

    createClimbingShapes(map, clickedFeatureClimbCallBack);
    map.current?.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
    return () => map.current?.remove(); // Clean up on unmount
  }, []);

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
    if (mapLoaded) {
      console.log('inside');
      shapeColors(map, 2);
    }
  }, [mapLoaded]);

  useEffect(() => {
    if (selectedClimb && map?.current) {
      if (currentMarker) {
        currentMarker.remove();
      }

      const newMarker = createMarker(
        selectedClimb['Area Latitude'],
        selectedClimb['Area Longitude'],
        selectedClimb.Route,
        map.current,
      );

      setCurrentMarker(newMarker);
    }
  }, [selectedClimb]);

  useEffect(() => {
    if (mapLoaded) {
      updateLayerVisibility(map, polygonOrCircleDisplay);
    }
  }, [polygonOrCircleDisplay, mapLoaded]);

  useEffect(() => {
    // setClickedFeatureModalTrigger(prev=>prev+1)
    if (clickedFeatureClimbs.length > 0) {
      setClickedFeatureModalTriggerBoolean(true);
    }
  }, [clickedFeatureClimbs]);

  return (
    <>
      <div className="absolute left-5 top-5 flex w-full items-center justify-start gap-5">
        <div className="z-10 max-w-96 flex-grow">
          {' '}
          <Search selectedClimbCallBack={selectedClimbCallBack} />{' '}
        </div>
        <div
          onClick={() => setFeedToggle((prev) => !prev)}
          className={`cursor-pointer ${feedToggle ? 'border-violet-500 fill-violet-500 text-violet-500' : 'border-slate-500 fill-none'} z-10 rounded-full border border-slate-500 bg-slate-900 p-2 opacity-90 hover:border-violet-500 hover:text-violet-500`}
        >
          {' '}
          {notificationSVG}{' '}
        </div>{' '}
      </div>

      <ActivityFeed feedToggle={feedToggle} />
      {clickedFeatureModalTriggerBoolean ? (
        <ClimbModal
          closeModalCallBack={closeModalCallBack}
          clickedFeatureClimbs={clickedFeatureClimbs}
        />
      ) : null}
      <div className="h-screen w-screen" ref={mapContainer} />
    </>
  );
};

export default Map;
