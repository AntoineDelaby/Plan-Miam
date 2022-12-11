import { useEffect, useRef, useState } from 'react';
import '../resources/css/Meal.css';

export const Meal = (props) => {

    const[mealIngredients, setMealIngredients] = useState([]);
    const didMountRef = useRef(false);

    useEffect(() => {

        if(!didMountRef.current){
            const fetchMealIngredients = async () => {
                const data = await fetch(
                  `http://localhost:8888/mealIngredients/${props.meal.PLATE_ID}`
                );
                const result = await data.json();
                setMealIngredients(result);
            };
            fetchMealIngredients();
            didMountRef.current = true;
        }
    })

    return (
        <div className="mealComponent">
            <p>Plat : {props.meal["PLATE_NAME"]}</p><br/>
            <p>Temps de préparation : {props.meal["COOK_TIME"]} min</p><br/>
            <p>Liste des ingrédients</p>
            <ul>
                {mealIngredients.map( (element) => {
                    return(<li>{element.INGREDIENT_NAME}</li>);
                })}
            </ul><br/>
            <p>Recette : </p><br/>
            <p>{props.meal["RECIPE"]}</p>
        </div>
    );
}

export const DefaultMeal = () => {
    return (
        <></>
    );
}