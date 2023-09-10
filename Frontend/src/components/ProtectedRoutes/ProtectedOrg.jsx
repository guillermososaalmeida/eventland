import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export const Protected = ({ children }) => {
  const { user } = useAuth();
  if (user?.role !== "organization" || user?.check == false) {
    return <Navigate to="/loginorg" />;
  }

  return children;
};
