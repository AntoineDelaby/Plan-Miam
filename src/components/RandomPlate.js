import {Meal, DefaultMeal} from "./Meal.js";
import { useState, useEffect } from "react";

export const RandomPlate = () => {
    const [mealComponenent, setMealComponent] = useState(DefaultMeal)

    return (
        <div className="randomPlate">
            <button onClick={() => setMealComponent(Meal)}> Qu'est ce qu'on mange aujourd'hui ? </button><br/>
            { mealComponenent }
        </div>
    );
}