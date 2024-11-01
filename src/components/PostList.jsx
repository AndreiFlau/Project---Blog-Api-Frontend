import { Link } from "react-router-dom";
import "../styles/App.css";
import useAuth from "../hooks/useAuth";
import formatDate from "../formatDate";
import usePosts from "../hooks/usePosts";
import { useState } from "react";
import Icons from "../Icons/Icons";

function PostList() {
  const { userData } = useAuth();
  const { posts, loading, error } = usePosts();
  const [loadingWheel, setLoadingWheel] = useState(false);
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  function loadingWheelFunc() {
    setLoadingWheel(!loadingWheel);
  }

  return (
    <>
      {userData ? (
        loading ? (
          <div className="loading">
            <Icons.Wheel />
            <h1>Loading blog posts...</h1>
          </div>
        ) : error ? (
          <div>
            <h1>Oops... something happened: {error.message}</h1>
          </div>
        ) : !loadingWheel ? (
          <div className="posts">
            <h1>Posts</h1>
            <ul>
              {sortedPosts.map(
                (post) =>
                  post.published && (
                    <li key={post.id}>
                      <Link to={`/post/${post.id}`} onClick={loadingWheelFunc}>
                        <div>
                          <h2>{post.title}</h2>
                          <p>{formatDate(post.date)}</p>
                          <p>By: {post.author}</p>
                        </div>
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </div>
        ) : (
          <div className="loading">
            <Icons.Wheel />
            <h1>Loading blog post...</h1>
          </div>
        )
      ) : (
        <h1 className="warning">
          No posts available. Try <Link to="/login">logging in</Link> or <Link to="/register">creating an account</Link>
        </h1>
      )}
    </>
  );
}

export default PostList;
