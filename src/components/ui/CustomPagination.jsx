"use client";
import React from "react";
import { ArrowLeft, ArrowRight } from "../svg/Icons";

const CustomPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPaginationItems = () => {
    const delta = isMobile ? 1 : 2; // Fewer neighbors on mobile
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const paginationItems = getPaginationItems();

  return (
    <div className="w-full">
      <div className="flex flex-row items-start sm:items-center gap-3 sm:gap-0 sm:justify-center">
        {/* Arrows Container - Stacked on Mobile, Split on Desktop */}
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          {/* Prev Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="size-10 flex items-center justify-center bg-white rounded-full border-2! text-[#FA8232] border-[#FA8232]! sm:mr-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft width={24} height={24} />
          </button>

          {/* Next Button - Shown here only on mobile to match screenshot */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="size-10 flex sm:hidden items-center justify-center bg-white rounded-full border-2! text-[#FA8232] border-[#FA8232]! cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight width={24} height={24} />
          </button>
        </div>

        {/* Page Numbers & Dots */}
        <ul className="flex flex-wrap items-center gap-2 sm:gap-3">
          {paginationItems.map((item, index) => (
            <li key={index}>
              {item === "..." ? (
                <span className="w-6 sm:size-10 flex items-center justify-center text-[#77878F] font-semibold">
                  {item}
                </span>
              ) : (
                <button
                  onClick={() => onPageChange(item)}
                  className="size-10 bg-white rounded-full border-2! border-[#E4E7E9]! text-[#191C1F] font-semibold text-sm! duration-300 ease-linear cursor-pointer hover:bg-[#FA8232] hover:text-white"
                  style={{
                    backgroundColor: currentPage === item ? "#FA8232" : "white",
                    borderColor: currentPage === item ? "#FA8232" : "#s",
                    color: currentPage === item ? "white" : "#191C1F",
                    border:
                      currentPage === item
                        ? "2px solid #FA8232"
                        : "2px solid #E4E7E9",
                  }}
                >
                  {item.toString().padStart(2, "0")}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Next Button - Shown here ONLY on desktop for original layout */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="hidden sm:flex size-10 items-center justify-center bg-white rounded-full border-2! text-[#FA8232] border-[#FA8232]! sm:ml-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowRight width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
