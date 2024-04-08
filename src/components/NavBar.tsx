import { NavLink } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
	const [showMenu, setShowMenu] = useState(false);
	console.log(showMenu);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
		<div className="header">
			<nav className={`nav ${showMenu ? "" : "show-menu"}`}>
				<img
					src="/frenchtech_logo.svg"
					alt="Brand Logo"
					className="nav__logo"
				/>
				<div className={`nav__links ${showMenu ? "hide-menu" : ""}`}>
					<NavLink to="/" className="nav__links__link">
						Solutions
					</NavLink>
					<NavLink to="/about" className="nav__links__link">
						À propos
					</NavLink>
					<NavLink
						to="/nouvelle-solution"
						className="nav__links__link--new-solution"
					>
						<img
							src="/pencil.svg"
							alt="Pencil Logo"
							className="nav__button-logo"
						/>{" "}
						Nouvelle solution
					</NavLink>
					<form className="nav__form">
						<input
							type="text"
							placeholder="Rechercher..."
							className="nav__form__input"
						/>
					</form>
					<div className="nav__close" onClick={toggleMenu}>
						<img src="/cross-menu.svg" alt="Brand Logo" className="nav__logo" />
					</div>
				</div>
				<div
					className={`nav__toggle ${!showMenu ? "hide-menu" : ""}`}
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
