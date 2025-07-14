import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadFromStorage } from "./store/slices/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Transactions from "./pages/Transactions/Transactions";
import "./assets/css/main.css";

function App() {
  const dispatch = useDispatch();

  // Charger les données du storage au démarrage
  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/account/:accountId/transactions"
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
