import sad_lego from "../resources/images/sad_lego.jpg";
import "../resources/css/Error404.css";

export const Error404 = () => (
  <>
    <div className="container">
      <div className="error404">
        <h3>Erreur 404</h3>
        <h5>Page non trouvée</h5>
        <img
          className="sad_lego-img"
          src={sad_lego}
          alt={"Erreur 404 Page non disponible"}
        />
      </div>
    </div>
  </>
);