import React, { useState, useRef, useEffect } from "react";
import { Search } from "../svg/Icons";
import Image from "next/image";
import { assets } from "../../../constants/assets";
import Link from "next/link";

const SearchFilter = ({ searchQuery, setSearchQuery, onSearch }) => {
  const [active, setActive] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleSearchClick = () => {
    onSearch();
  };

  const options = [
    "Most Popular",
    "Best Rating",
    "Latest",
    "Price: Low to High",
    "Price: High to Low",
  ];
  return (
    <>
      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:justify-between">
        <form className="relative" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-0 font-normal text-[14px] leading-5 text-[#212529] placeholder-text border border-[#E4E7E9] rounded-xs py-3 px-4 w-full sm:min-w-106!"
          />
          <button
            type="button"
            onClick={handleSearchClick}
            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer z-10 bg-white border-none outline-none"
          >
            <Search />
          </button>
        </form>
        <div className="flex items-center justify-center gap-5.5">
          <p className="text-sm text-black shrink-0">Sort by:</p>
          <div className="relative">
            <button
              ref={btnRef}
              onClick={() => setActive(!active)}
              className="border-2! border-[#E4E7E9]! rounded-xs flex items-center justify-between h-12 px-5 min-w-45 cursor-pointer"
            >
              <span className="text-sm text-[#475156]">Most Popular</span>
              <Image
                src={assets.CaretDown_Gray}
                width={16}
                height={16}
                alt=""
                className={`transition-transform duration-300 ${
                  active ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Dropdown */}
            <div
              className={`absolute top-13 min-w-45 z-10 bg-white border border-[#E4E7E9] 
                                                rounded-[5px] shadow-[0px_8px_40px_rgba(0,0,0,0.12)]
                                                transition-all duration-400 ease-out origin-top
                                                ${
                                                  active
                                                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                                                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                                                }`}
            >
              <ul>
                {options.map((option, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-sm font-medium leading-5 text-[#6c757d] py-2.5 px-5 flex items-center justify-between hover:bg-[#F2F4F5] hover:text-[#212529]"
                    >
                      {option}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
