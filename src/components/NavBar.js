import { Link } from "react-router-dom";
import '../resources/css/NavBar.css';

export const NavBar = () => {
    return (
      <div>
        <ul className="navBar">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/listePlats">Liste des plats</Link>
        </li>
        <li>
          <Link to="/creerPlat">Créer un plat</Link>
        </li>
        </ul>
      </div>
    );
}