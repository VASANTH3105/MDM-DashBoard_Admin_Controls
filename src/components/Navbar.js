import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Device Dashboard</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/details">Details</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </nav>
  );
};

export default Navbar;
