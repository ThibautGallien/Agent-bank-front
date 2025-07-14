import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import { authAPI, tokenUtils } from "../../services/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Supprimer l'erreur quand l'utilisateur tape
    if (error) setError("");
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validation côté client
      if (!formData.email.trim() || !formData.password.trim()) {
        throw new Error("Please fill in all fields");
      }

      // Appel API login
      const response = await authAPI.login({
        email: formData.email.trim(),
        password: formData.password,
      });

      // Stocker le token de manière sécurisée
      const token = response.body.token;
      tokenUtils.setToken(token, formData.rememberMe);

      // Récupérer le profil utilisateur
      const profileResponse = await authAPI.getProfile(token);
      tokenUtils.setUserData(profileResponse.body, formData.rememberMe);

      // Redirection vers le profil
      navigate("/profile");
    } catch (error) {
      setError(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="main bg-dark"
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
          <Button type="submit" className="sign-in-button" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </section>
    </main>
  );
}

export default Login;
