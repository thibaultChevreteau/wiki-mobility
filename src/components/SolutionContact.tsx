//import { useState } from "react";
import { Solution } from "../types";
import Map from "./Map";
import ReactMarkdown from "react-markdown";

type Props = {
	solution: Solution;
};

const SolutionContact: React.FC<Props> = ({ solution }) => {
	//const [faviconLoaded, setFaviconLoaded] = useState(true);

	const formattedContact = solution.contact
		? solution.contact.replace(/\n/g, "  \n")
		: "";

	return (
		<div className="solution-contact">
			<Map plusCode={solution.googlePlusCode} />
			<div className="solution-contact__info">
				<img
					className="solution-contact__enveloppe"
					src="/contact.svg"
					alt="envelope"
				/>
				<div className="solution-contact__text">
					{solution.contact ? (
						<ReactMarkdown>{formattedContact}</ReactMarkdown>
					) : (
						<div>Pas d'information renseignée</div>
					)}
				</div>
			</div>
			{solution.website ? (
				<div>
					<a className="solution-contact__visit" href={`${solution.website}`}>
						Visiter le site web
					</a>
					{/* {faviconLoaded ? (
						<a href={`${solution.website}`}>
							<img
								className="solution-contact__favicon"
								src={`https://www.google.com/s2/favicons?domain=${solution.website}`}
								alt="solution favicon"
								onError={() => setFaviconLoaded(false)}
							/>
						</a>
					) : null} */}
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default SolutionContact;
