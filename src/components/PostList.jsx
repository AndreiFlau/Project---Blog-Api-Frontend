import { Link } from "react-router-dom";
import "../styles/App.css";
import useAuth from "../hooks/useAuth";
import formatDate from "../formatDate";
import usePosts from "../hooks/usePosts";

function PostList() {
  const { userData } = useAuth();
  const { posts, loading, error } = usePosts();

  return (
    <>
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

            <ul>
              {posts.map(
                (post) =>
                  post.published && (
                    <li key={post.id}>
                      <div>
                        <h2>
                          <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </h2>
                        <p>{formatDate(post.date)}</p>
                        <p>By: {post.author}</p>
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>
        )
      ) : (
        <h1>
          No posts available. Try <Link to="/login">logging in</Link> or <Link to="/register">creating an account</Link>
        </h1>
      )}
    </>
  );
}

export default PostList;
