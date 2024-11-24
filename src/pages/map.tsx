// Import Mapbox GL, and CSS
import { useState, useEffect, useRef, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import Search from './mapComponents/search';
import ActivityFeed from './mapComponents/activityFeed';
import ClimbModal from './mapComponents/climbModal';
import MapNavBar from './mapComponents/mapNavBar';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ClimbsTableResponse, GeoJsonFeature, Tags } from '../types/interfaces';
import TagModal from './mapComponents/modalComponents/modalTag';
import FilterModal from './mapComponents/modalComponents/filterModal';
import TagOverlay from './mapComponents/modalComponents/tagOverlay';
import AllClimbsModal from './mapComponents/allClimbsModal';

import { exampleMapObjects } from './homeComponents/homeObjects';
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
  const [displayTagOverlay, setDisplayTagOverlay] = useState<boolean>(false);
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

  const [tags, setTags] = useState<Tags[]>([{ id: 0, tag: '' }]);
  const [
    clickedFeatureModalTriggerBoolean,
    setClickedFeatureModalTriggerBoolean,
  ] = useState<boolean>(false);

  const [tagModalDisplay, setTagModalDisplay] = useState<boolean>(false);
  const [filterModalDisplay, setFilterModalDisplay] = useState<boolean>(false);
  const [allClimbsModalDisplay, setAllClimbsModalDisplay] =
    useState<boolean>(false);
  const [feedToggle, setFeedToggle] = useState<boolean>(false);

  const feedToggleCallBack = () => {
    setFeedToggle((prev) => !prev);
  };

  const allClimbsCallBack = () => {
    setAllClimbsModalDisplay((prev) => !prev);
  };

  const newTagCallBack = (data: Tags) => {
    setTags((prev) => {
      // Check if the tag already exists in the array
      const tagExists = prev.some((tagObj) => tagObj.tag === data.tag);

      // If it doesn't exist, add it to the array, otherwise return the existing array
      if (!tagExists && data.tag.length > 0) {
        return [...prev, data];
      }
      return prev;
    });
  };

  const tagToggleCallBack = () => {
    setTagModalDisplay(true);
  };

  const filterToggleCallBack = () => {
    setFilterModalDisplay(true);
  };

  const selectedClimbCallBack = (climbData: ClimbsTableResponse) => {
    setSelectedClimb(climbData);
  };

  const closeModalCallBack = (trigger: boolean) => {
    setClickedFeatureClimbs([]);
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

  const clickedFeatureClimbCallBack: (climbData: GeoJsonFeature[]) => void = (
    climbData,
  ) => {
    setClickedFeatureClimbs((prev) => [...prev, ...climbData]);
  };

  const deleteTagCallBack = (item) => {
    setTags((prev) => prev.filter((tagObj) => tagObj.id !== item.id));
  };

  useEffect(() => {
    setTags(exampleMapObjects[0].tags);
  }, [exampleMapObjects]);

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

      {tagModalDisplay ? (
        <TagModal
          deleteTagCallBack={deleteTagCallBack}
          newTagCallBack={newTagCallBack}
          tags={tags}
          closeTagModalCallBack={closeTagModalCallBack}
        />
      ) : null}

      {filterModalDisplay ? (
        <FilterModal
          tagsOnMap={tags}
          closeTagModalCallBack={closeFilterModalCallBack}
        />
      ) : null}
      {allClimbsModalDisplay ? (
        <AllClimbsModal closeModalCallBack={closeAllClimbsModalCallBack} />
      ) : null}

      {displayTagOverlay ? <TagOverlay /> : null}

      <div className="h-screen w-screen" ref={mapContainer} />
    </>
  );
};

export default Map;
