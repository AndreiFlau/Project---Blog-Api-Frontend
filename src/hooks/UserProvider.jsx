import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  async function login(username, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const userDataJson = await response.json();
      // const userData = userDataJson.user;
      // const jwtToken = userDataJson.token;

      setUserData(userDataJson);
      localStorage.setItem("userData", JSON.stringify(userDataJson.user));
      localStorage.setItem("token", userDataJson.token);
      if (response.ok) {
        setMessage("Login Succesful!");
      } else {
        setMessage(userDataJson.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log(`Failed to log in: `, error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUserData(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
  }

  return <UserContext.Provider value={{ userData, loading, message, login, logout }}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
