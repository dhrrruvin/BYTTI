import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <Router exact path="/">
        <HomePage />
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
