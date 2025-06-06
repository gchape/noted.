import { createBrowserRouter } from "react-router";
import Home from "../components/Home";
import Login from "../features/Login";
import Register from "../features/Register";
import AddNote from "../components/AddNote";

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
    ],
  },
]);

export { router };
