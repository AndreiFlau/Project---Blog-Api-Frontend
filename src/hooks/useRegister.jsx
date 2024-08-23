import { useState } from "react";

function useRegister() {
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function register(email, username, password, isAuthor) {
    try {
      const result = await fetch(`http://localhost:8080/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, username, password, isAuthor }),
      });

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(`Failed to register user: `, error);
      setError(error);
    }
  }

  return { error, register };
}

export default useRegister;
