import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import i18n from "../i18n-clean";

const AuthContext = createContext(null);

function syncLanguage(language) {
  const nextLanguage = language || localStorage.getItem("ai-village-brain-language") || "en";
  localStorage.setItem("ai-village-brain-language", nextLanguage);

  if (i18n.language !== nextLanguage) {
    i18n.changeLanguage(nextLanguage);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    const rawUser = localStorage.getItem("ai-village-brain-user");
    const token = localStorage.getItem("ai-village-brain-token");

    if (rawUser) {
      try {
        const parsedUser = JSON.parse(rawUser);
        setUser(parsedUser);
        syncLanguage(parsedUser.language);
      } catch {
        localStorage.removeItem("ai-village-brain-user");
        localStorage.removeItem("ai-village-brain-token");
      }
    }

    async function hydrateSession() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");
        if (response.user) {
          localStorage.setItem("ai-village-brain-user", JSON.stringify(response.user));
          setUser(response.user);
          syncLanguage(response.user.language);
        }
      } catch {
        localStorage.removeItem("ai-village-brain-user");
        localStorage.removeItem("ai-village-brain-token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    hydrateSession();
  }, []);

  async function login(credentials) {
    const response = await api.post("/auth/login", credentials);
    localStorage.setItem("ai-village-brain-token", response.token);
    localStorage.setItem("ai-village-brain-user", JSON.stringify(response.user));
    setUser(response.user);
    syncLanguage(response.user.language);
    return response.user;
  }

  async function signup(payload) {
    const response = await api.post("/auth/signup", {
      ...payload,
      language: payload.language || localStorage.getItem("ai-village-brain-language") || "en"
    });
    localStorage.setItem("ai-village-brain-token", response.token);
    localStorage.setItem("ai-village-brain-user", JSON.stringify(response.user));
    setUser(response.user);
    syncLanguage(response.user.language);
    return response.user;
  }

  async function updateProfile(patch) {
    const response = await api.put("/user/profile", patch);
    const nextUser = response.data?.user || response.user || response.data || user;
    localStorage.setItem("ai-village-brain-user", JSON.stringify(nextUser));
    setUser(nextUser);
    syncLanguage(nextUser.language || patch.language);
    return nextUser;
  }

  function logout() {
    localStorage.removeItem("ai-village-brain-token");
    localStorage.removeItem("ai-village-brain-user");
    setUser(null);
  }

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    signup,
    updateProfile,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
