import { Link, useLocation, useNavigate } from "react-router-dom";
import { tokenUtils } from "../../services/api";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = tokenUtils.getToken();
  const user = tokenUtils.getUserData();
  const isLoggedIn = !!token && !!user;

  const handleLogout = () => {
    tokenUtils.removeToken();
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isLoggedIn ? (
          // Mode connecté
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa-solid fa-circle-user"></i>
              {user.userName || user.firstName}
            </Link>
            <button
              className="main-nav-item"
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "#2c3e50",
                fontWeight: "bold",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              Sign Out
            </button>
          </>
        ) : (
          // Mode non connecté
          <Link
            className={`main-nav-item ${
              location.pathname === "/login" ? "active" : ""
            }`}
            to="/login"
          >
            <i className="fa-solid fa-circle-user"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
