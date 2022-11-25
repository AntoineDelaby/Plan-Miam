import '../resources/css/Meal.css';

export const Meal = (props) => {
    return (
        <div className="mealComponent">
            <p>Plat : {props.meal["PLATE_NAME"]}</p><br/>
            <p>Temps de préparation : {props.meal["COOK_TIME"]} min</p><br/>
            <p>Liste des ingrédients</p><br/>
            <p>Recette : </p><br/>
            <p>{props.meal["RECEIPE"]}</p>
        </div>
    );
}

export const DefaultMeal = () => {
    return (
        <></>
    );
}