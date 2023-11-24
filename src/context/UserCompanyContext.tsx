import { createContext, useContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const userCompanyContext = createContext<any | null>(null);

export const UserCompanyContextProvider = ({ children }: any) => {
  const [userCompany, setCompany] = useState(null);


  async function createCompany(data: any) {
    const res = await makeRequest.post("company", data);

    if (res.data && res.status < 400) {
      setCompany(res.data);
      return res.data;
    } else throw new Error(res.data?.response?.message);
  }

  async function editCompany(companyId:any,data: any) {
    const res = await makeRequest.put(`company/${companyId}`, data);

    if (res.data && res.status < 400) {
      setCompany(res.data);
      return res.data;
    } else throw new Error(res.data?.response?.message);
  }


  async function getCompany() {
    const res = await makeRequest.get("company");
    if (res.data && res.status < 400) {
      setCompany(res.data);
      return res.data;
    } else
    return null
    //  throw new Error(res.data?.response?.message);
  }


  return (
    <userCompanyContext.Provider value={{getCompany,createCompany,editCompany,userCompany}}>
      {children}
    </userCompanyContext.Provider>
  );
};

export function useUserCompany() {
  return useContext(userCompanyContext);
}
