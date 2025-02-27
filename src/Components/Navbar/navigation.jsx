import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="mt-4 mx-10 border-t-4 border-r-4 border-text rounded-tr-3xl bg-cream">
      <ul className="flex justify-between items-center space-x-6">
        <li
          className="w-[200px] h-[88px] flex items-center justify-center text-3xl cursor-pointer border-b-3 border-transparent hover:border-crimson hover:text-crimson "
          style={{ fontFamily: "FerroRosso" }} 
        >
          <Link  className="" to="/home">Home</Link>
        </li>
        <li
          className="w-[200px] h-[88px] flex items-center justify-center text-3xl cursor-pointer border-b-3 border-transparent hover:border-crimson hover:text-crimson"
          style={{ fontFamily: "FerroRosso" }}
        >
           <Link to="/drivers">Drivers</Link>
        </li>
        <li
          className="w-[200px] h-[88px] flex items-center justify-center text-3xl cursor-pointer border-b-3 border-transparent hover:border-crimson hover:text-crimson "
          style={{ fontFamily: "FerroRosso" }}
        >
           <Link to="/standings">Standings</Link>
        </li>
        <li
           className="w-[200px] h-[88px] flex items-center justify-center text-3xl cursor-pointer border-b-3 border-transparent hover:border-crimson hover:text-crimson "
          style={{ fontFamily: "FerroRosso" }}
        >
          <Link to="/qualified">Qualified</Link>
        </li>
        
        <li
           className="w-[200px] h-[88px] flex items-center justify-center text-3xl cursor-pointer border-b-3 border-transparent hover:border-crimson hover:text-crimson "
          style={{ fontFamily: "FerroRosso" }}
        >
          <Link to="/schedule">Schedule</Link>
        </li>
        <li
           className="w-[200px] h-[88px] flex items-center justify-center text-3xl cursor-pointer border-b-3 border-transparent hover:border-crimson hover:text-crimson "
          style={{ fontFamily: "FerroRosso" }}
        >
          <Link to="/stats">Stats</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
