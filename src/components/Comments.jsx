import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useWriteComment from "../hooks/useWriteComment";
import formatDate from "../formatDate";
import { useLoaderData } from "react-router-dom";
import Icons from "../Icons/Icons";
import useAuth from "../hooks/useAuth";

function Comments({ postId }) {
  const { userData } = useAuth();
  const data = useLoaderData();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (Array.isArray(data?.comments)) {
      setComments(data.comments);
    }
  }, [data]);
  const { writeComment } = useWriteComment();
  const [writeCommentToggle, setWriteCommentToggle] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  function writeCommentToggleFunc() {
    setWriteCommentToggle(!writeCommentToggle);
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();
    await writeComment(commentContent, postId);
    setWriteCommentToggle(false);

    const newComment = {
      id: comments.length + 1,
      content: commentContent,
      date: Date.now(),
      author: userData.username,
    };

    setComments((prevComments) => [...prevComments, newComment]);
    setCommentContent("");
    alert("Comment posted :)");
  }

  return (
    <>
      <div className="comments">
        <h1>Comments</h1>
        {comments ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <p>{comment.content}</p>
                <div className="author">
                  <p>
                    <Icons.Calendar />
                    {formatDate(comment.date)}
                  </p>
                  <p>
                    <Icons.User />
                    By: {comment.author}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>There are no comments :(</p>
        )}
        <button onClick={writeCommentToggleFunc}>
          <Icons.MessageCircle />
          Leave a comment
        </button>
        {writeCommentToggle && (
          <form onSubmit={handleCommentSubmit}>
            <label htmlFor="commentcontent"></label>
            <textarea
              name="commentcontent"
              id="commentcontent"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </>
  );
}

Comments.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default Comments;
