import { NavLink } from "react-router-dom";
import { FaHome, FaFolder, FaChevronDown } from "react-icons/fa";

const activeLink = "flex items-center gap-2 border-b-2 border-blue-600 text-blue-600 font-medium";
const normalLink = "flex items-center gap-2 border-b-2 border-transparent text-gray-600 hover:text-blue-600";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h1 className="text-2xl font-bold text-blue-600">Notes App</h1>

          <div className="hidden md:flex gap-6 h-16 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FaHome /> Home
            </NavLink>

            <NavLink
              to="/categories"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FaFolder /> Categories
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-2 cursor-pointer text-sm">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            A
          </div>
          <span className="font-medium">Aman Kumar</span>
          <FaChevronDown className="text-xs" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
