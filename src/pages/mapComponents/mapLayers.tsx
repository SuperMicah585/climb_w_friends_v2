import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import * as ReactDOM from 'react-dom/client';
import './popup.css';
import { retrieveFeatureAggregate } from './mapApiRequests';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { GeoJsonObject } from '../../types/interfaces';
let currentMarker: mapboxgl.Marker | null = null;

export const createMarker = (
  lat: number,
  lng: number,
  name: string,
  location: string,
  grade: string,
  map: any,
) => {
  if (currentMarker) {
    currentMarker.remove();
  }

  const popup = new mapboxgl.Popup({
    closeButton: false,
  })
    .setLngLat([lng, lat])
    .setHTML(
      `

    <div class="w-full bg-customGray rounded-lg flex items-center justify-center flex-col gap-2 text-md font-semibold text-white p-2 mr-5">
    
    <div class="flex max-h-12 gap-2 text-lg">
    <div class="overflow-hidden text-ellipsis whitespace-nowrap w-full max-w-[200px]">${name}</div>
    <div> | </div>
    <div>${grade} </div>
</div>
    <div class =  "font-thin opacity-75"> ${location}</div>
    </div>
`,
    )
    .addClassName('popupClass')
    .setMaxWidth('300px')
    .addTo(map);

  const marker = new mapboxgl.Marker({
    color: '#23272a',
  })
    .setLngLat([lng, lat])
    .setPopup(popup)
    .addTo(map);

  currentMarker = marker;

  map.flyTo({ center: [lng, lat], zoom: 13 });
  marker.togglePopup();

  return marker;
};

export const createClimbingShapes = (
  map: any,
  clickedFeatureClimbCallBack: (featureId: number) => void,
  features: GeoJsonObject,
) => {
  map.current?.on('load', () => {
    displayLayersInitial(map, clickedFeatureClimbCallBack, features);
  });
};

const displayLayersInitial = (
  map: any,
  clickedFeatureClimbCallBack: (featureId: number) => void,
  features: GeoJsonObject,
) => {
  // Only add the source once
  if (!map.current?.getSource('geojson-data')) {
    map.current?.addSource('geojson-data', {
      type: 'geojson',
      data: features, // Your GeoJSON data
    });
  }

  features.features.forEach((feature, index) => {
    const fillLayerId = `geojson-fill-layer-${index}`;
    const circleLayerId = `geojson-circle-layer-${index}`;
    const layerId = `geojson-layer-${index}`;

    switch (feature.geometry.type) {
      case 'Point':
        map.current?.addLayer({
          id: layerId,
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: feature.geometry.coordinates,
                    //need to add property features
                  },
                  id: feature.id,
                  properties: {
                    climbs: feature.properties.climbs,
                  },
                },
              ],
            },
          },
          filter: ['==', '$type', 'Point'],
          paint: {
            'circle-color': '#0047AB',
            'circle-radius': 12,
            'circle-opacity': 0.8,
          },
        });
        addFeatureInteractions(map, layerId, clickedFeatureClimbCallBack);
        break;

      case 'LineString':
        map.current?.addLayer({
          id: layerId,
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: feature.geometry.coordinates,
                    //need to add property features
                  },
                  properties: {
                    climbs: feature.properties.climbs,
                  },
                },
              ],
            },
          },

          filter: ['==', '$type', 'LineString'],
          paint: {
            'line-color': 'green',
            'line-width': 2,
          },
        });
        addFeatureInteractions(map, layerId, clickedFeatureClimbCallBack);
        break;

      case 'Polygon':
        // Fill layer for polygon
        map.current?.addLayer({
          id: fillLayerId,
          type: 'fill',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Polygon',
                    coordinates: feature.geometry.coordinates,
                    //need to add property features
                  },
                  properties: {
                    climbs: feature.properties.climbs,
                  },
                },
              ],
            },
          },
          filter: ['==', '$type', 'Polygon'],
          paint: {
            'fill-color': 'blue',
            'fill-opacity': 0.5,
          },
          layout: {
            visibility: 'none',
          },
        });

        /*
   export const updateClimbingFeature = (
  map: any,
  featureIndex: number,
  newCoordinates: any,
  newProperties: any
) => {
  const layerId = `geojson-layer-${featureIndex}`; // Ensure this matches the generated layer ID

  // Check if the layer exists before updating
  if (map.current?.getLayer(layerId)) {
    const newData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point', // Adjust this if updating other geometry types
            coordinates: newCoordinates,
          },
          properties: newProperties,
        },
      ],
    };

    // Set new data for the source of the specific layer
    map.current.getSource(layerId).setData(newData);
  }
};



        */
        addFeatureInteractions(map, fillLayerId, clickedFeatureClimbCallBack);
        // Circle layer for polygon (alternative representation)
        const centroid = turf.centroid(feature);
        const [longitude, latitude] = centroid.geometry.coordinates;

        // Circle layer for the centroid of the polygon
        map.current?.addLayer({
          id: circleLayerId,

          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  featureId: feature.featureId,
                  geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                    //need to add property features
                  },
                  properties: {
                    climbs: feature.properties.climbs,
                  },
                },
              ],
            },
          },
          paint: {
            'circle-color': 'brown',
            'circle-radius': 14,
            'circle-opacity': 0.8,
          },
          layout: {
            visibility: 'visible', // Initially visible
          },
        });
        addFeatureInteractions(map, circleLayerId, clickedFeatureClimbCallBack);
        break;

      default:
        console.warn(`Unsupported GeoJSON type: ${feature.geometry.type}`);
    }
  });
};

/*
const shapeColorHelperFunction = (
  climberCountTotal: number,
  climberonFeatureArray: GeoJsonFeature[],
) => {
  //could take a while
  const climberSet = new Set();
  for (const item of climberonFeatureArray) {
    for (const climber of item?.climber_names) {
      climberSet.add(climber);
    }
  }
  const climbersOnFeatureCount = climberSet.size;
  const percantageOfClimbersWithinShape =
    climbersOnFeatureCount / climberCountTotal;

  if (percantageOfClimbersWithinShape < 0.34) {
    return 'orange';
  }
  if (percantageOfClimbersWithinShape < 0.67) {
    return 'blue';
  }
  if (percantageOfClimbersWithinShape <= 1) {
    return 'purple';
  }
};
*/
export const filterClimbsOnMap = () => {};
/*
export const shapeColors = (map: any, climberCountTotal: number) => {
  testData.features.forEach((feature, index) => {
    switch (feature.geometry.type) {
      case 'Polygon':
        const fillLayerId = `geojson-fill-layer-${index}`;
        const circleLayerId = `geojson-circle-layer-${index}`;
        const Polygoncolor = shapeColorHelperFunction(
          climberCountTotal,
          feature.properties.climbs,
        );
        map.current?.setPaintProperty(fillLayerId, 'fill-color', Polygoncolor);
        map.current?.setPaintProperty(
          circleLayerId,
          'circle-color',
          Polygoncolor,
        );

        break;

      case 'Point':
        const pointLayerId = `geojson-layer-${index}`;
        const pointcolor = shapeColorHelperFunction(
          climberCountTotal,
          feature.properties.climbs,
        );
        map.current?.setPaintProperty(pointLayerId, 'circle-color', pointcolor);
        break;

      case 'LineString':
        const layerId = `geojson-layer-${index}`;
        const layercolor = shapeColorHelperFunction(
          climberCountTotal,
          feature.properties.climbs,
        );
        map.current?.setPaintProperty(layerId, 'line-color', layercolor);
        break;
    }
  });
};
*/
export const updateLayerVisibility = (
  map: any,
  displayBoolean: boolean,
  geoJsonObject: GeoJsonObject,
) => {
  geoJsonObject.features.forEach((feature, index) => {
    if (feature.geometry.type === 'Polygon') {
      const fillLayerId = `geojson-fill-layer-${index}`;
      const circleLayerId = `geojson-circle-layer-${index}`;

      if (displayBoolean) {
        // Show fill layer, hide circle layer
        map.current?.setLayoutProperty(fillLayerId, 'visibility', 'visible');
        map.current?.setLayoutProperty(circleLayerId, 'visibility', 'none');
      } else {
        // Show circle layer, hide fill layer
        map.current?.setLayoutProperty(fillLayerId, 'visibility', 'none');
        map.current?.setLayoutProperty(circleLayerId, 'visibility', 'visible');
      }
    }
  });
};

export const addFeatureInteractions = async (
  map: any,
  id: string,
  clickedFeatureClimbCallBack: (featureId: number) => void,
) => {
  // Ensure map and map.current are defined
  if (!map?.current) return;

  // Create a popup outside the event handlers so we can reuse it
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 10,
  });
  let popupInstance: mapboxgl.Popup | null = null;
  let chartRoot: ReactDOM.Root | null = null;
  let currentFeatureId: number | null = null;
  
  map.current.on('mouseenter', id, (e: mapboxgl.MapMouseEvent) => {
    const features = e.features ? e.features[0] : null;
  
    if (features && features.id !== undefined) {
      const featureId = features.id as number;
  
      // If we're already displaying this feature's popup, do nothing
      if (currentFeatureId === featureId) return;
  
      // Clear previous popup and chart
      if (popupInstance) {
        popupInstance.remove();
        popupInstance = null;
      }
  
      if (chartRoot) {
        try {
          chartRoot.unmount();
          chartRoot = null;
        } catch (error) {
          console.warn('Error unmounting previous chart:', error);
        }
      }
  
      // Set current feature ID to prevent duplicate processing
      currentFeatureId = featureId;
  
      map.current.getCanvas().style.cursor = 'pointer';
  
      (async () => {
        try {
          const popUpData = await retrieveFeatureAggregate(featureId);
  
          // Check if the feature ID is still the same (prevent stale data)
          if (currentFeatureId !== featureId) return;
  
          // Create a new popup instance
          popupInstance = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 10,
          });
  
          // Prepare a unique container for the chart
          const chartContainerId = `chart-container-${featureId}`;
  
          popupInstance
            .setLngLat(e.lngLat)
            .setHTML(
              `<div class='flex flex-col gap-5 items-center justify-center z-50'>
              <div class="flex w-full items-start gap-5 font-bold">
                <div class="flex flex-col gap-2 w-1/2 text-center rounded-md bg-customGray p-2 text-white">
                  <div class="text-neutral-200 font-thin"> CLIMBERS </div>
                  <div class="text-xl">5</div>
                </div>
  
                <div class="flex flex-col gap-2 w-1/2 text-center rounded-md bg-customGray p-2 text-white">
                  <div class="text-neutral-200 font-thin"> CLIMBS </div>
                  <div class="text-xl"> ${popUpData.totalCount} </div>
                </div>
              </div>
  
              <div class="gap-5 items-center pt-2 justify-center rounded-md bg-customGray pb-2 flex flex-col 2"> 
                <div class="text-white text-lg"> Climbs Per Grade </div>
                <div id="${chartContainerId}" class="w-[260px] h-28"></div>
              </div>
            </div>`,
            )
            .addClassName('popupClass')
            .setMaxWidth('280px')
            .addTo(map.current);
  
          // Safely render chart
          const chartContainer = document.getElementById(chartContainerId);
 
          if (chartContainer) {
            chartRoot = ReactDOM.createRoot(chartContainer);
            console.log(chartRoot)
            chartRoot.render(
              <BarChart
              width={225}
              height={120}
              data={popUpData.gradeCounts}
              margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
            >
              <CartesianGrid stroke="white" strokeDasharray="3 3" />
              <XAxis stroke="white" dataKey="rating" />
              <YAxis stroke="white" />
              <Bar
                dataKey="count"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
            );
          }
        } catch (error) {
          console.error('Error processing feature:', error);
          currentFeatureId = null;
        }
      })();
    }
  });
  
  // Add mouseleave event to reset
  map.current.on('mouseleave', id, () => {
    if (popupInstance) {
      popupInstance.remove();
      popupInstance = null;
    }
  
    if (chartRoot) {
      try {
        chartRoot.unmount();
        chartRoot = null;
      } catch (error) {
        console.warn('Error unmounting chart:', error);
      }
    }
  
    currentFeatureId = null;
    map.current.getCanvas().style.cursor = '';
  });
  // Onlick pass feature ID in get request to server. Server will then grab all climbs + dependency data for the climb and return to client
  map.current.on('click', id, (event: mapboxgl.MapLayerMouseEvent) => {
    const features = event.features ? event.features[0] : null;
    if (features && typeof features.id === 'number') {
      try {
        clickedFeatureClimbCallBack(features.id);
      } catch (error) {
        console.error('Error parsing climbs property:', error);
      }
    }
  });

  // Return a cleanup function to remove event listeners
  return () => {
    if (map.current) {
      map.current.off('mouseenter', id);
      map.current.off('mouseleave', id);
      map.current.off('click', id);
      popup.remove();
    }
  };
};
