import { PostsContext } from "./PostsContext";
import useAuth from "./useAuth";
import useFetchPosts from "./useFetchPosts";
import PropTypes from "prop-types";

export function PostsProvider({ children }) {
  const { userData } = useAuth();
  const { posts, loading, error } = useFetchPosts(userData);

  return <PostsContext.Provider value={{ posts, loading, error }}>{children}</PostsContext.Provider>;
}

PostsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
