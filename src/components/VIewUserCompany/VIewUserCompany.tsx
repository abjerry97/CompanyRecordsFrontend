import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useUserCompany } from "../../context/UserCompanyContext";
import EditCompany from "../EditCompany/EditCompany";
import { useUserAdmin } from "../../context/UserAdminContext";

export default function ViewUserCompany() {
  const { getUserCompany, createCompany, userCompany,selectedUser } = useUserAdmin();

  const queryClient = useQueryClient();
 
 
  const { isSuccess, error,isPending, status, mutate ,data} = useMutation({
    mutationFn: async () => {
      return await getUserCompany(selectedUser);
    },

    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["company"] });
      
    }, 
  });
  

  useEffect(() => {
    mutate()
   
  }, [ selectedUser])
  
  
  return (
    <>
      {!selectedUser?<>no user selected</>:isPending  ? (
        <>Loading</>
      ) : error ? (
        <>{error?.message}</>
      ) : !data ? (
        <>Data Not Found</>
      ) : (
        <>
          <EditCompany  company={data}/>
        </>
      )}
    </>
  );
}
