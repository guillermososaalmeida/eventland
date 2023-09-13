import { createBrowserRouter } from "react-router-dom";

import { Welcome } from "../pages/Welcome/Welcome";
import {
  CheckCode,
  CityDetail,
  EventDetail,
  ForgotPassword,
  Home,
  Login,
  Profile,
  Register,
} from "../pages/User Pages";
import {
  RegisterOrg,
  LoginOrg,
  ForgotPasswordOrg,
  CheckCodeOrg,
  CreateEvent,
  HomeOrg,
  OrganizationProfile,
  EventDetailOrg,
} from "../pages/Organization pages";

import {
  Protected,
  ProtectedCheckChildren,
  ProtectedOrg,
  ProtectedOrgCheckChildren,
} from "../components";
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
          //  <Protected>
          <Home />
          //   </Protected>
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
        element: (
          <ProtectedOrg>
            <OrganizationProfile />
          </ProtectedOrg>
        ),
      },
      {
        path: "/eventdetail/:id",
        element: (
          //  <Protected>
          <EventDetail />
          //</Protected>
        ),
      },
      {
        path: "/createevent",
        element: <CreateEvent />,
      },
      {
        path: "/citydetail/:id",
        element: (
          //  <Protected>
          <CityDetail />
          //  </Protected>
        ),
      },
      {
        path: "/registerorg",
        element: <RegisterOrg />,
      },
      {
        path: "/checkorg",
        element: (
          <ProtectedOrgCheckChildren>
            <CheckCodeOrg />
          </ProtectedOrgCheckChildren>
        ),
      },
      {
        path: "/loginorg",
        element: <LoginOrg />,
      },
      {
        path: "/forgotpassword/forgotpasswordorg",
        element: <ForgotPasswordOrg />,
      },
      {
        path: "/homeorg",
        element: <HomeOrg />,
      },
      {
        path: "/eventdetailorg",
        element: <EventDetailOrg />,
      },
    ],
  },
]);
