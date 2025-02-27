import "./App.css";
import "./index.css";
import Navbar from "../src/Components/Navbar/navigation";
import HomePage from "./Components/Home/homepage";
import Drivers from "./Components/Drivers/drivers";
import Standings from "./Components/Standings/standings";
import Qualified from "./Components/Qualify/qualified";
import Schedule from "./Components/Schedule/schedule";
import Stats from "./Components/Stats/stats";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="flex flex-col bg-cream min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/standings" element={<Standings />} />              
          <Route path="/qualified" element={<Qualified />} />
          <Route path="/schedule" element={<Schedule/>}/>             
          <Route path="/stats" element={<Stats/>}/>             
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
