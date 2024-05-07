import Map from "./Map";

type Props = {
	contact: string;
	website: string;
	googlePlusCode: string;
	onContactChange: (contact: string) => void;
	onWebsiteChange: (website: string) => void;
	onGooglePlusCodeChange: (googlePlusCode: string) => void;
};

const SolutionContactForm: React.FC<Props> = ({
	contact,
	website,
	googlePlusCode,
	onContactChange,
	onWebsiteChange,
	onGooglePlusCodeChange,
}) => {
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
			<div>
				<input
					className="solution-contact-form__googlePlusCode"
					type="text"
					value={googlePlusCode}
					onChange={(e) => onGooglePlusCodeChange(e.target.value)}
					placeholder="Google Plus Code"
					required
				/>
			</div>
		</div>
	);
};

export default SolutionContactForm;
