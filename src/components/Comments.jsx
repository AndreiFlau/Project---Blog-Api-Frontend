import useFetchCommentsByPost from "../hooks/useFetchCommentsByPost";
import PropTypes from "prop-types";

function Comments({ postId }) {
  const { comments, user, error, loading } = useFetchCommentsByPost(postId);

  if (loading) {
    return (
      <div>
        <h4>Loading comments...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h4>Oops... couldn&apos;t fetch the comments: {error.message}</h4>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div>
        <h1>There are no comments</h1>
      </div>
    );
  }

  return (
    <>
      <div className="comments">
        <h4>Comments</h4>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <p>On: {Date(comment.date)}</p>
              <p>By: {user.username}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

Comments.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default Comments;
