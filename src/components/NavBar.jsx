import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token"); // ✅ Check if user is logged in
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Remove token
    navigate("/login"); // ✅ Redirect to login page
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">
        Muji{" "}
      </Link>

      <div>
        {token ? (
          <>
            <Link to="/create-quiz" className="mr-4">
              Create Quiz
            </Link>
            <Link to="/create-question" className="mr-4">
              Create Question
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-green-500 px-3 py-1 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
