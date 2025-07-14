import { Navigate } from "react-router-dom";
import { tokenUtils } from "../../services/api";

function ProtectedRoute({ children }) {
  const token = tokenUtils.getToken();

  // Si pas de token, rediriger vers login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si token présent, afficher la page demandée
  return children;
}

export default ProtectedRoute;
