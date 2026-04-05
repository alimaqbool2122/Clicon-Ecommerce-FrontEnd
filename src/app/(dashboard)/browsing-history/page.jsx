"use client";
import React, { useState } from "react";

const page = () => {
  const [isOn, setIsOn] = useState(true);

  return (
    <>
      <div className="space-y-6">
        {/* search and filters */}
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-base sm:text-xl font-semibold text-[#191C1F]">
              Browsing History
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-[#191C1F] text-sm">
                Turn Browsing History on/off
              </p>
              {/* toggle button */}
              <button
                onClick={() => setIsOn(!isOn)}
                className={`w-9 h-5 rounded-full flex items-center px-1 transition-colors duration-200 ease-in-out cursor-pointer ${isOn ? "bg-[#FA8232]" : "bg-gray-300"}`}
              >
                <div
                  className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${isOn ? "translate-x-4" : "translate-x-0"}`}
                ></div>
              </button>
            </div>
          </div>
          {/* search */}
        </div>
        {/* products */}
        <div className="border border-[#E4E7E9] rounded-sm">
          <div className="px-6 py-4">
            <h3 className="text-sm font-medium uppercase">17 Oct, 2020</h3>
          </div>
          <div className="border-t border-[#E4E7E9] p-6 pt-5.5"></div>
        </div>
      </div>
    </>
  );
};

export default page;
