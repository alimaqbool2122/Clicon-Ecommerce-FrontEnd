import React from "react";
import Image from "next/image";
import { assets } from "@/constants/assets";
import { comparisonData } from "@/data/compare/compare";

const CopmareTable = () => {
  const { tableHeader, tableBody } = comparisonData;

  return (
    <>
      <div className="container py-18">
        <div className="w-full border border-[#E4E7E9] rounded-sm overflow-x-auto">
          <table className="w-full border-collapse">
            {/* table header */}
            <thead>
              <tr>
                <th className="w-1/4 p-6 font-medium text-left">Products</th>
                {tableHeader.map((item) => (
                  <th
                    key={item.id}
                    className="w-1/4 border border-[#E4E7E9] border-t-0 border-b-0 border-r-0"
                  >
                    <div className="space-y-4 p-8">
                      <button className="cursor-pointer">
                        <Image
                          src={item.crossicon}
                          alt="XCircle"
                          width={24}
                          height={24}
                        />
                      </button>
                      <div className="space-y-4 flex flex-col justify-between h-[calc(100%-40px)]">
                        <div className="relative w-full h-68 mx-auto">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h3 className="text-base text-[#191C1F] font-normal text-left">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <button className="group/icon relative flex items-center justify-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white w-53 h-12 cursor-pointer text-base leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F]">
                            Add to Cart
                            <div className="relative w-6 h-6">
                              <Image
                                src={assets.Cart_White}
                                alt="cart-white"
                                width={24}
                                height={24}
                                className="transition-opacity duration-500 opacity-100 group-hover/icon:opacity-0"
                              />
                              <Image
                                src={assets.Cart_Black}
                                alt="cart-black"
                                width={24}
                                height={24}
                                className="absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover/icon:opacity-100"
                              />
                            </div>
                          </button>
                          <button className="group/icon relative w-12 h-12 bg-white grid place-content-center rounded-[3px] border-2 cursor-pointer border-[#FFE7D6] duration-500 ease-linear hover:border-[#FA8232] hover:text-[#FA8232]">
                            <Image
                              src={assets.Heart}
                              alt="heart"
                              width={24}
                              height={24}
                              className="transition-opacity duration-300 opacity-100 group-hover/icon:opacity-0"
                            />
                            <Image
                              src={assets.Heart_Black}
                              alt="heart-black"
                              width={24}
                              height={24}
                              className="absolute inset-0 m-auto transition-opacity duration-300 opacity-0 group-hover/icon:opacity-100"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {/* table body */}
            <tbody>
              {tableBody.map((row, index) => (
                <tr key={row.id}>
                  <td
                    className={`${
                      index % 2 === 0 ? "bg-[#F2F4F5]" : ""
                    } px-6 py-3 text-sm text-[#475156] font-medium`}
                  >
                    {row.label}
                  </td>
                  {row.items.map((item) => (
                    <td
                      key={item.id}
                      className={`${
                        index % 2 === 0 ? "bg-[#F2F4F5]" : ""
                      } px-8 py-3 border border-[#E4E7E9] border-t-0 border-b-0 border-r-0 text-sm`}
                    >
                      {item.content}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CopmareTable;
