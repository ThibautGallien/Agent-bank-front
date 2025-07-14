const API_BASE_URL = "http://localhost:3001/api/v1";

// Service pour l'authentification
export const authAPI = {
  // Login utilisateur
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Récupérer le profil utilisateur
  getProfile: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get profile");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour le profil utilisateur
  updateProfile: async (token, userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
};

// Utilitaires pour gérer les tokens
export const tokenUtils = {
  getToken: () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  },

  setToken: (token, remember = false) => {
    if (remember) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
  },

  removeToken: () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  },

  getUserData: () => {
    const userData =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  },

  setUserData: (userData, remember = false) => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("user", JSON.stringify(userData));
  },
};
