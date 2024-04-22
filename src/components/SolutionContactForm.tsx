import { useState } from "react";
import { Solution } from "../types";
import Map from "./Map";

type Props = {
	solution: Solution;
	onContactChange: (contact: string) => void;
};

const SolutionContactForm: React.FC<Props> = ({
	solution,
	onContactChange,
}) => {
	const [faviconLoaded, setFaviconLoaded] = useState(true);

	const [contact, setContact] = useState(solution.contact || "");

	const handleContactChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newContact = e.target.value;
		setContact(newContact);
		onContactChange(newContact);
	};

	return (
		<div className="solution-contact-form">
			<Map plusCode={solution.googlePlusCode} />
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
			{solution.website ? (
				<div>
					<a
						className="solution-contact-form__visit"
						href={`${solution.website}`}
					>
						Visiter le site web
					</a>
					{faviconLoaded ? (
						<a href={`${solution.website}`}>
							<img
								className="solution-contact-form__favicon"
								src={`${solution.website}/favicon.ico`}
								alt="solution favicon"
								onError={() => setFaviconLoaded(false)}
							/>
						</a>
					) : null}
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default SolutionContactForm;
