// Import React, Mapbox GL, and CSS
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_KEY;

const Map = () => {
  const mapContainer = useRef(null);
  
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current, // Container for the map
      style: 'mapbox://styles/mapbox/outdoors-v12', // Mapbox style
      center: [-74.5, 40], // Starting position [lng, lat]
      zoom: 9, // Starting zoom level
      projection: 'globe' // Enable the globe projection
    });
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
    return () => map.remove(); // Clean up on unmount
  }, []);

  return (
    <div
     className = 'w-screen h-screen'
      ref={mapContainer}
    />
  );
};

export default Map;
