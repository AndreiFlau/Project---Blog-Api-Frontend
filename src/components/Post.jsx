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
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: sanitizeContent(post.content) }} />
      <p>{formatDate(post.date)}</p>
      <p>By: {post.author}</p>
      <Comments postId={post.id} />
      <Link to="/" onClick={showSinglePostFunc}>
        Return
      </Link>
    </>
  );
}

export default Post;
