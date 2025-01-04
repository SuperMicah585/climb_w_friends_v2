import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import * as ReactDOM from 'react-dom/client';
import './popup.css';
import { useAuth0 } from '@auth0/auth0-react';
import {
  sortByGradeDesc,
  compareGrades,
  groupByGrade,
} from './gradeComparison';
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
  auth0Id:string
) => {
  map.current?.on('load', () => {
    displayLayersInitial(map, clickedFeatureClimbCallBack, features,auth0Id);
  });
};

export const displayLayersInitial = (
  map: any,
  clickedFeatureClimbCallBack: (featureId: number) => void,
  features: GeoJsonObject,
  auth0Id:string,
) => {
  // Only add the source once
  if (!map?.current?.getSource('geojson-data')) {
    map.current?.addSource('geojson-data', {
      type: 'geojson',
      data: features, // Your GeoJSON data
    });
  }

  features.features.forEach((feature, index) => {
    const fillLayerId = `geojson-fill-layer-${feature.id}`;
    const circleLayerId = `geojson-circle-layer-${feature.id}`;
    const layerId = `geojson-layer-${feature.id}`;

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
                    coordinates: feature.geometry.coordinates[0],
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
            'circle-opacity': 0.5,
            'circle-stroke-width': 0.5,
            'circle-stroke-color': '#0047AB',
          },
        });
        addFeatureInteractions(map, layerId, auth0Id, clickedFeatureClimbCallBack, 12);
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
                  id: feature.id,
                  properties: {
                    climbs: feature.properties.climbs,
                  },
                },
              ],
            },
          },
          filter: ['==', '$type', 'Polygon'],
          paint: {
            'fill-color': 'brown',
            'fill-opacity': 0.5,
            'circle-stroke-width': 0.5,
            'circle-stroke-color': 'brown',
          },
          layout: {
            visibility: 'none',
          },
        });

        addFeatureInteractions(
          map,
          fillLayerId,
          auth0Id,
          clickedFeatureClimbCallBack,
          0,
        );
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
                  id: feature.id,
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
            'circle-stroke-width': 0.5,
            'circle-stroke-color': 'brown',
          },
          layout: {
            visibility: 'visible', // Initially visible
          },
        });
        addFeatureInteractions(
          map,
          circleLayerId,
          auth0Id,
          clickedFeatureClimbCallBack,
          14,
        );
        break;

      default:
        console.warn(`Unsupported GeoJSON type: ${feature.geometry.type}`);
    }
  });
};

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
  geoJsonObject: GeoJsonObject,
) => {
  geoJsonObject.features.forEach((feature, index) => {
    if (feature.geometry.type === 'Polygon') {
      const fillLayerId = `geojson-fill-layer-${feature.id}`;
      const circleLayerId = `geojson-circle-layer-${feature.id}`;
      const currentZoom = map.current.getZoom();

      if (currentZoom > 12) {
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
//save all ID's within a set. When layers are refreshed loop through layers and unmount aech id within the set.

export const addFeatureInteractions = async (
  map: any,
  id: string,
  auth0Id:string,
  clickedFeatureClimbCallBack: (featureId: number) => void,
  radius: number,
) => {
  // Ensure map and map.current are defined

  if (!map?.current) return;

  //console.log(map.current._listeners,"hi");

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 10,
  });

  let currentFeatureId: number | null = null;
  let currentRoot: ReactDOM.Root | null = null;

  const cleanupChart = () => {
    if (currentRoot) {
      try {
        // Check if the container still exists before unmounting
        const containerId = `chart-container-${currentFeatureId}`;
        const container = document.getElementById(containerId);

        if (container) {
          currentRoot.unmount();
        }
      } catch (error) {
        console.warn('Error unmounting chart:', error);
      } finally {
        currentRoot = null;
      }
    }
  };

  map.current.on('mouseenter', id, (e: mapboxgl.MapMouseEvent) => {
    if (radius > 0) {
      map.current?.setPaintProperty(id, 'circle-radius', radius * 1.2);
    }

    const features = e.features ? e.features[0] : null;

    if (features && features.id !== undefined) {
      const featureId = features.id as number;

      // If we're already displaying this feature's popup, do nothing
      if (currentFeatureId === featureId) return;

      // Clean up existing chart and popup
      cleanupChart();
      popup.remove();

      // Set current feature ID
      currentFeatureId = featureId;

      map.current.getCanvas().style.cursor = 'pointer';

      (async () => {
        try {
          const popUpData = await retrieveFeatureAggregate(featureId,auth0Id);

          // Check if the feature ID is still the same (prevent stale data)
          if (currentFeatureId !== featureId) return;

          const chartContainerId = `chart-container-${featureId}`;

          popup
            .setLngLat(e.lngLat)
            .setHTML(
              `<div class='flex flex-col gap-5 items-center justify-center z-50'>
              <div class="flex w-full items-start gap-5 font-bold">
                <div class="flex flex-col gap-2 w-1/2 text-center rounded-md bg-customGray p-2 text-white">
                  <div class="text-neutral-200 font-thin"> CLIMBERS </div>
                  <div class="text-xl">${popUpData.uniqueUserCount}</div>
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

          // Wait for the next tick to ensure the container is in the DOM
          setTimeout(() => {
            const chartContainer = document.getElementById(chartContainerId);

            if (chartContainer && currentFeatureId === featureId) {
              // Only create a new root if we don't have one
              if (!currentRoot) {
                currentRoot = ReactDOM.createRoot(chartContainer);
              }

              var sortedGradeArray = popUpData.gradeCounts.sort(
                (a: any, b: any) => {
                  return compareGrades(a.rating, b.rating);
                },
              );

              if (sortedGradeArray.length > 3) {
                sortedGradeArray = groupByGrade(sortedGradeArray);
              }

              // Always use render() to update the content
              currentRoot.render(
                <BarChart
                  width={225}
                  height={120}
                  data={sortedGradeArray}
                  margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
                >
                  <CartesianGrid stroke="white" strokeDasharray="3 3" />
                  <XAxis stroke="white" dataKey="rating" />
                  <YAxis stroke="white" />
                  <Bar
                    dataKey="count"
                    fill="#8b5cf6"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                </BarChart>,
              );
            }
          }, 0);
        } catch (error) {
          console.error('Error processing feature:', error);
          currentFeatureId = null;
          cleanupChart();
        }
      })();
    }
  });

  map.current.on('mouseleave', id, () => {
    if (radius > 0) {
      map.current?.setPaintProperty(id, 'circle-radius', radius);
    }
    cleanupChart();
    popup.remove();
    currentFeatureId = null;
    map.current.getCanvas().style.cursor = '';
  });

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

  // Return a cleanup function
  return () => {
    if (map.current) {
      map.current.off('mouseenter', id);
      map.current.off('mouseleave', id);
      map.current.off('click', id);
      cleanupChart();
      popup.remove();
    }
  };
};
