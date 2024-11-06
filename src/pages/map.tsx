// Import Mapbox GL, and CSS
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Search from './mapComponents/search'
import ActivityFeed from './mapComponents/activityFeed';
import ClimbModal from './mapComponents/climbModal'
import 'mapbox-gl/dist/mapbox-gl.css';
import {ClimbsTableResponse,GeoJsonFeature} from '../types/interfaces'
import {createMarker,createClimbingShapes,updateLayerVisibility} from './mapComponents/mapLayers'
import { notificationSVG } from './mapComponents/mapStyles';

// Set Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_KEY;

type MapProps = {
  zoomLevel: number;
};

const Map: React.FC<MapProps> = ({zoomLevel}) => {
  const map = useRef<mapboxgl.Map>();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedClimb,setSelectedClimb] = useState<ClimbsTableResponse | null>(null)
  const [currentMarker,setCurrentMarker] = useState<any>(null)
  const [polygonOrCircleDisplay, setpolygonOrCircleDisplay] = useState<boolean>(false)
  const [mapLoaded, setMapLoaded] = useState(false);
  const [clickedFeatureClimbs,setClickedFeatureClimbs] = useState<GeoJsonFeature[]>([])
  const [clickedFeatureModalTriggerBoolean,setClickedFeatureModalTriggerBoolean] = useState<boolean>(false)
  const [feedToggle,setFeedToggle] = useState<boolean>(false)

  const selectedClimbCallBack = (climbData:ClimbsTableResponse) =>{
    
    setSelectedClimb(climbData)
  }



  const closeModalCallBack = (trigger:boolean) =>{
    setClickedFeatureClimbs([])
    setClickedFeatureModalTriggerBoolean(trigger)
  }


  const clickedFeatureClimbCallBack: (climbData: GeoJsonFeature[]) => void = (climbData) => {

   
    setClickedFeatureClimbs(prev => [...prev, ...climbData]);

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

    map.current?.on("zoomend", () => {
      const currentZoom = map.current?.getZoom() ?? 2;
      if(currentZoom>12){
      setpolygonOrCircleDisplay(true);
      }
      else{
        setpolygonOrCircleDisplay(false);
      }
    });


    createClimbingShapes(map,clickedFeatureClimbCallBack)
    map.current?.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
    return () => map.current?.remove(); // Clean up on unmount
  }, []);


  useEffect(() => {
    if (map.current) {
      map.current.on("load", () => {
        setMapLoaded(true); // Map has finished loading
      });
    }
  }, [map]);


  useEffect(() => {

  
    if (selectedClimb && map?.current) {
      if (currentMarker) {
        currentMarker.remove();
      }
  

      const newMarker = createMarker(
        selectedClimb["Area Latitude"],
        selectedClimb["Area Longitude"],
        selectedClimb.Route,
        map.current
      );

      
  
      setCurrentMarker(newMarker);
    }
  }, [selectedClimb]);

useEffect(() => {

  if(mapLoaded){
  updateLayerVisibility(map,polygonOrCircleDisplay)
  }
},[polygonOrCircleDisplay,mapLoaded])
  

useEffect(()=>{

 // setClickedFeatureModalTrigger(prev=>prev+1)
  if(clickedFeatureClimbs.length>0){
  setClickedFeatureModalTriggerBoolean(true)
  }
},[clickedFeatureClimbs])




  

  return (
    <> 
  <div className = 'absolute top-5 left-5 flex items-center justify-center gap-5'> <Search selectedClimbCallBack = {selectedClimbCallBack} /> 
  <div onClick = {()=> setFeedToggle(prev=>!prev)} 
  className = {`cursor-pointer ${feedToggle?'text-violet-500 border-violet-500 fill-violet-500':'fill-none border-slate-500'} hover:text-violet-500 z-20 p-2 bg-slate-900 opacity-90 border border-slate-500 hover:border-violet-500 rounded-full`}> {notificationSVG} </div>   </div> 

  <ActivityFeed feedToggle = {feedToggle}/>
  {clickedFeatureModalTriggerBoolean?<ClimbModal closeModalCallBack = {closeModalCallBack} clickedFeatureClimbs={clickedFeatureClimbs}/>:null}
  <div className='w-screen h-screen' ref={mapContainer}/>
  

  
  </>
  
  )
  ;
};

export default Map;
