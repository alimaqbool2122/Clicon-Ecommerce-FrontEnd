"use client";
import React from "react";
import { ArrowLeft, ArrowRight } from "../svg/Icons";

const CustomPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <ul className="flex flex-wrap items-center space-x-3">
        {/* Prev Button */}
        <li>
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="size-10 flex items-center justify-center bg-white rounded-full border-2! text-[#FA8232] border-[#FA8232]! mr-3"
          >
            <ArrowLeft width={24} height={24} />
          </button>
        </li>

        {/* Page Numbers */}
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className="size-10 bg-white rounded-full border-2! border-[#E4E7E9]! text-[#191C1F] font-semibold text-sm! duration-300 ease-linear hover:bg-[#FA8232] hover:text-white"
              style={{
                backgroundColor: currentPage === page ? "#FA8232" : "white",
                borderColor: currentPage === page ? "#FA8232" : "#E4E7E9",
                color: currentPage === page ? "white" : "#191C1F",
                border:
                  currentPage === page
                    ? "2px solid #FA8232"
                    : "2px solid #E4E7E9",
              }}
            >
              {page.toString().padStart(2, "0")}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="size-10 flex items-center justify-center bg-white rounded-full border-2! text-[#FA8232] border-[#FA8232]! ml-3"
          >
            <ArrowRight width={24} height={24} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CustomPagination;
