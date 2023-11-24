import React from "react";

export default function CompanyDetails({ company }: any) {
  const { name, numberOfUsers, numberOfProducts, percentage } = company;
  return (
    <div className=" flex   flex-col ">
      <div className="ms-10 avartar h-32 w-32 border rounded card text-center">
        no image to display
        <img src="" alt="" />
      </div>
      <ul className="ps-10 text-xs w-full mt-3">
        <li className="flex mb-3 ">
          <div className="w-4/12 font-semibold">Company Name</div>
          <div className="w-8.12">{name}</div>
        </li>
        <li className="flex mb-3">
          <div className="w-4/12 font-semibold">Number of Products</div>
          <div className="w-8.12">{numberOfProducts}</div>
        </li>
        <li className="flex mb-3">
          <div className="w-4/12 font-semibold">Number of Users</div>
          <div className="w-8.12">{numberOfUsers}</div>
        </li>
        <li className="flex mb-3">
          <div className="w-4/12 font-semibold">Percentage</div>
          <div className="w-8.12">{percentage}%</div>
        </li>
      </ul>
    </div>
  );
}
