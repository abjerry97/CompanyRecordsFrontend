import React, { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setisLoading(true);
      const user = await signUp(email, password, { fullName: name });
      setisLoading(false);
      toast.success(JSON.stringify("Success"), {
        position: "top-right",
        pauseOnHover: true,
      });

      navigate("/home");
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
    <div className=" bg-auth-bg bg-gradient-to-b h-screen flex items-center justify-center">
      <div className="bg-white rounded shadow-lg w-10/12 md:w-6/12 lg:w-4/12 p-4">
        <h1 className="mb-4">SignUp</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="fullname"
            name=""
            id=""
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full border-b border-gray-800 rounded p-2 mb-3"
          />

          <input
            type="email"
            placeholder="email"
            name=""
            id=""
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full border-b border-gray-800 rounded p-2 mb-3"
          />
          <input
            type="password"
            name=""
            placeholder="password"
            id=""
            className="w-full border-b border-gray-800 rounded p-2 mb-3"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            className="mt-4 p-2 bg-rose-700 rounded shadow text-white w-full"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>

          <div className="text-center my-4">
            already have an account{" "}
            <Link to="/login" className=" text-blue-400">
              login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
