import useAuth from "../hooks/useAuth";
import useFetchPosts from "../hooks/useFetchPosts";
import "../styles/App.css";
import { Link, Outlet } from "react-router-dom";
import formatDate from "../formatDate";
import { useState } from "react";

function App() {
  const { userData, logout } = useAuth();
  const { posts, loading, error } = useFetchPosts(userData);
  const [showSinglePost, setShowSinglePost] = useState(false);
  console.log(userData);

  function showSinglePostFunc() {
    setShowSinglePost(!showSinglePost);
  }

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
      {userData ? (
        loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <div>
            <h1>Oops... something happened: {error.message}</h1>
          </div>
        ) : (
          <div className="posts">
            <h1>Posts</h1>
            {!showSinglePost && (
              <ul>
                {posts.map(
                  (post) =>
                    post.published && (
                      <li key={post.id}>
                        <div>
                          <h2>
                            <Link to={`/post/${post.id}`} onClick={showSinglePostFunc}>
                              {post.title}
                            </Link>
                          </h2>
                          {/* <div dangerouslySetInnerHTML={{ __html: sanitizeContent(post.content) }} /> */}
                          <p>{formatDate(post.date)}</p>
                          <p>By: {post.author}</p>
                          {/* <Comments postId={post.id} /> */}
                        </div>
                      </li>
                    )
                )}
              </ul>
            )}
          </div>
        )
      ) : (
        <h1>
          No posts available. Try <Link to="/login">logging in</Link> or <Link to="/register">creating an account</Link>
        </h1>
      )}
      <Outlet context={showSinglePostFunc} />
    </>
  );
}

export default App;
