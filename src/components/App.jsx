import useAuth from "../hooks/useAuth";
import "../styles/App.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PostList from "./PostList";
import { useEffect } from "react";

function App() {
  const { userData, logout } = useAuth();
  const location = useLocation();
  const isPostPage = location.pathname.includes("/post/");
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  return (
    <>
      <header>
        <h1>My Wholesome Blog</h1>
        {userData && (
          <div>
            <button onClick={logout}>Log out!</button>
          </div>
        )}
      </header>
      {!isPostPage && <PostList />}
      <Outlet />
    </>
  );
}

export default App;
