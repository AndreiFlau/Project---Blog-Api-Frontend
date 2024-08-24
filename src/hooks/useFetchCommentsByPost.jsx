import { useEffect, useState } from "react";

function useFetchCommentsByPost(postId) {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const result = await fetch(`http://localhost:8080/api/posts/${postId}/comments`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!result.ok) {
          throw new Error("Network response was not ok");
        }

        const resJson = await result.json();

        const userResult = await fetch(`http://localhost:8080/api/users/${resJson[0].userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const userJson = await userResult.json();

        setComments(resJson);

        setUser(userJson);
      } catch (error) {
        console.log(`Failed to fetch posts: `, error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [postId]);

  return { comments, user, loading, error };
}

export default useFetchCommentsByPost;
