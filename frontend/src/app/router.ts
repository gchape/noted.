import { createBrowserRouter } from "react-router";
import Home from "../components/Home";
import Favorites from "../features/Favorites";
import Login from "../features/Login";
import Register from "../features/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        path: "favorites",
        Component: Favorites,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);

export { router };
