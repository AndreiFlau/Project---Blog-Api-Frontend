import { useLoaderData, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/App.css";
import formatDate from "../formatDate";
import sanitizeContent from "../sanitizeHtml";
import Comments from "./Comments";

function Post() {
  const showSinglePostFunc = useOutletContext();
  const post = useLoaderData();

  return (
    <>
      <div className="post">
        <div className="title">
          <h1>{post.title}</h1>
          <p>By: {post.author}</p>
          <p>{formatDate(post.date)}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: sanitizeContent(post.content) }} />
        <Link to="/" onClick={showSinglePostFunc}>
          <button>Go back</button>
        </Link>
      </div>
      <Comments postId={post.id} />
    </>
  );
}

export default Post;
