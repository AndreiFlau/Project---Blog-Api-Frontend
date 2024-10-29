import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function useFetchOnePost(userData) {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const postId = useParams();

  useEffect(() => {
    if (!userData) {
      setLoading(false);
      return;
    } else {
      setLoading(true);
    }
    async function fetchPosts() {
      try {
        const result = await fetch(`${API_URL}/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!result.ok) {
          throw new Error("Network response was not ok");
        }

        const resJson = await result.json();

        const formattedPost = await Promise.all(
          resJson.map(async (post) => {
            const userResult = await fetch(`${API_URL}/api/users/${post.userId}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            const userJson = await userResult.json();

            const formattedPosts = {
              id: post.id,
              title: post.title,
              content: post.content,
              date: post.date,
              userId: post.userId,
              published: post.published,
              author: userJson.username,
            };

            return formattedPosts;
          })
        );

        setPost(formattedPost);
      } catch (error) {
        console.log(`Failed to fetch singular post: `, error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [userData, postId]);

  return { posts, loading, error };
}

export default useFetchOnePost;
