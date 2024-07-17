import React from "react";
import MapForm from "./MapForm";

type Props = {
	contact: string;
	website: string;
	coordinates: [number, number];
	onContactChange: (contact: string) => void;
	onWebsiteChange: (website: string) => void;
	onCoordinatesChange: (coordinates: [number, number]) => void;
};

const SolutionContactForm: React.FC<Props> = ({
	contact,
	website,
	coordinates,
	onContactChange,
	onWebsiteChange,
	onCoordinatesChange,
}) => {
	return (
		<div className="solution-contact-form">
			<MapForm
				coordinates={coordinates}
				onCoordinatesChange={onCoordinatesChange}
			/>
			<div className="solution-contact-form__info">
				<img
					className="solution-contact-form__envelope"
					src="/contact.svg"
					alt="envelope"
				/>
				<textarea
					value={contact}
					onChange={(e) => onContactChange(e.target.value)}
					placeholder={contact}
					required
				/>
			</div>
			<div>
				<input
					className="solution-contact-form__website"
					type="text"
					value={website}
					onChange={(e) => onWebsiteChange(e.target.value)}
					placeholder="adresse site web"
					required
				/>
			</div>
		</div>
	);
};

export default SolutionContactForm;
