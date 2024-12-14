import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import {
  ClimbsTableResponse,
  GeoJsonFeature,
  GeoJsonObject,
} from '../../types/interfaces';

export const createMarker = (
  lat: number,
  lng: number,
  name: string,
  map: any,
) => {
  const popup = new mapboxgl.Popup()
    .setLngLat([lng, lat])
    .setHTML(
      `

    <div class="text-md font-semibold text-black p-2 mr-5">${name}</div>

`,
    )
    .addTo(map);

  const popupContent = popup
    .getElement()
    ?.querySelector('.mapboxgl-popup-content');

  if (popupContent instanceof HTMLElement) {
    popupContent.style.backgroundColor = 'white'; // Tailwind "yellow-200"
    popupContent.style.color = '#374151'; // Tailwind "gray-700"
    popupContent.style.borderRadius = '8px';
    popupContent.style.padding = '15px';
  }

  const closeButton = popup
    .getElement()
    ?.querySelector('.mapboxgl-popup-close-button');
  if (closeButton instanceof HTMLElement) {
    closeButton.style.color = 'black';
  }

  const marker = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .setPopup(popup)
    .addTo(map);

  map.flyTo({ center: [lng, lat], zoom: 13 });
  marker.togglePopup();

  return marker;
};

export const createClimbingShapes = (
  map: any,
  clickedFeatureClimbCallBack: (climbData: GeoJsonFeature[]) => void,
  features: GeoJsonObject,
) => {
  map.current?.on('load', () => {
    displayLayersInitial(map, clickedFeatureClimbCallBack, features);
  });
};

const displayLayersInitial = (
  map: any,
  clickedFeatureClimbCallBack: (climbData: GeoJsonFeature[]) => void,
  features: GeoJsonObject,
) => {
  // Only add the source once
  if (!map.current?.getSource('geojson-data')) {
    map.current?.addSource('geojson-data', {
      type: 'geojson',
      data: features, // Your GeoJSON data
    });
  }

  console.log(features, 'features');

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
                  properties: {
                    climbs: feature.properties.climbs,
                  },
                },
              ],
            },
          },
          filter: ['==', '$type', 'Point'],
          paint: {
            'circle-color': 'blue',
            'circle-radius': 6,
            'circle-opacity': 0.5,
          },
        });
        addClickToFeature(map, layerId, clickedFeatureClimbCallBack);
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
        addClickToFeature(map, layerId, clickedFeatureClimbCallBack);
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
        addClickToFeature(map, fillLayerId, clickedFeatureClimbCallBack);
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
            'circle-color': 'blue',
            'circle-radius': 14,
            'circle-opacity': 0.5,
          },
          layout: {
            visibility: 'visible', // Initially visible
          },
        });
        addClickToFeature(map, circleLayerId, clickedFeatureClimbCallBack);
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
const addClickToFeature = (
  map: any,
  id: string,
  clickedFeatureClimbCallBack: (climbData: GeoJsonFeature[]) => void,
) => {
  // Ensure map and map.current are defined
  if (!map?.current) return;

  map.current.on('click', id, (event: mapboxgl.MapLayerMouseEvent) => {
    if (event.features && event.features[0]?.layer?.id === id) {
      const properties = event.features[0].properties?.climbs;
      if (properties) {
        try {
          const climbs = JSON.parse(properties);
          clickedFeatureClimbCallBack(climbs);
        } catch (error) {
          console.error('Error parsing climbs property:', error);
        }
      }
    }
  });
};
