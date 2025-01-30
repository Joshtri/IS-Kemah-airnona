// src/providers/auth-provider.ts
import { AuthBindings } from "@refinedev/core";

export const authProvider: AuthBindings = {
    onError: async (error) => {
        console.error("AuthProvider Error:", error);
        return { 
            success: false,
            error 
        };
    },
    login: async ({ username, password }) => {
        // Simulasi API request untuk login
        if (username === "admin" && password === "admin") {
            localStorage.setItem("auth", JSON.stringify({ username }));
            return {
                success: true,
                redirectTo: "/",
            };
        }
        return {
            success: false,
            error: {
                name: "LoginError",
                message: "Invalid credentials",
            },
        };
    },
    logout: async () => {
        localStorage.removeItem("auth");
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    check: async () => {
        const auth = localStorage.getItem("auth");
        if (auth) {
            return { authenticated: true };
        }
        return { authenticated: false, redirectTo: "/login" };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        const auth = localStorage.getItem("auth");
        if (auth) {
            return JSON.parse(auth);
        }
        return null;
    },
};
