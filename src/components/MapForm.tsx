import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

		const marker = L.marker([latitude, longitude]).addTo(map);

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
