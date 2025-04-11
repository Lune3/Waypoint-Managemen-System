import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Map, Marker, LngLatLike, GeoJSONSource } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import { Waypoint } from '../types/waypoint';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
if (!MAPBOX_TOKEN) {
  console.error("Mapbox token is not set! Please set VITE_MAPBOX_TOKEN in your .env file.");
} else {
  mapboxgl.accessToken = MAPBOX_TOKEN;
}

interface MapComponentProps {
  waypoints: Waypoint[];
  pathCoordinates: number[][];
  onMapClick: (lngLat: LngLatLike) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  waypoints,
  pathCoordinates,
  onMapClick,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current || !MAPBOX_TOKEN) return; 

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [-100, 80], 
      zoom: 9, 
    });

    const map = mapRef.current;

    map.on('load', () => {
        map.addSource('route', {
            type: 'geojson',
            data: {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: []
                }
            }
        });

        map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#888',
                'line-width': 4,
                 'line-opacity': 0.8
            }
        });
      setIsMapLoaded(true); 
    });

    map.on('click', (e) => {
      onMapClick(e.lngLat);
    });

    return () => {
      map.remove();
      mapRef.current = null;
      setIsMapLoaded(false);
    };
  }, [onMapClick]); 
  useEffect(() => {
    if (!mapRef.current || !isMapLoaded) return;

    const map = mapRef.current;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    waypoints.forEach((wp, index) => {
      const marker = new mapboxgl.Marker({ draggable: false, color: '#3FB1CE' }) 
        .setLngLat([wp.lng, wp.lat])
        .setPopup(new mapboxgl.Popup().setText(`WP ${index + 1}: Alt ${wp.alt}m`))
        .addTo(map);
      markersRef.current.push(marker);
    });

    const routeSource = map.getSource('route') as GeoJSONSource | undefined;
     if (routeSource) {
        routeSource.setData({
             type: 'Feature',
             properties: {},
             geometry: {
                 type: 'LineString',
                 coordinates: pathCoordinates
             }
         });
     }

  }, [waypoints, pathCoordinates, isMapLoaded]);

  return (
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default MapComponent;