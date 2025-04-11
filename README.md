# Web-Based Waypoint Management System (GCS Interface)

## 1. Overview

This project is a simple web-based Ground Control System (GCS) interface designed for Unmanned Aerial Vehicle (UAV) waypoint management. It allows users to interactively create, modify, and manage mission waypoints on a map interface. The primary goal is to provide a functional demonstration of core waypoint operations using modern web technologies.

Built with:
*   [Vite](https://vitejs.dev/) (Build tool)
*   [React](https://reactjs.org/) (UI Library)
*   [TypeScript](https://www.typescriptlang.org/) (Type safety)
*   [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/) (Map rendering and interaction)

## 2. Features

The application implements the following core features for waypoint management:

1.  **Add Waypoints**: Users can click anywhere on the map to add a new waypoint. Each new waypoint is automatically assigned latitude, longitude (from the click location), a default altitude, and appended to the end of the mission sequence.
2.  **Edit Waypoints**: The altitude of any waypoint can be directly modified via an input field in the waypoint list. Latitude and longitude are currently set only upon creation.
3.  **Delete Waypoints**: Individual waypoints can be removed from the mission using a delete button associated with each waypoint in the list.
4.  **Reorder Waypoints**: The sequence of waypoints in the mission can be adjusted using "Up" and "Down" buttons for each waypoint in the list.
5.  **Display Path**: A line is drawn on the map connecting the waypoints sequentially, visually representing the planned mission path. Markers indicate individual waypoint locations.
6.  **Export Mission**: The current list of waypoints (including their order, coordinates, and altitude) can be exported as a JSON file. The sequence number is added during the export process based on the current array order.

## 3. Tech Stack

*   **Frontend Framework/Library**: React 18+
*   **Language**: TypeScript
*   **Build Tool**: Vite
*   **Mapping Library**: Mapbox GL JS
*   **Styling**: Plain CSS

## 4. Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the Repository**:
    ```bash
    git clone <your-repository-url>
    cd waypoint-gcs
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```
    This command installs React, Mapbox GL JS, TypeScript types, and other necessary development dependencies.

3.  **Configure Mapbox Access Token**:
    *   Sign up or log in to [Mapbox](https://www.mapbox.com/).
    *   Obtain an Access Token from your Mapbox account page.
    *   Create a file named `.env` in the root directory of the project (`waypoint-gcs/`).
    *   Add your token to the `.env` file like this:
        ```env
        VITE_MAPBOX_TOKEN=pk.YOUR_MAPBOX_ACCESS_TOKEN
        ```
        Replace `pk.YOUR_MAPBOX_ACCESS_TOKEN` with your actual token. Vite uses the `VITE_` prefix to expose environment variables to the frontend code.

4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    This command starts the Vite development server. Open your web browser and navigate to the local URL provided (usually `http://localhost:5173`).

## 5. Usage Guide

1.  **View the Map**: Upon loading, an interactive map will be displayed.
2.  **Add Waypoints**: Click on the desired location on the map. A marker will appear, and the waypoint details (Sequence No., Lat/Lng, Altitude) will be added to the list in the sidebar.
3.  **See the Path**: As you add more waypoints, a line connecting them in order will automatically appear on the map.
4.  **Edit Altitude**: In the sidebar list, find the waypoint you want to modify. Change the value in the "Alt (m)" input field. The change is saved automatically. Marker popups will show the updated altitude (may require reopening the popup).
5.  **Reorder Waypoints**: Use the '↑' (Up) and '↓' (Down) buttons next to each waypoint in the list to change its position in the sequence. The path on the map and the sequence numbers in the list will update accordingly.
6.  **Delete Waypoint**: Click the '✕' (Delete) button next to the waypoint you wish to remove. It will be removed from the list and the map, and the path will update.
7.  **Export Mission**: Once you have defined your mission, click the "Export Mission (JSON)" button at the bottom of the sidebar. A file named `mission.json` will be downloaded containing the waypoint data.

## 6. Data Structure

The core data entity is the `Waypoint`, defined in `src/types/waypoint.ts`:

```typescript
export interface Waypoint {
  id: string;   // Unique identifier (using crypto.randomUUID())
  lat: number;  // Latitude coordinate
  lng: number;  // Longitude coordinate
  alt: number;  // Altitude in meters
  // Sequence number is not stored directly in the state.
  // It is derived dynamically from the waypoint's index in the `waypoints` array (+1).
}

[
  {
    "id": "unique-id-1",
    "lat": 40.7128,
    "lng": -74.0060,
    "alt": 100,
    "seq": 1
  },
  {
    "id": "unique-id-2",
    "lat": 40.7580,
    "lng": -73.9855,
    "alt": 120,
    "seq": 2
  }
  // ... more waypoints
]
```
For Deployment
``npm run build``
