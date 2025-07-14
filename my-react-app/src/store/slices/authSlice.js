import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "http://localhost:3001/api/v1";

// Thunks asynchrones pour les appels API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      // Appel API pour login
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Invalid credentials");
      }

      const token = data.body.token;

      // Stocker le token
      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      // Récupérer le profil utilisateur
      const profileResponse = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
        return rejectWithValue(profileData.message || "Failed to get profile");
      }

      // Stocker les données utilisateur
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("user", JSON.stringify(profileData.body));

      return {
        token,
        user: profileData.body,
        rememberMe,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ userName }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to update profile");
      }

      // Mettre à jour les données stockées
      const storage = auth.rememberMe ? localStorage : sessionStorage;
      storage.setItem("user", JSON.stringify(data.body));

      return data.body;
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// Fonction pour récupérer les données depuis le storage
const getInitialState = () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const userData =
    localStorage.getItem("user") || sessionStorage.getItem("user");

  return {
    user: userData ? JSON.parse(userData) : null,
    token: token || null,
    isAuthenticated: !!token,
    isLoading: false,
    error: null,
    rememberMe: !!localStorage.getItem("token"), // true si token dans localStorage
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    logout: (state) => {
      // Nettoyer le storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      // Reset state
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.rememberMe = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Action pour charger les données depuis le storage au démarrage
    loadFromStorage: (state) => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const userData =
        localStorage.getItem("user") || sessionStorage.getItem("user");

      if (token && userData) {
        state.token = token;
        state.user = JSON.parse(userData);
        state.isAuthenticated = true;
        state.rememberMe = !!localStorage.getItem("token");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.rememberMe = action.payload.rememberMe;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;
