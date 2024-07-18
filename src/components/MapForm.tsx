import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

type Props = {
	coordinates: [number, number];
	onCoordinatesChange: (coordinates: [number, number]) => void;
};

const MapForm: React.FC<Props> = ({ coordinates, onCoordinatesChange }) => {
	const [latitude, longitude] = coordinates;
	const mapContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const map = L.map(mapContainerRef.current!).setView(
			[latitude, longitude],
			6
		);

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

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

		const marker = L.marker([latitude, longitude], { icon: defaultIcon }).addTo(
			map
		);

		map.on("click", (e: L.LeafletMouseEvent) => {
			const { lat, lng } = e.latlng;
			onCoordinatesChange([lat, lng]);
			marker.setLatLng([lat, lng]);
		});

		return () => {
			map.remove();
		};
	}, [latitude, longitude, onCoordinatesChange]);

	return (
		<div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
	);
};

export default MapForm;
