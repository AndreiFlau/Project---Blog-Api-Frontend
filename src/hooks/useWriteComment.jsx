import { useState } from "react";

function useWriteComment() {
  const [error, setError] = useState(null);

  async function writeComment(content, postId) {
    try {
      const result = await fetch(`http://localhost:8080/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({ content }),
      });

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(`Failed to post comment: `, error);
      setError(error);
    }
  }

  return { error, writeComment };
}

export default useWriteComment;
