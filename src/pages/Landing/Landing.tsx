import React from "react";
import CompanyDetails from "../../components/CompanyDetails/CompanyDetails";
import { useUserAuth } from "../../context/UserAuthContext";
import { Link } from "react-router-dom";

export default function Landing() {
  const { user } = useUserAuth();
  return (
    <div className="h-screen bg-home-bg">
      <nav className="flex justify-between items-center px-4 py-3 bg-nav-bg text-gray-50 shadow">
        <div className="font-bold">Logo</div>
        <div className="">
          <div className="">Get Started</div>
        </div>
      </nav>

      <div className=" text-center flex flex-col items-center justify-center mt-10">
        <h1 className=" font-bold text-3xl">Welcome</h1>
        <div className="flex mt-4 gap-2">
          <Link to="/home" className=" rounded shadow bg-teal-200 p-2">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
