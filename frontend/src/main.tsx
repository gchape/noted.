import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./app/router";

import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
