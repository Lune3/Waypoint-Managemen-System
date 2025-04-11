import React from 'react';
import { Waypoint } from '../types/waypoint';
import './WaypointList.css';

interface WaypointListProps {
  waypoints: Waypoint[];
  onUpdate: (id: string, newAlt: number) => void;
  onDelete: (id: string) => void;
  onReorder: (index: number, direction: 'up' | 'down') => void;
}

const WaypointList: React.FC<WaypointListProps> = ({
  waypoints,
  onUpdate,
  onDelete,
  onReorder,
}) => {

  const handleAltChange = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
      const newAlt = parseFloat(event.target.value);
      if (!isNaN(newAlt)) {
          onUpdate(id, newAlt);
      }
  }

  if (waypoints.length === 0) {
    return <p>Click on the map to add waypoints.</p>;
  }

  return (
    <ul className="waypoint-list">
      {waypoints.map((wp, index) => (
        <li key={wp.id} className="waypoint-item">
          <div className="wp-info">
             <span className="wp-seq">{index + 1}</span>
             <span className="wp-coords">
                 Lat: {wp.lat.toFixed(6)}, Lng: {wp.lng.toFixed(6)}
             </span>
             <label className="wp-alt">
                 Alt (m):
                 <input
                     type="number"
                     value={wp.alt}
                     onChange={(e) => handleAltChange(wp.id, e)}
                     step="10" 
                     min="0"
                 />
             </label>
          </div>
          <div className="wp-controls">
            <button
                onClick={() => onReorder(index, 'up')}
                disabled={index === 0}
                title="Move Up"
                className="reorder-btn"
            >
                ↑
            </button>
             <button
                onClick={() => onReorder(index, 'down')}
                disabled={index === waypoints.length - 1} 
                title="Move Down"
                className="reorder-btn"
            >
                ↓
            </button>
            <button onClick={() => onDelete(wp.id)} title="Delete" className="delete-btn">
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WaypointList;