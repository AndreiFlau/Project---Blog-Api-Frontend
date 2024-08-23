import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage/ErrorPage";
import Login from "./Login";

function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        // { index: true, element: <Navigate to="posts" replace /> },
        // { path: "posts", element: <Posts /> },
        { path: "login", element: <Login /> },
      ],
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
