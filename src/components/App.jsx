import "../styles/App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Link to="/login">Log In here!</Link>
      <Link to="/posts">Posts</Link>
      <Outlet />
    </>
  );
}

export default App;
