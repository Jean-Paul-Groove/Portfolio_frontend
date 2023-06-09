import "./navigation.css";

function Navigation() {
	return (
		<nav className="navigation">
			<ul className="navigation__list">
				<a href="#about">
					<li className="navigation__list__item">A propos</li>
				</a>
				<a href="#projects">
					<li className="navigation__list__item"> Projets</li>
				</a>
				<a href="#contact">
					<li className="navigation__list__item">Contact</li>
				</a>
			</ul>
		</nav>
	);
}

export default Navigation;
