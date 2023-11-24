import { createContext, useContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const userAdminContext = createContext<any | null>(null);

export const UserAdminContextProvider = ({ children }: any) => {
  const [users, setUsers] = useState(null);
  const [selectedUserCompany, setSelectedUserCompany] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  async function getUsers() {
    const res = await makeRequest.get("user/all");
    if (res.data && res.status < 400) {
      setUsers(res.data);
      return res.data;
    } else return null;
    //  throw new Error(res.data?.response?.message);
  }
  async function getUserCompany(userId: any) {
    if(!userId)
    return null
    const res = await makeRequest.get(`company/${userId}`);
    if (res.data && res.status < 400) {
      setSelectedUserCompany(res.data);
      return res.data;
    } else return null;
    //  throw new Error(res.data?.response?.message);
  } 
  return (
    <userAdminContext.Provider
      value={{
        getUsers,
        users,
        getUserCompany,
        selectedUserCompany,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </userAdminContext.Provider>
  );
};

export function useUserAdmin() {
  return useContext(userAdminContext);
}
