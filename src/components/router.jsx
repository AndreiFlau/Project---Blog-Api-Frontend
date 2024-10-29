import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage/ErrorPage";
import Login from "./Login";
import Register from "./Register";
import Post from "./Post";
import postLoader from "../loaders/postLoader";

function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        // { index: true, element: <Navigate to="posts" replace /> },
        // { path: "posts", element: <Posts /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "/post/:id", element: <Post />, loader: postLoader },
      ],
      errorElement: <ErrorPage />,
    },
    // {
    //   path: "/post/:id",
    //   element: <Post />,
    //   loader: postLoader,
    // },
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
