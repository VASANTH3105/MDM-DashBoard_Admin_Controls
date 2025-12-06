import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Typography, Chip } from "@mui/material";
import { Gps, Speedometer } from "iconsax-react";

// --- Fix for missing Leaflet Marker Icons in React ---
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;
// ----------------------------------------------------

const LocationMap = ({ location }) => {
  // Normalize keys: Handle both "lat"/"lng" (lowercase) and "Lat"/"Lng" (uppercase)
  const lat = location?.lat || location?.Lat;
  const lng = location?.lng || location?.Lng;
  const accuracy = location?.accuracy || location?.Accuracy || 0;
  const speed = location?.speed || location?.Speed || 0;

  // 1. Safety Check: If no valid coordinates, show message
  if (!lat || !lng) {
    return (
      <Box
        height={350}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#f5f5f5"
        borderRadius="16px"
        border="1px solid rgba(0,0,0,0.1)"
      >
        <Typography color="text.secondary">Location data unavailable</Typography>
      </Box>
    );
  }

  const position = [lat, lng];

  return (
    <Box
      sx={{
        height: 350,
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.1)",
        position: "relative",
        zIndex: 0 
      }}
    >
      <MapContainer
        center={position}
        zoom={16} 
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            <Typography variant="subtitle2" fontWeight={700}>
              Device Location
            </Typography>
            <Typography variant="caption" display="block">
              Lat: {lat}
            </Typography>
            <Typography variant="caption" display="block">
              Lng: {lng}
            </Typography>
          </Popup>
        </Marker>

        {/* Accuracy Circle */}
        <Circle
          center={position}
          radius={accuracy}
          pathOptions={{ color: "#2196f3", fillColor: "#2196f3", fillOpacity: 0.2 }}
        />
      </MapContainer>

      {/* Floating Info Badge */}
      <Box
        position="absolute"
        bottom={16}
        left={16}
        zIndex={400}
        bgcolor="rgba(255,255,255,0.9)"
        p={1.5}
        borderRadius="12px"
        boxShadow="0 4px 12px rgba(0,0,0,0.15)"
        display="flex"
        gap={1}
      >
        <Chip
          icon={<Gps size="16" variant="Bold"/>}
          label={`±${Math.round(accuracy)}m`}
          size="small"
          color="primary"
          variant="outlined"
        />
        <Chip
          icon={<Speedometer size="16" variant="Bold"/>}
          label={`${speed} m/s`}
          size="small"
          color="warning"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default LocationMap;