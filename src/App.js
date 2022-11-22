import { Routes, Route } from "react-router-dom";
import {RandomPlate} from "./components/RandomPlate.js"
import {Error404} from "./components/Error404.js"

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<RandomPlate />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
    </div>
  );
}

export default App;
