import { useEffect, useState } from "react";
import { CreateIngredientPopup } from "./CreateIngredientPopup";
import "../resources/css/CreateMeal.css";
import { useNavigate } from "react-router-dom";

export const CreateMeal = (props) => {
    const navigate = useNavigate(); // Pour faire une redirection une fois le plat créé
    const [openPopup, setOpenPopup] = useState(false);
    const [newIngredient, setNewIngredient] = useState("");
    const [validInput, setValidInput] = useState(null);

    const [mealName, setMealName] = useState(""); // Nom du nouveau plat
    const [mealCookTime, setMealCookTime] = useState(0); // Temps de préparation du nouveau plat
    const [mealReceipe, setMealReceipe] = useState(0); // Recette du nouveau Plat
    const [mealIngredients, setMealIngredients] = useState([]); // Liste des ingrédients du nouveau plat
    // Corps de chaque mealIngredient de mealIngredients : 
    //{
    //  "ingredient":nom de l'ingrédient,
    //  "quantity":quantité de l'ingrédient,
    //  "unit": unité de l'ingrédient
    //}
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

    const handleSubmit = (event) => {
      event.preventDefault();
       fetch(`http://localhost:8888/meal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newMeal: {
              name: mealName,
              cooktime: mealCookTime,
              recipe: mealReceipe,
              ingredients: mealIngredients
            }
        })
      });
    };

    return (
      <div className="createMeal">
        <h1>Créer un plat</h1>
        <form className="createMealForm" onSubmit={event => {
          handleSubmit(event);
          navigate('/listePlats');
          }}>
          <label>
            Nom du plat
            <input type="text" name="mealName" placeholder="Welsh" onChange={event => setMealName(event.target.value)}/>
          </label>
          <label>
            Temps de préparation
            <input type="text" name="cookTime" placeholder="45" onChange={event => setMealCookTime(event.target.value)}/>
            min(s)
          </label>
          <label>
            Recette
            <input
              type="text"
              name="recipe"
              placeholder="Déguster un bon Welsh !"
              onChange={event => setMealReceipe(event.target.value)}
            />
          </label>
          <hr/>
          <label>
            Liste des ingrédients
            <ul>
              {mealIngredients.length
                ? mealIngredients.map((element) => {
                    return (<div className="newMealIngredient"><li key={element}>{element.ingredient} {element.quantity} {element.unit}</li>
                    <button onChange={(event) => {
                        event.preventDefault();
                        setMealIngredients((current) => [current.filter(current.ingredient === element.ingredient)])
                    }}>supprimer</button></div>);
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
                event.preventDefault();if(addIngredient !== "" 
                && ingredientQuantity !== "" 
                && !isNaN(ingredientQuantity) 
                && ingredientUnit !== "" 
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
                fetch(`http://localhost:8888/ingredients/${newIngredient}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                  });
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
    for(let i = 0; i < ingredientList.length; i++) {
        if(ingredientList[i].ingredient === ingredient){
            return true;
        };
    }
    return false;
}