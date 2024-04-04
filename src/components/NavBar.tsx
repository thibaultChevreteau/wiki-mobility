import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<div>
			<nav className="nav">
				<img
					src="/frenchtech_logo.svg"
					alt="Brand Logo"
					className="nav__logo"
				/>
				<div className="nav__links">
					<Link to="/" className="nav__links__link">
						Solutions
					</Link>
					<Link to="/about" className="nav__links__link">
						À propos
					</Link>
					<Link
						to="/nouvelle-solution"
						className="nav__links__link--new-solution"
					>
						<img
							src="/pencil.svg"
							alt="Pencil Logo"
							className="nav__button-logo"
						/>{" "}
						Nouvelle solution
					</Link>
					<form className="nav__form">
						<input
							type="text"
							placeholder="Rechercher..."
							className="nav__form__input"
						/>
					</form>
				</div>
			</nav>
			<div className="border-bottom"></div>
		</div>
	);
};

export default NavBar;
