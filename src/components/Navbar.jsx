// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold tracking-wide" >
  <span className="text-blue-600">Gα</span>
  <span className="text-orange-500">ηєѕн</span>
</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className="text-gray-700 font-semibold hover:text-blue-500 transition duration-300">
              {item}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link to="/admin" className="text-gray-700 font-semibold hover:text-blue-500 transition duration-300">Admin</Link>
              <button onClick={handleLogout} className="text-red-500 font-semibold hover:text-red-700">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-gray-700 font-semibold hover:text-blue-500 transition duration-300">Login</Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={28} className="text-gray-700" /> : <FaBars size={28} className="text-gray-700" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full p-4">
          {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className="block text-gray-700 font-semibold py-2 hover:text-blue-500">
              {item}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link to="/admin" className="block text-gray-700 font-semibold py-2 hover:text-blue-500">Admin</Link>
              <button onClick={handleLogout} className="block text-red-500 font-semibold py-2 hover:text-red-700 w-full text-left">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block text-gray-700 font-semibold py-2 hover:text-blue-500">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
