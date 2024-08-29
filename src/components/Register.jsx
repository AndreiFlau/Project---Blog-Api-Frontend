import { useState } from "react";
import useAuth from "../hooks/useAuth";
import "../styles/App.css";
import { useNavigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";

function Register() {
  const { userData, login } = useAuth();
  const { error, register } = useRegister();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);

  // if (error) return <div>Oops, something happened. {error.message}</div>;

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
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="author">Author? </label>
        <input type="checkbox" id="isauthor" name="isauthor" checked={isAuthor} onChange={(e) => setIsAuthor(e.target.checked)} />
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;
