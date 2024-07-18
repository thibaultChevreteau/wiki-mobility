import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import default marker icon images
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

type Props = {
	coordinates: [number, number];
};

const Map: React.FC<Props> = ({ coordinates }) => {
	const [latitude, longitude] = coordinates;
	const mapContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Initialize the map
		const map = L.map(mapContainerRef.current!).setView(
			[latitude, longitude],
			6
		);

		// Add OpenStreetMap tile layer
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		// Define the custom icon
		const defaultIcon = L.icon({
			iconUrl: markerIcon,
			iconRetinaUrl: markerIcon2x,
			shadowUrl: markerShadow,
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			tooltipAnchor: [16, -28],
			shadowSize: [41, 41],
		});

		// Add a marker
		L.marker([latitude, longitude], { icon: defaultIcon }).addTo(map);

		return () => {
			// Clean up the map instance on component unmount
			map.remove();
		};
	}, [latitude, longitude]);

	return (
		<div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
	);
};

export default Map;
