import { useState } from "react";
import { Solution } from "../types";
import Map from "./Map";
import ReactMarkdown from "react-markdown";

type Props = {
	solution: Solution;
};

const SolutionContact: React.FC<Props> = ({ solution }) => {
	const [faviconLoaded, setFaviconLoaded] = useState(true);

	return (
		<div className="solution-contact">
			<Map plusCode={solution.googlePlusCode} />
			<div className="solution-contact__info">
				<img
					className="solution-contact__enveloppe"
					src="/contact.svg"
					alt="envelope"
				/>
				{solution.contact ? (
					<ReactMarkdown>{solution.contact}</ReactMarkdown>
				) : (
					<div>Pas d'information renseignée</div>
				)}
			</div>
			{solution.website ? (
				<div>
					<a className="solution-contact__visit" href={`${solution.website}`}>
						Visiter le site web
					</a>
					{faviconLoaded ? (
						<a href={`${solution.website}`}>
							<img
								className="solution-contact__favicon"
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

export default SolutionContact;
