import React from 'react'
import UserCompanyCardItem from '../UserCompanyCardItem/UserCompanyCardItem';

export default function UserCompanyCard({users}:any) {
  return (
<>   {users.map((user: any, index: any) => {
        return (
           <UserCompanyCardItem user={user} key={index}/>
        );
      })}</>
  )
}
