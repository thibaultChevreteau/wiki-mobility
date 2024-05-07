import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const About = () => {
	const [markdownContent, setMarkdownContent] = useState("");

	useEffect(() => {
		const fetchMarkdownContent = async () => {
			try {
				const response = await fetch("/about.md");
				const text = await response.text();
				setMarkdownContent(text);
			} catch (error) {
				console.error("Error fetching markdown:", error);
			}
		};

		fetchMarkdownContent();
	}, []);

	return (
		<div className="about">
			<ReactMarkdown>{markdownContent}</ReactMarkdown>
		</div>
	);
};

export default About;
