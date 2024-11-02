import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import "../styles/App.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { login, userData } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await login(username, password);

      if (result.success) {
        navigate("/");
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login">
          <label htmlFor="username">Username:</label>
          <input
            placeholder="coolpersonXD"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            placeholder="••••••••"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log in</button>
        </form>
        <div className="form-link">
          Don&apos;t have an account? <Link to="/register">Register in here</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
