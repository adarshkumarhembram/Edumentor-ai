import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const { user, loading } = useAuth();

  const navStyle = ({ isActive }) =>
    isActive ? "text-blue-700 underline" : "hover:text-purple-600";

  const handleLogout = async () => {
    await signOut(auth);
    alert("👋 Logged out successfully!");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-700">
        Edu<span className="text-purple-600">Mentor</span>
      </Link>

      <ul className="flex gap-5 font-medium text-gray-700">
        <li><NavLink to="/" className={navStyle}>Home</NavLink></li>
        <li><NavLink to="/planner" className={navStyle}>Planner</NavLink></li>
        <li><NavLink to="/summarizer" className={navStyle}>Summarizer</NavLink></li>
        <li><NavLink to="/search" className={navStyle}>Search</NavLink></li>
        {!loading && user ? (
          <>
            <li className="text-sm text-gray-600">👤 {user.email}</li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li><NavLink to="/login" className={navStyle}>Login</NavLink></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
