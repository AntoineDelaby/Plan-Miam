import { Routes, Route, useLocation } from "react-router-dom";
import {RandomPlate} from "./components/RandomPlate.js";
import {Error404} from "./components/Error404.js";
import {NavBar} from "./components/NavBar.js";
import {MealList} from "./components/MealList.js"
import {CreateMeal} from "./components/CreateMeal.js"
import { useEffect, useState } from "react";

function App() {
  const [meals, setMeals] = useState([]);
  const location = useLocation();
  let isListMealPage = location.pathname === "/listePlats";

  useEffect(() => {
    const fetchMeals = async () => {
      const data = await fetch(
        "http://192.168.1.35:8888/meals"
      );
      const result = await data.json();
      setMeals(result);
    };
    fetchMeals();
  },[isListMealPage]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<RandomPlate meals={meals}/>} />
        <Route path="/listePlats" element={<MealList meals={meals}/>} />
        <Route path="/creerPlat" element={<CreateMeal />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
