import { createBrowserRouter } from "react-router";
import Home from "../components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
]);

export { router };
