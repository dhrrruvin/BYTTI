import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import AvailableTrains from "./Components/AvailableTrains/AvailableTrains";
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/available-trains" element={<AvailableTrains />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>

      {/* <Router exact path="/logout">
        <Home />
      </Router>
      <Router exact path="/login">
        <Home />
      </Router>
      <Router exact path="/register">
        <Home />
      </Router> */}
    </div>
  );
}

export default App;
