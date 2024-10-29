import { redirect } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function postLoader({ params }) {
  const token = localStorage.getItem("token");

  if (!token) {
    redirect("/login");
  }

  try {
    const result = await fetch(`${API_URL}/api/posts/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!result.ok) {
      throw new Error("Network response was not ok");
    }

    const resJson = await result.json();

    const userResult = await fetch(`${API_URL}/api/users/${resJson.userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userJson = await userResult.json();

    const commentsResult = await fetch(`${API_URL}/api/posts/${params.id}/comments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (!result.ok) {
      throw new Error("Network response was not ok");
    }
    const commentsJson = await commentsResult.json();
    if (!commentsJson.error) {
      const formattedComments = await Promise.all(
        commentsJson.map(async (comment) => {
          const userResult = await fetch(`${API_URL}/api/users/${comment.userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });

          const userJson = await userResult.json();

          const formatComments = {
            content: comment.content,
            date: comment.date,
            id: comment.id,
            userId: comment.userId,
            author: userJson.username,
          };

          return formatComments;
        })
      );
      return {
        id: resJson.id,
        title: resJson.title,
        content: resJson.content,
        date: resJson.date,
        userId: resJson.userId,
        published: resJson.published,
        author: userJson.username,
        comments: formattedComments,
      };
    } else {
      return {
        id: resJson.id,
        title: resJson.title,
        content: resJson.content,
        date: resJson.date,
        userId: resJson.userId,
        published: resJson.published,
        author: userJson.username,
        comments: false,
      };
    }
  } catch (error) {
    console.log(`Failed to fetch singular post in postLoader: `, error);
  }
}

export default postLoader;
