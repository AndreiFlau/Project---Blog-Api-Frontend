import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage/ErrorPage";
import Posts from "./Posts";
import Login from "./Login";

function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "posts", element: <Posts /> },
        { path: "login", element: <Login /> },
      ],
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
