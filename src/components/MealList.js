import { useState } from "react";
import {Meal} from "./Meal.js"

export const MealList = (props) => {
    const [filter, setFilter] = useState("");

    return (
        <div className="mealList">
            <h1>Liste des plats</h1>
            <input type="text" id="filterMeal" onChange={(e) => setFilter(e.target.value)} placeholder="Chercher un plat ..."></input>
            {props.meals.map((element) => {
                if(element["PLATE_NAME"].toLowerCase().includes(filter.toLowerCase())) {
                    return (<Meal key={element["PLATE_NAME"]} meal={element}/> )
                }
                return (<></>);
            })}
        </div>
    );
}