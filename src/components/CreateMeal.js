import { useEffect, useState } from "react";
import { CreateIngredientPopup } from "./CreateIngredientPopup";
import "../resources/css/CreateMeal.css";

export const CreateMeal = (props) => {
    const [openPopup, setOpenPopup] = useState(false);
    const [newIngredient, setNewIngredient] = useState("");
    const [ingredientList, setIngredientList] = useState([]);
    const [mealName, setMealName] = useState("");
    const [mealCookTime, setMealCookTime] = useState(0);


    useEffect(() => {
        document.title = "Créer Plat - PlanMiam";  
      }, []);

    return (
      <div className="createMeal">
        <h1>Créer un plat</h1>
        <form className="createMealForm">
          <label>
            Nom du plat
            <input type="text" name="mealName" placeholder="Welsh" />
          </label>
          <label>
            Temps de préparation
            <input type="text" name="cookTime" placeholder="45" />
            min(s)
          </label>
          <label>
            Recette
            <input
              type="text"
              name="receipe"
              placeholder="Déguster un bon Welsh !"
            />
          </label>
          <hr/>
          <label>
            Liste des ingrédients
            <ul>
              {ingredientList.length
                ? ingredientList.map((element) => {
                    return <li key={element}>{element}</li>;
                  })
                : ""}
            </ul>
          </label>
          <label>
            Ajouter un ingrédient
            <select>
              <option disabled selected value>
                Ingrédient
              </option>
              {props.ingredients.map((element) => {
                return (
                  <option key={element["INGREDIENT_NAME"]}>
                    {element["INGREDIENT_NAME"]}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              name="newIngredientQuantity"
              placeholder="Quantité"
            />
            <select>
              <option disabled selected value>
                {" "}
                Unité{" "}
              </option>
              {props.units.map((element) => {
                return (
                  <option key={element["label"]}>{element["label"]}</option>
                );
              })}
            </select>
          </label>
          <button
            onClick={(event) => {
              event.preventDefault();
              setOpenPopup(true);
            }}
          >
            Créer un ingrédient
          </button>
          <CreateIngredientPopup
            trigger={openPopup}
            setNewIngredient={setNewIngredient}
          >
            <button
              className="popupButton"
              onClick={(event) => {
                event.preventDefault();
                fetch(
                    `http://localhost:8888/ingredients/${newIngredient}`
                  ).then(res => console.log(res));
                props.setIngredients([...props.ingredients, {"INGREDIENT_NAME":newIngredient}]);
                setOpenPopup(false);
              }}
            >
              Créer
            </button>
            <button
              className="popupButton"
              onClick={(event) => {
                event.preventDefault();
                setOpenPopup(false);
              }}
            >
              Annuler
            </button>
          </CreateIngredientPopup>
          <input type="submit" value="Créer le plat" />
        </form>
      </div>
    );
}