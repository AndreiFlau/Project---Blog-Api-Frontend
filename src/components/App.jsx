import useAuth from "../hooks/useAuth";
import useFetchPosts from "../hooks/useFetchPosts";
import "../styles/App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  const { userData, logout } = useAuth();
  const { posts, loading, error } = useFetchPosts();
  console.log(userData);

  return (
    <>
      <header>
        <h1>My Wholesome Blog</h1>
        {userData ? (
          <div>
            <h1>Welcome back! {userData.username}</h1> <button onClick={logout}>Log out!</button>
          </div>
        ) : (
          <Link to="/login">Log In here!</Link>
        )}
      </header>
      {userData ? (
        loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Oops... something happened: {error.message}</h1>
        ) : (
          <div className="posts">
            <h1>Posts</h1>
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                  <p>{Date(post.date)}</p>
                </li>
              ))}
            </ul>
          </div>
        )
      ) : (
        <h1>
          No posts available. Try <Link to="/login">logging in</Link>
        </h1>
      )}
      <Outlet />
    </>
  );
}

export default App;
