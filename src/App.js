import { Routes, Route, useLocation } from "react-router-dom";
import {RandomPlate} from "./components/RandomPlate.js";
import {Error404} from "./components/Error404.js";
import {NavBar} from "./components/NavBar.js";
import {MealList} from "./components/MealList.js"
import {CreateMeal} from "./components/CreateMeal.js"
import { useEffect, useState } from "react";

function App() {
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const location = useLocation();
  let isListMealPage = location.pathname === "/listePlats";
  let isCreateMealPage = location.pathname === "/creerPlat";

  useEffect(() => {
    const fetchMeals = async () => {
      const data = await fetch(
        "http://localhost:8888/meals"
      );
      const result = await data.json();
      setMeals(result);
    };
    fetchMeals();
  },[isListMealPage]);

  useEffect(() => {
    const fetchMeals = async () => {
      const data = await fetch(
        "http://localhost:8888/ingredients"
      );
      const result = await data.json();
      setIngredients(result);
    };
    fetchMeals();
  },[isCreateMealPage]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<RandomPlate meals={meals}/>} />
        <Route path="/listePlats" element={<MealList meals={meals}/>} />
        <Route path="/creerPlat" element={<CreateMeal ingredients={ingredients}/>} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
