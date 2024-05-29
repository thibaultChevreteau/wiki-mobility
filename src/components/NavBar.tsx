import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Solution as SolutionType } from "../types";

interface Props {
	solutions: SolutionType[];
}

const NavBar: React.FC<Props> = ({ solutions }) => {
	const [showMenu, setShowMenu] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<SolutionType[]>([]);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	const closeNavbar = () => {
		setShowMenu(false);
	};

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		if (query.length > 0) {
			const filtered = solutions.filter(
				(solution) =>
					solution.name.toLowerCase().includes(query.toLowerCase()) ||
					solution.description.toLowerCase().includes(query.toLowerCase())
			);
			setSearchResults(filtered);
		} else {
			setSearchResults([]);
		}
	};

	const handleSolutionClick = () => {
		setSearchQuery("");
		setSearchResults([]);
		closeNavbar();
	};

	return (
		<div className="header">
			<nav className={`nav ${showMenu ? "show-menu" : ""}`}>
				<NavLink to="/" onClick={closeNavbar}>
					<img
						src="/frenchtech_logo.svg"
						alt="Brand Logo"
						className="nav__logo"
					/>
				</NavLink>
				<div className={`nav__links ${showMenu ? "" : "hide-menu"}`}>
					<NavLink to="/" className="nav__links__link" onClick={closeNavbar}>
						Solutions
					</NavLink>
					<NavLink
						to="/a-propos"
						className="nav__links__link"
						onClick={closeNavbar}
					>
						À propos
					</NavLink>
					<NavLink
						to="/nouvelle-solution"
						className="nav__links__link--new-solution"
						onClick={closeNavbar}
					>
						<img
							src="/pencil.svg"
							alt="Pencil Logo"
							className="nav__button-logo"
						/>{" "}
						Nouvelle solution
					</NavLink>
					<div className="nav__form">
						<input
							type="text"
							placeholder="Rechercher..."
							className="nav__form__input"
							value={searchQuery}
							onChange={(e) => handleSearch(e.target.value)}
						/>
						{searchResults.length > 0 && (
							<ul className="nav__search-results">
								{searchResults.map((result) => {
									const truncateDescription = (
										description: string,
										maxLength: number
									) => {
										if (description.length <= maxLength) return description;
										const truncated = description.slice(0, maxLength);
										const lastSpaceIndex = truncated.lastIndexOf(" ");
										return lastSpaceIndex > 0
											? `${truncated.slice(0, lastSpaceIndex)}...`
											: `${truncated}...`;
									};

									return (
										<li key={result.id}>
											<NavLink
												to={`/solutions/${result.id}`}
												onClick={() => {
													handleSolutionClick();
													closeNavbar();
												}}
											>
												<h4>{result.name}</h4>
												{truncateDescription(result.description, 50)}
											</NavLink>
										</li>
									);
								})}
							</ul>
						)}
					</div>
					<div className="nav__close" onClick={toggleMenu}>
						<img src="/cross-menu.svg" alt="Brand Logo" className="nav__logo" />
					</div>
				</div>
				<div
					className={`nav__toggle ${showMenu ? "hide-menu" : ""}`}
					onClick={toggleMenu}
				>
					<img
						src="/hamburger-menu.svg"
						alt="Brand Logo"
						className="nav__logo"
					/>
				</div>
			</nav>
			<div className="border-bottom"></div>
		</div>
	);
};

export default NavBar;
