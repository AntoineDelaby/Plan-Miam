import { useEffect, useState } from "react";
import { CreateIngredientPopup } from "./CreateIngredientPopup";
import "../resources/css/CreateMeal.css";

export const CreateMeal = (props) => {
    const [openPopup, setOpenPopup] = useState(false);
    const [newIngredient, setNewIngredient] = useState("");
    const [validInput, setValidInput] = useState(null);

    const [mealName, setMealName] = useState(""); // Nom du nouveau plat
    const [mealCookTime, setMealCookTime] = useState(0); // Temps de préparation du nouveau plat
    const [receipe, setReceipe] = useState(0); // Recette du nouveau Plat
    const [mealIngredients, setMealIngredients] = useState([]); // Liste des ingrédients du nouveau plat
    const [addIngredient, setAddIngredient] = useState(""); // Choix de l'ingrédient
    const [ingredientQuantity, setIngredientQuantity] = useState(""); // Quantité du nouvel ingrédient
    const [ingredientUnit, setIngredientUnit] = useState(""); // Unité de la quantité du nouvel ingrédient


    useEffect(() => {
        document.title = "Créer Plat - PlanMiam";  
      }, []);

    useEffect(() => {
    if (isNaN(ingredientQuantity)) {
        setValidInput(false);
    } else {
        setValidInput(true);
    }
    }, [ingredientQuantity]);

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
              {mealIngredients.length
                ? mealIngredients.map((element) => {
                    return <li key={element}>{element.ingredient} {element.quantity} {element.unit}</li>;
                  })
                : ""}
            </ul>
          </label>
          <label>
            Ajouter un ingrédient
            <select onChange={(event) => {setAddIngredient(event.target.value)}}>
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
              onChange={(event) => {setIngredientQuantity(event.target.value)}}
            />
            <select onChange={(event) => {setIngredientUnit(event.target.value)}}>
              <option disabled selected value>
                Unité
              </option>
              {props.units.map((element) => {
                return (
                  <option key={element["label"]}>{element["label"]}</option>
                );
              })}
            </select>
            <button onClick={(event) => {
                event.preventDefault();
                if(addIngredient != "" 
                && ingredientQuantity != "" 
                && !isNaN(ingredientQuantity) 
                && ingredientUnit != "" 
                && !isIngredientInList(mealIngredients, addIngredient)) {
                    setMealIngredients([...mealIngredients, {"ingredient":addIngredient,
                     "quantity":ingredientQuantity, "unit": ingredientUnit}])
                }
            }}>Ajouter</button>
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

function isIngredientInList(ingredientList, ingredient) {
    for(let element in ingredientList) {
        if(element.ingredient === ingredient.ingredient) return true;
    }
    return false;
}