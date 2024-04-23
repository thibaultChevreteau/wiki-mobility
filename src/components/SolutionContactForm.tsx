import { useState } from "react";
import { Solution } from "../types";
import Map from "./Map";

type Props = {
	solution: Solution;
	onContactChange: (contact: string) => void;
	onWebsiteChange: (website: string) => void;
	onGooglePlusCodeChange: (googlePlusCode: string) => void;
};

const SolutionContactForm: React.FC<Props> = ({
	solution,
	onContactChange,
	onWebsiteChange,
	onGooglePlusCodeChange,
}) => {
	const [contact, setContact] = useState(solution.contact || "");
	const [website, setWebsite] = useState(solution.website || "");
	const [googlePlusCode, setGooglePlusCode] = useState(solution.googlePlusCode);

	const handleContactChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContact(e.target.value);
		onContactChange(e.target.value);
	};

	const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setWebsite(e.target.value);
		onWebsiteChange(e.target.value);
	};

	const handleGooglePlusCodeChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setGooglePlusCode(e.target.value);
		onGooglePlusCodeChange(e.target.value);
	};

	return (
		<div className="solution-contact-form">
			<Map plusCode={googlePlusCode} />
			<div className="solution-contact-form__info">
				<img
					className="solution-contact-form__enveloppe"
					src="/contact.svg"
					alt="envelope"
				/>
				<textarea
					value={contact}
					onChange={handleContactChange}
					placeholder={contact}
					required
				/>
			</div>
			<div>
				<input
					className="solution-contact-form__website"
					type="text"
					value={website}
					onChange={handleWebsiteChange}
					placeholder="adresse site web"
					required
				/>
			</div>
			<div>
				<input
					className="solution-contact-form__googlePlusCode"
					type="text"
					value={googlePlusCode}
					onChange={handleGooglePlusCodeChange}
					placeholder="Google Plus Code"
					required
				/>
			</div>
		</div>
	);
};

export default SolutionContactForm;
