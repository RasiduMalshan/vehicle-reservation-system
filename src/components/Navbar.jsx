import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition-all">
          Cab Booking
        </Link>

        <div className="flex space-x-6">
          <Link to="/" className="hover:text-gray-300 transition-all">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-300 transition-all">Dashboard</Link>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition-all">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300 transition-all">Login</Link>
              <Link to="/register" className="hover:text-gray-300 transition-all">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;