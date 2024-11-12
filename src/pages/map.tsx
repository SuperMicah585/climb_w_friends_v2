// Import Mapbox GL, and CSS
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Search from './mapComponents/search';
import ActivityFeed from './mapComponents/activityFeed';
import ClimbModal from './mapComponents/climbModal';
import MapNavBar from './mapComponents/mapNavBar';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ClimbsTableResponse, GeoJsonFeature,Tags } from '../types/interfaces';
import TagModal from './mapComponents/modalComponents/modalTag'
import {tagsObject} from './mapComponents/mapObjects'
import {
  createMarker,
  createClimbingShapes,
  updateLayerVisibility,
  shapeColors,
} from './mapComponents/mapLayers';
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

  const [tags,setTags] = useState<Tags[]>([{id:0,tag:''}])
  const [
    clickedFeatureModalTriggerBoolean,
    setClickedFeatureModalTriggerBoolean,
  ] = useState<boolean>(false);

  const [
    tagModalDisplay,
    setTagModalDisplay,
  ] = useState<boolean>(false);

  
  const [feedToggle, setFeedToggle] = useState<boolean>(false);
  const [tagToggle, setTagToggle] = useState<boolean>(false);

  const feedToggleCallBack = () =>{

    setFeedToggle(prev=>!prev)
  }

  const newTagCallBack = (data:Tags) =>{

    setTags(prev=>[...prev,data])

  }

  const tagToggleCallBack = () =>{

    setTagModalDisplay(true)
  }

  const selectedClimbCallBack = (climbData: ClimbsTableResponse) => {
    setSelectedClimb(climbData);
  };

  const closeModalCallBack = (trigger: boolean) => {
    setClickedFeatureClimbs([]);
    setClickedFeatureModalTriggerBoolean(trigger);
  };

  const closeTagModalCallBack = (trigger:boolean) =>{
    setTagModalDisplay(trigger);
  }

  const clickedFeatureClimbCallBack: (climbData: GeoJsonFeature[]) => void = (
    climbData,
  ) => {
    setClickedFeatureClimbs((prev) => [...prev, ...climbData]);
  };


  useEffect(()=>{

    setTags(tagsObject)

  },[tagsObject])

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


  console.log(tagModalDisplay,'sdfsd')

  return (
    <>
      <MapNavBar feedToggle={feedToggle} tagToggle={tagModalDisplay} feedToggleCallBack={feedToggleCallBack} tagToggleCallBack={tagToggleCallBack}>
        <div className="flex w-full items-center justify-start gap-5">
          <div className="z-10 max-w-96 flex-grow">
            {' '}
            <Search selectedClimbCallBack={selectedClimbCallBack} />{' '}
          </div>

        </div>
      </MapNavBar>
      <ActivityFeed feedToggle={feedToggle} />
      {clickedFeatureModalTriggerBoolean ? (
        <ClimbModal
          closeModalCallBack={closeModalCallBack}
          clickedFeatureClimbs={clickedFeatureClimbs}
        />
      ) : null}

      {tagModalDisplay?

        <TagModal newTagCallBack ={newTagCallBack} tags = {tags} closeTagModalCallBack = {closeTagModalCallBack}/>:null
      }
      <div className="h-screen w-screen" ref={mapContainer} />
    </>
  );
};

export default Map;
