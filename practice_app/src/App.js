import HomePage from "./Components/API/HomePage";
import UpdateImage from "./Components/API/UpdateImage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/update-image" element={<UpdateImage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
