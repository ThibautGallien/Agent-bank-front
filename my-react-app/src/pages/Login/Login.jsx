import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../store/slices/authSlice";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Supprimer l'erreur quand l'utilisateur tape
    if (error) dispatch(clearError());
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation côté client
    if (!formData.email.trim() || !formData.password.trim()) {
      return;
    }

    try {
      const result = await dispatch(
        loginUser({
          email: formData.email.trim(),
          password: formData.password,
          rememberMe: formData.rememberMe,
        })
      ).unwrap();

      // Si succès, la redirection se fera via useEffect
    } catch (error) {
      // L'erreur est déjà gérée dans le slice
      console.error("Login failed:", error);
    }
  };

  return (
    <main className="main bg-dark login-page">
      <section className="sign-in-content">
        <i className="fa-solid fa-circle-user sign-in-icon"></i>
        <h1>Sign In</h1>

        {error && (
          <div
            style={{
              color: "#d32f2f",
              marginBottom: "1rem",
              padding: "0.5rem",
              backgroundColor: "#ffebee",
              border: "1px solid #ffcdd2",
              borderRadius: "4px",
              fontSize: "0.9rem",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Checkbox
            id="remember-me"
            checked={formData.rememberMe}
            onChange={handleCheckboxChange}
            label="Remember me"
          />
          <Button type="submit" className="sign-in-button" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </section>
    </main>
  );
}

export default Login;
