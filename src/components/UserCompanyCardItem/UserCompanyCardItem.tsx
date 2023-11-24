import React, { useEffect } from "react";
import { useUserAdmin } from "../../context/UserAdminContext";

export default function UserCompanyCardItem({ user }: any) {
  const { setSelectedUser,selectedUser } = useUserAdmin();

  const handleClick = () => {
    setSelectedUser(user?.id);
  }; 
  
  return (
    <li className="my-2 rounded border border-black p-2 flex justify-between bg-auth-bg">
      <div className="">
        <div className="">Name: {user.name}</div>{" "}
        <div className="">Email {user.email}</div>
      </div>
      <div className="">
        {" "}
        <button
        disabled={!!selectedUser && selectedUser == user?.id}
          className={`${!!selectedUser && selectedUser == user?.id? "bg-gray-700": "bg-gray-200"}  rounded shadow p-2 text-xs text-black`}
          onClick={()=>handleClick()}
        >
          Edit Company 
        </button>
      </div>
    </li>
  );
}
