import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Chatbot from "./Chatbot";
import { Box } from "@mui/material";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

interface MapComponentsProps {
  isSOSClicked?: boolean;
}

export interface MapComponentsRef {
  handleSOSClick: () => void;
}

const MapComponents = forwardRef<MapComponentsRef, MapComponentsProps>((props, ref) => {
  const [position, setPosition] = useState<[number, number]>([17.385, 78.4867]);

  useImperativeHandle(ref, () => ({
    handleSOSClick() {
      // Notification logic
      alert("SOS notification broadcasted to nearby responders!");
    }
  }));

  return (
    <Box sx={{ position: "relative" }}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%", borderRadius: "10px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>
            You are here. <br /> Emergency responders notified.
          </Popup>
        </Marker>
        {props.isSOSClicked && (
          <Circle
            center={position}
            pathOptions={{ color: "red", fillColor: "red" }}
            radius={500}
          />
        )}
      </MapContainer>
      <Box sx={{ mt: 3 }}>
        <Chatbot />
      </Box>
    </Box>
  );
});

MapComponents.displayName = "MapComponents";

export default MapComponents;
