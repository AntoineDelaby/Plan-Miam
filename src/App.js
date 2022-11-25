import { Routes, Route, useLocation } from "react-router-dom";
import {RandomPlate} from "./components/RandomPlate.js";
import {Error404} from "./components/Error404.js";
import {NavBar} from "./components/NavBar.js";
import {MealList} from "./components/MealList.js"
import {CreateMeal} from "./components/CreateMeal.js"
import { useEffect, useState } from "react";
import './resources/css/App.css'

function App() {

  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [units, setUnits] = useState([]);
  const location = useLocation();
  let isListMealPage = location.pathname === "/listePlats";
  let isCreateMealPage = location.pathname === "/creerPlat";

  const apiPath = "http://localhost:8888/";

  useEffect(() => {
    const fetchMeals = async () => {
      const data = await fetch(
        `${apiPath}meals`
      );
      const result = await data.json();
      setMeals(result);
    };
    fetchMeals();
  },[isListMealPage]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const data = await fetch(
        `${apiPath}ingredients`
      );
      const result = await data.json();
      setIngredients(result);
      const dataUnits = await fetch(
        `${apiPath}units`
      );
      const resultUnits = await dataUnits.json();
      setUnits(resultUnits);
    };
    fetchIngredients();
  },[isCreateMealPage]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<RandomPlate meals={meals}/>} />
        <Route path="/listePlats" element={<MealList meals={meals}/>} />
        <Route path="/creerPlat" element={<CreateMeal ingredients={ingredients} setIngredients={setIngredients} units={units}/>} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
