import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
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
        {isAuthenticated ? (
          // Mode connecté : [Nom] [User] [Profile] [Logout]
          <>
            <span className="main-nav-item user-name">
              {user?.userName || user?.firstName}
            </span>
            <Link className="main-nav-item" to="/user">
              <i className="fa-solid fa-circle-user"></i>
            </Link>
            <button
              className="main-nav-item settings-button"
              onClick={handleProfileClick}
            >
              <i className="fa-solid fa-cog"></i>
            </button>
            <button
              className="main-nav-item logout-button"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-power-off"></i>
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
