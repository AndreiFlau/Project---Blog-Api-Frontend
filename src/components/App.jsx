import useAuth from "../hooks/useAuth";
import "../styles/App.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import PostList from "./PostList";

function App() {
  const { userData, logout } = useAuth();
  const location = useLocation();
  const isPostPage = location.pathname.includes("/post/");
  console.log(userData);

  return (
    <>
      <header>
        <h1>My Wholesome Blog</h1>
        {userData ? (
          <div>
            <button onClick={logout}>Log out!</button>
          </div>
        ) : (
          <div className="login">
            <Link to="/login">Log In here!</Link>
            <Link to="/register">Register here!</Link>
          </div>
        )}
      </header>
      {!isPostPage && <PostList />}
      <Outlet />
    </>
  );
}

export default App;
