import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import AvailableTrains from "./Components/AvailableTrains/AvailableTrains";
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";
import PassengerDetails from "./Components/PassengerDetails/PassengerDetails";
import ProtectedRoute from "../src/middleware/ProtectedRoute";
import PaymentSuccess from "./Components/PaymentStatus/PaymentSucessful";
import GeneratePDF from "./Components/TicketPDF/GeneratePDF";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/available-trains" element={<AvailableTrains />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/psnginput" element={<PassengerDetails />} /> */}
          {/* <ProtectedRoute path="/psnginput" element={<PassengerDetails />} /> */}
          <Route
            exact
            path="/psnginput"
            element={
              <ProtectedRoute>
                <PassengerDetails />
              </ProtectedRoute>
            }
          />
          <Route exact path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route exact path="/ticket" element={<GeneratePDF />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
