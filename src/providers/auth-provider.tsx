import axios from "axios";
import { AuthBindings } from "@refinedev/core";
import { useAuth0 } from "@auth0/auth0-react";

export const useAuthProvider = (): AuthBindings => {
  const { isAuthenticated, user, logout, getIdTokenClaims } = useAuth0();

  const authProvider: AuthBindings = {
    login: async () => {
      return { success: true };
    },
    logout: async () => {
      logout({ returnTo: window.location.origin });
      return { success: true };
    },
    check: async () => {
      const token = await getIdTokenClaims();
      if (isAuthenticated && token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token.__raw}`;
        return { authenticated: true };
      }
      return {
        authenticated: false,
        redirectTo: "/login",
        logout: true,
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        if (user) {
          return {
            ...user,
            avatar: user.picture,
          };
        }
        return null;
      },
  };

  return authProvider;
};
