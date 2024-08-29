import { useState } from "react";
import useFetchCommentsByPost from "../hooks/useFetchCommentsByPost";
import PropTypes from "prop-types";
import useWriteComment from "../hooks/useWriteComment";
import formatDate from "../formatDate";

function Comments({ postId }) {
  const { comments, user, error, loading } = useFetchCommentsByPost(postId);
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
    };

    comments.push(newComment);
    setCommentContent("");
  }

  if (loading) {
    return (
      <div>
        <h4>Loading comments...</h4>
      </div>
    );
  }

  return (
    <>
      <div className="comments">
        <h4>Comments</h4>
        {!error || !comments.length === 0}
        {
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <p>{comment.content}</p>
                <p>On: {formatDate(comment.date)}</p>
                <p>By: {user.username}</p>
              </li>
            ))}
          </ul>
        }
        <button onClick={writeCommentToggleFunc}>Leave a comment:</button>
        {writeCommentToggle && (
          <form onSubmit={handleCommentSubmit}>
            <label htmlFor="commentcontent">Your comment:</label>
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
