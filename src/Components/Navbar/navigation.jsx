import React from "react";

const Navbar = () => {
  return (
    <nav className="mt-4 mx-10 border-t-4 border-r-4 border-text rounded-tr-3xl bg-cream">
    <ul className="flex justify-between items-center space-x-6">
      <li className="w-[200px] h-[88px] flex items-center justify-center text-3xl cursor-pointer hover:border-b-4 hover:border-crimson hover:text-crimson transition-all duration-100" style={{ fontFamily: "FerroRosso" }}>
        Home
      </li>
      <li className="w-[200px] h-[88px] flex items-center justify-center text-3xl cursor-pointer hover:border-b-4 hover:border-crimson hover:text-crimson transition-all duration-100" style={{ fontFamily: "FerroRosso" }}>
        Drivers
      </li>
      <li className="w-[200px] h-[88px] flex items-center justify-center text-3xl cursor-pointer hover:border-b-4 hover:border-crimson hover:text-crimson transition-all duration-100" style={{ fontFamily: "FerroRosso" }}>
        Standing
      </li>
      <li className="w-[200px] h-[88px] flex items-center justify-center text-3xl cursor-pointer hover:border-b-4 hover:border-crimson hover:text-crimson transition-all duration-100" style={{ fontFamily: "FerroRosso" }}>
        Qualified
      </li>
      <li className="w-[200px] h-[88px] flex items-center justify-center text-3xl cursor-pointer hover:border-b-4 hover:border-crimson hover:text-crimson transition-all duration-100" style={{ fontFamily: "FerroRosso" }}>
        Status
      </li>
      <li className="w-[200px] h-[88px] flex items-center justify-center text-3xl cursor-pointer hover:border-b-4 hover:border-crimson hover:text-crimson transition-all duration-100" style={{ fontFamily: "FerroRosso" }}>
        Schedule
      </li>
    </ul>
  </nav>
);
};

export default Navbar;
