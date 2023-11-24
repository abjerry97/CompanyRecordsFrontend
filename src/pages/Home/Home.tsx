import React from "react";
import CompanyDetails from "../../components/CompanyDetails/CompanyDetails";
import { useUserAuth } from "../../context/UserAuthContext";
import CreateCompany from "../../components/CreateCompany/CreateCompany";
import { useUserCompany } from "../../context/UserCompanyContext";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Home() {
  const { user, logOut,userProfile } = useUserAuth();
  const { createCompany, getCompany, company,  } = useUserCompany();
  const { isLoading, error, data } = useQuery({
    queryKey: ["company"],
    queryFn: () =>
      getCompany().then((res: any) => {
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
          {userProfile?.roles?.includes("admin") ? (
            <div className="">
              <Link to="/admin">Admin</Link>
            </div>
          ) : (
            <> </>
          )}
          <div className=" cursor-pointer" onClick={logOut}>
            Logout
          </div>
        </div>
      </nav>
      <div className=""> 
        <div className="block lg:flex mt-4 items-center justify-center px-4 text-gray-50">
          <div className="w-full lg:w-4/12">
            <div className="mt-4 px-2">
              <h4 className=" font-semibold">Name :{user.displayName || ""}</h4>
              <p className=" font-semibold">Email : {user.email || ""}</p>
            </div>
          </div>
          <div className="w-full lg:w-8/12">
            <div className="mt-5">
              {isLoading ? (
                "loading"
              ) : error ? (
                <> {error.message}</>
              ) : data ? (
                <CompanyDetails company={data} />
              ) : (
                <CreateCompany />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
