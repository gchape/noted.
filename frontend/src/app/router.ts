import { createBrowserRouter } from "react-router";
import Home from "../components/Home";
import Favorites from "../features/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        path: "favorites",
        Component: Favorites,
      },
    ],
  },
]);

export { router };
