import Home from "../components/Home";
import Login from "../features/Login";
import Register from "../features/Register";
import AddNote from "../components/AddNote";
import Notes from "../features/Notes";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        index: true,
        Component: Notes,
      },
      {
        path: "favorites",
        Component: Notes,
      },
      {
        path: "tags/:tag",
        Component: Notes,
      },
      {
        path: "search",
        Component: Notes,
      },
      {
        path: "add",
        Component: AddNote,
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
