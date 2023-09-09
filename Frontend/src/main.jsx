import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import { routes } from "./routes/routes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={routes} />,
);
