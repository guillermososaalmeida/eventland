import { createBrowserRouter } from "react-router-dom";

import {
  CheckCode,
  CityDetail,
  CreateEvent,
  EventDetail,
  ForgotPassword,
  Home,
  Login,
  OrganizationProfile,
  Profile,
  Register,
  Welcome,
} from "../pages";
import App from "../App";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/check",
        element: <CheckCode />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgotpassword/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/organizationprofile",
        element: <OrganizationProfile />,
      },
      {
        path: "/eventdetail/:id",
        element: <EventDetail />,
      },
      {
        path: "/createevent",
        element: <CreateEvent />,
      },
      {
        path: "/citydetail:id",
        element: <CityDetail />,
      },
    ],
  },
]);
