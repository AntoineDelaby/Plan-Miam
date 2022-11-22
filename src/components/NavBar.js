import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
      <div className="navBar">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/listePlats">Liste des plats</Link>
        </li>
        <li>
          <Link to="/creerPlat">Créer un plat</Link>
        </li>
      </div>
    );
}