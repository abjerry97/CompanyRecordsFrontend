import React, { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Login() {
    const { logIn } = useUserAuth(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate()
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      try {
        setisLoading(true);
        const user = await logIn(
          email,
          password, 
        ); 
        setisLoading(false);
        toast.success(JSON.stringify("Success"), {
          pauseOnHover: true,
          position: "top-right",
        });
        navigate("/home")
      } catch (err: any) {
        await toast.error(err.message, {
          position: "top-right",
          pauseOnHover: true,
        });
        console.warn(err);
        setisLoading(false);
      }
    };
  return (
    <div className=" bg-auth-bg bg-gradient-to-b h-screen flex flex-col items-center justify-center">
        <div className=" text-white font-bold my-6 text-3xl"><Link to="/">Logo</Link></div>
      <div className="bg-white rounded shadow-lg w-10/12 md:w-6/12 lg:w-4/12 p-4">
        <h1 className="mb-4">Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            name=""
            id=""
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="w-full border-b border-gray-800 rounded p-2 mb-3"
          />
          <input
            type="password"
            name=""
            placeholder="password"
            id=""
            className="w-full border-b border-gray-800 rounded p-2 mb-3"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />

          <button className="mt-4 p-2 bg-rose-700 rounded shadow text-white w-full" disabled = {isLoading}>
            {isLoading? "Loading...": "Submit"}
          </button>
          
          <div className="text-center my-4">
            already have an account <Link to="/signup" className=" text-blue-400">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
