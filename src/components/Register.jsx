import { useState } from "react";
import useAuth from "../hooks/useAuth";
import "../styles/App.css";
import { Link, useNavigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";

function Register() {
  const { userData, login } = useAuth();
  const { error, register } = useRegister();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);

  if (userData) {
    navigate("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await register(email, username, password, isAuthor);
    await login(username, password);
    if (!error) {
      navigate("/");
    }
  }

  return (
    <>
      {error && <h1>{error.message}</h1>}
      <div className="card">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="register">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="email@gmail.com"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="isauthor"
              name="isauthor"
              checked={isAuthor}
              onChange={(e) => setIsAuthor(e.target.checked)}
            />
            <label htmlFor="isauthor">I want to be an author</label>
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="form-link">
          Already have an account? <Link to="/login">Log in here</Link>
        </div>
      </div>
    </>
  );
}

export default Register;
