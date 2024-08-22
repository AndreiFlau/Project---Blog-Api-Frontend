import { useState } from "react";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function login(username, password) {
    try {
      const data = await fetch("https://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const userDataJson = await data.json();
      // const userData = userDataJson.user;
      // const jwtToken = userDataJson.token;

      setUserData(userDataJson);
      localStorage.setItem("token", userDataJson.token);
    } catch (error) {
      console.log(`Failed to log in: `, error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUserData(null);
    localStorage.removeItem("token");
  }

  return <UserContext.Provider value={{ userData, loading, error, login, logout }}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
