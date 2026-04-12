import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { reliefApi } from "../../../api/reliefApi";
import { ReliefCenter } from "../../../types/relief.types";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

interface MapsProps {
  style?: React.CSSProperties;
}

const Maps: React.FC<MapsProps> = ({ style }) => {
  const [centers, setCenters] = useState<ReliefCenter[]>([]);

  const fetchCenters = async () => {
    try {
      const data = await reliefApi.getAllCenters();
      setCenters(data);
    } catch (err) {
      console.error("Failed to load map centers:", err);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  const defaultPosition: [number, number] = [17.385, 78.4867];

  return (
    <MapContainer
      center={defaultPosition}
      zoom={12}
      scrollWheelZoom={true}
      style={style || { height: "400px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {centers.map((center) => (
        center.latitude && center.longitude && (
          <Marker
            key={center._id}
            position={[center.latitude, center.longitude]}
            icon={icon}
          >
            <Popup>
              <div style={{ padding: '5px' }}>
                <strong style={{ fontSize: '14px' }}>{center.CenterName}</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '12px' }}>{center.Address}</p>
                <p style={{ margin: '3px 0 0 0', fontSize: '11px', color: '#666' }}>Phone: {center.Phone}</p>
              </div>
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
}

export default Maps;
