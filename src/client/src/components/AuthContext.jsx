// src/components/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get("/auth/user")
                .then(response => {
                    setUser(response.data);
                    console.log("User data fetched:", response.data);
                })
                .catch(error => {
                    console.error("Error fetching user:", error);
                });
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post("/auth/login", { username, password });
            localStorage.setItem("token", response.data.token);
            setUser(response.data.user);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const signup = async (username, email, password) => {
        try {
            const response = await axios.post("/auth/register", { username, email, password });
            localStorage.setItem("token", response.data.token);
            setUser(response.data.user);
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const value = {
        user,
        setUser,
        login,
        signup,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth, AuthContext };
