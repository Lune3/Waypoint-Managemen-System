import { useState, useCallback, useMemo } from 'react';
import MapComponent from './components/MapComponent';
import WaypointList from './components/WaypointList';
import { Waypoint } from './types/waypoint';
import { LngLatLike } from 'mapbox-gl';
import './App.css'; 

function App() {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);

  const addWaypoint = useCallback((lngLat: LngLatLike) => {
    const newWaypoint: Waypoint = {
      id: crypto.randomUUID(), 
      lng: (lngLat as mapboxgl.LngLat).lng,
      lat: (lngLat as mapboxgl.LngLat).lat,
      alt: 100,
    };
    setWaypoints(prevWaypoints => [...prevWaypoints, newWaypoint]);
  }, []);

  const updateWaypoint = useCallback((id: string, newAlt: number) => {
    setWaypoints(prevWaypoints =>
      prevWaypoints.map(wp =>
        wp.id === id ? { ...wp, alt: newAlt } : wp
      )
    );
  }, []);

  const deleteWaypoint = useCallback((id: string) => {
    setWaypoints(prevWaypoints => prevWaypoints.filter(wp => wp.id !== id));
  }, []);

  const reorderWaypoints = useCallback((index: number, direction: 'up' | 'down') => {
    setWaypoints(prevWaypoints => {
      const newWaypoints = [...prevWaypoints];
      const item = newWaypoints[index];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;

      if (swapIndex < 0 || swapIndex >= newWaypoints.length) {
        return newWaypoints; 
      }

      newWaypoints[index] = newWaypoints[swapIndex];
      newWaypoints[swapIndex] = item;

      return newWaypoints;
    });
  }, []);

  const exportMission = useCallback(() => {
    const waypointsWithSeq = waypoints.map((wp, index) => ({
        ...wp,
        seq: index + 1
    }));

    const dataStr = JSON.stringify(waypointsWithSeq, null, 2); 
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'mission.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    linkElement.remove(); 
  }, [waypoints]);

  const pathCoordinates = useMemo(() => {
    return waypoints.map(wp => [wp.lng, wp.lat]);
  }, [waypoints]);

  return (
    <div className="app-container">
      <div className="map-container">
        <MapComponent
          waypoints={waypoints}
          pathCoordinates={pathCoordinates}
          onMapClick={addWaypoint}
        />
      </div>
      <div className="sidebar-container">
        <h2>Waypoints</h2>
        <WaypointList
          waypoints={waypoints}
          onUpdate={updateWaypoint}
          onDelete={deleteWaypoint}
          onReorder={reorderWaypoints}
        />
        {waypoints.length > 0 && (
           <button onClick={exportMission} className="export-button">
             Export Mission (JSON)
           </button>
        )}
      </div>
    </div>
  );
}

export default App;