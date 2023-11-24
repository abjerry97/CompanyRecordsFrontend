import React from "react";
import { Navigate } from "react-router-dom"; // Import the appropriate authentication hook
import { useUserAuth } from "./context/UserAuthContext";
import { UserCompanyContextProvider } from "./context/UserCompanyContext";
import { UserAdminContextProvider } from "./context/UserAdminContext";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  children,
}) => {
  const { user,userProfile } = useUserAuth();

  return user && userProfile?.roles?.includes("admin")? (
    <>
      <UserAdminContextProvider>
        <UserCompanyContextProvider>{children}</UserCompanyContextProvider>
      </UserAdminContextProvider>
    </>
  ) : (
    <Navigate to="/home" replace={true} />
  );
};

export default AdminProtectedRoute;
