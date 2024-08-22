import { useEffect, useState } from "react";

async function useFetchPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetch() {
      try {
        const result = await fetch(`https://localhost:8080/api/posts`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const resJson = await result.json();

        setPosts[resJson];
      } catch (error) {
        console.log(`Failed to fetch posts: `, error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetch();
  });
  return { posts, loading, error };
}

export default useFetchPosts;
