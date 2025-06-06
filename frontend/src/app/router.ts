import { createBrowserRouter } from "react-router";
import Home from "../components/Home";
import Login from "../features/Login";
import Register from "../features/Register";
import AddNote from "../components/AddNote";
import Notes from "../features/Notes";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "add",
        Component: AddNote,
      },
      {
        index: true,
        Component: Notes,
      },
    ],
  },
]);

export { router };
