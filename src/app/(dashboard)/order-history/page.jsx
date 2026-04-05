"use client";
import React, { useState } from "react";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import { ArrowRight } from "@/components/svg/Icons";
import CustomPagination from "@/components/ui/CustomPagination";

const page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const orderHistory = [
    {
      id: 1,
      order_id: "#96459761",
      status: "IN PROGRESS",
      date: "Dec 30, 2019 05:18",
      total: "$1,500 (5 Products)",
    },
    {
      id: 2,
      order_id: "#71667167",
      status: "COMPLETED",
      date: "Feb 2, 2019 19:28",
      total: "$80 (11 Products)",
    },
    {
      id: 3,
      order_id: "#95214362",
      status: "CANCELED",
      date: "Mar 20, 2019 23:14",
      total: "$160 (3 Products)",
    },
    {
      id: 4,
      order_id: "#71667167",
      status: "COMPLETED",
      date: "Feb 2, 2019 19:28",
      total: "$80 (1 Products)",
    },
    {
      id: 5,
      order_id: "#51746385",
      status: "COMPLETED",
      date: "Feb 2, 2019 19:28",
      total: "$2,300 (2 Products)",
    },
    {
      id: 6,
      order_id: "#51746385",
      status: "CANCELED",
      date: "Dec 30, 2019 07:52",
      total: "$70 (1 Products)",
    },
    {
      id: 7,
      order_id: "#673971743",
      status: "COMPLETED",
      date: "Dec 7, 2019 23:26",
      total: "$220 (1 Products)",
    },
    {
      id: 8,
      order_id: "#673971743",
      status: "COMPLETED",
      date: "Dec 7, 2019 23:26",
      total: "$220 (1 Products)",
    },
    {
      id: 9,
      order_id: "#673971743",
      status: "COMPLETED",
      date: "Dec 7, 2019 23:26",
      total: "$220 (1 Products)",
    },
    {
      id: 10,
      order_id: "#673971743",
      status: "COMPLETED",
      date: "Dec 7, 2019 23:26",
      total: "$220 (1 Products)",
    },
    {
      id: 11,
      order_id: "#673971743",
      status: "COMPLETED",
      date: "Dec 7, 2019 23:26",
      total: "$220 (1 Products)",
    },
    {
      id: 12,
      order_id: "#673971743",
      status: "COMPLETED",
      date: "Dec 7, 2019 23:26",
      total: "$220 (1 Products)",
    },
  ];
  return (
    <>
      <div className="border border-[#E4E7E9] rounded-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-sm font-medium uppercase">Order HIstory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* table header */}
            <thead>
              <tr className="flex items-center gap-6 bg-[#F2F4F5] border-t border-b border-[#E4E7E9] py-2.5 px-6">
                <th className="w-31 text-left text-[#475156] text-[12px] font-medium uppercase">
                  Order ID
                </th>
                <th className="w-38 text-[#475156] text-[12px] font-medium uppercase text-left">
                  Status
                </th>
                <th className="w-50 text-[#475156] text-[12px] font-medium uppercase text-left">
                  Date
                </th>
                <th className="w-62 text-[#475156] text-[12px] font-medium uppercase text-left">
                  Total
                </th>
                <th className="w-29 text-[#475156] text-[12px] font-medium uppercase text-left">
                  Action
                </th>
              </tr>
            </thead>
            {/* table body */}
            <tbody className="flex flex-col px-6 pt-3">
              {orderHistory.map((item) => (
                <tr key={item.id} className="flex items-center gap-6 py-3">
                  <td className="w-31 text-sm text-[#191C1F] font-medium">
                    {item.order_id}
                  </td>
                  <td className="w-38 text-sm text-[#FA8232] font-semibold">
                    {item.status}
                  </td>
                  <td className="w-50 text-sm text-[#5F6C72]">{item.date}</td>
                  <td className="w-62 text-sm text-[#475156]">{item.total}</td>
                  <td className="w-29">
                    <Link
                      href={ROUTES.ORDER_HISTORY_DETAILS(item.id)}
                      className="text-sm text-[#2DA5F3] font-semibold flex items-center gap-2 duration-500 ease-linear cursor-pointer hover:text-[#FA8232]"
                    >
                      View Details <ArrowRight />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* pagination */}
          <div className="py-6 flex items-center justify-center">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
