import React from "react";
import { Navigate } from "react-router-dom"; // Import the appropriate authentication hook
import { useUserAuth } from "./context/UserAuthContext";
import { UserCompanyContextProvider } from "./context/UserCompanyContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUserAuth();

  return user ? (
    <>
      <UserCompanyContextProvider>{children}</UserCompanyContextProvider>
    </>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default ProtectedRoute;
