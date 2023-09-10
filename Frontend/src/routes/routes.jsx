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
import { Protected, ProtectedCheckChildren } from "../components";
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
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/check",
        element: (
          <ProtectedCheckChildren>
            <CheckCode />
          </ProtectedCheckChildren>
        ),
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
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
      {
        path: "/organizationprofile",
        element: <OrganizationProfile />,
      },
      {
        path: "/eventdetail/:id",
        element: (
          <Protected>
            <EventDetail />
          </Protected>
        ),
      },
      {
        path: "/createevent",
        element: <CreateEvent />,
      },
      {
        path: "/citydetail/:id",
        element: (
          <Protected>
            <CityDetail />
          </Protected>
        ),
      },
      {
        path: "/registerorg",
        element: <Register />,
      },
    ],
  },
]);
