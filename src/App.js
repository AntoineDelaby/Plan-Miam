import { Routes, Route } from "react-router-dom";
import {RandomPlate} from "./components/RandomPlate.js";
import {Error404} from "./components/Error404.js";
import {NavBar} from "./components/NavBar.js";
import {MealList} from "./components/MealList.js"
import {CreateMeal} from "./components/CreateMeal.js"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<RandomPlate />} />
        <Route path="/listePlats" element={<MealList />} />
        <Route path="/creerPlat" element={<CreateMeal />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
