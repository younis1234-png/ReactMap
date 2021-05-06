import "./App.css";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import { useState, useEffect } from "react";
import * as parkData from "./data/skateboard-parks.json";

function App() {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });

  const [selectedPark, setSelectedPark] = useState(null);
  console.log(selectedPark);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
    >
      {parkData.features.map((park) => (
        <Marker
          key={park.properties.PARK_ID}
          latitude={park.geometry.coordinates[1]}
          longitude={park.geometry.coordinates[0]}
        >
          <button
            className="marker-btn"
            onClick={(e) => {
              e.preventDefault();
              setSelectedPark(park);
            }}
          >
            <img src="/skateboarding.svg" alt="Skate Park Icon" />
          </button>
        </Marker>
      ))}

      {selectedPark ? (
        <Popup
          latitude={selectedPark.geometry.coordinates[1]}
          longitude={selectedPark.geometry.coordinates[0]}
          onClose={() => {
            setSelectedPark(null);
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
      ) : null}
    </ReactMapGl>
  );
}

export default App;
