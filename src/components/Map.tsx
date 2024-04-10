import React, { useRef, useEffect } from "react";

type Props = {
	plusCode: string;
};

const Map: React.FC<Props> = ({ plusCode }) => {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<google.maps.Map<Element> | undefined>();

	useEffect(() => {
		const loadMap = () => {
			// Initialize the map
			const mapOptions: google.maps.MapOptions = {
				center: { lat: 0, lng: 0 },
				zoom: 6,
				zoomControl: true,
				mapTypeControl: false,
				streetViewControl: false,
				fullscreenControl: false,
				scaleControl: false,
				rotateControl: false,
				gestureHandling: "cooperative",
			};
			mapRef.current = new google.maps.Map(
				mapContainerRef.current!,
				mapOptions
			);

			// Load the PlaceService
			const placesService = new google.maps.places.PlacesService(
				mapRef.current!
			);

			// Search for the place using Plus Code
			placesService.findPlaceFromQuery(
				{
					query: plusCode,
					fields: ["geometry"],
				},
				(results, status) => {
					if (
						status === google.maps.places.PlacesServiceStatus.OK &&
						results &&
						results[0]
					) {
						const location = results[0].geometry?.location;
						if (location) {
							mapRef.current?.setCenter(location);
							new google.maps.Marker({
								position: location,
								map: mapRef.current,
							});
						}
					} else {
						console.error("Failed to find place:", status);
					}
				}
			);
		};

		if (!window.google) {
			// If Google Maps JavaScript API is not loaded, load it dynamically
			const script = document.createElement("script");
			script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_API_KEY}&libraries=places`;
			script.async = true;
			script.defer = true;
			script.onload = loadMap;
			document.body.appendChild(script);

			return () => {
				document.body.removeChild(script);
			};
		} else {
			// If Google Maps JavaScript API is already loaded, initialize the map immediately
			loadMap();
		}
	}, [plusCode]);

	return <div ref={mapContainerRef} className="map" />;
};

export default Map;
