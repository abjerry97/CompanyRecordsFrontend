import React from "react";
import CompanyDetails from "../../components/CompanyDetails/CompanyDetails";
import { useUserAuth } from "../../context/UserAuthContext";
import CreateCompany from "../../components/CreateCompany/CreateCompany";
import { useUserCompany } from "../../context/UserCompanyContext";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useUserAdmin } from "../../context/UserAdminContext";
import UserCompanyCard from "../../components/UserCompanyCard/UserCompanyCard";
import ViewUserCompany from "../../components/VIewUserCompany/VIewUserCompany";

export default function Admin() {
  const { user, logOut } = useUserAuth();
  const { users, getUsers, selectedUser } = useUserAdmin();
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      getUsers().then((res: any) => {
        return res;
      }),
  });
  return (
    <div className="min-h-screen bg-home-bg">
      <nav className="flex justify-between items-center px-4 py-3 bg-nav-bg text-gray-50 shadow">
        <div className="font-bold">
          <Link to="/">Logo</Link>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <div className="">
            <Link to="/home">Home</Link>
          </div>
          <div className=" cursor-pointer" onClick={logOut}>
            Logout
          </div>
        </div>
      </nav>
      <div className=" text-white">
        <div className=" p-4 block lg:flex">
          <div className="w-full lg:w-4/12">
            <ul>
              {isLoading ? (
                "loading"
              ) : error ? (
                <>{error.message}</>
              ) : !data ? (
                <>No User FOund</>
              ) : (
                <>
                  <UserCompanyCard users={data} />
                </>
              )}
            </ul>
          </div>
          <div className="w-full lg:w-8/12 p-4">
            <ViewUserCompany />
          </div>
        </div>
      </div>
    </div>
  );
}
