import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { USERNAME } from "./utils/constants";

const ProtectedRoute = ({ element }) => {
  const cookie = Cookies.get(USERNAME);
  console.log("cookie", cookie);

  // If not logged in → redirect to login
  if (!cookie) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → render the element
  return element;
};

export default ProtectedRoute;
