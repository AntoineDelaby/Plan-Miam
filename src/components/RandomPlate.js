import {Meal, DefaultMeal} from "./Meal.js";
import { useState } from "react";

export const RandomPlate = (props) => {
    const [mealComponenent, setMealComponent] = useState(DefaultMeal)

    return (
        <div className="randomPlate">
            <button onClick={() => setMealComponent(<Meal meal={
                props.meals[Math.floor(Math.random() * (props.meals.length))]}/>)
            }> Qu'est ce qu'on mange aujourd'hui ? </button><br/>
            { mealComponenent }
        </div>
    );
}