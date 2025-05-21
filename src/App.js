import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CardProvider from "./components/CardProvider";

function App() {
  return (
    <div className="container-fluid">
      <div className="container">
        <CardProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </CardProvider>
      </div>
    </div>
  );
}

export default App;
