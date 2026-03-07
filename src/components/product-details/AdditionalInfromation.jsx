import React from "react";
import { shopDetailData } from "@/data/shop-detail/shop-detail";

const AdditionalInfromation = () => {
  const { additionalInformation } = shopDetailData.tabs;
  const { overview, additionalDetails } = additionalInformation;
  return (
    <>
      <div className="grid grid-cols-12 gap-8">
        {/* overview */}
        <div className="col-span-5 space-y-3 md:pr-8">
          <h4 className="text-base font-semibold text-[#191C1F]">Overview</h4>
          <ul className="space-y-2">
            {additionalInformation.overview.map((info, index) => (
              <li key={index} className="grid grid-cols-12 gap-6">
                <span className="text-[#191C1F] text-sm col-span-6">
                  {info.label}
                </span>
                <span className="text-[#5F6C72] text-sm col-span-6">
                  {info.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Product Warranty & Highlights */}
        <div className="col-span-7 md:border-l md:border-[#E4E7E9] md:pl-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Product Garanty */}
            <div className="space-y-6 col-span-6">
              <div className="space-y-2">
                <h4 className="text-base font-semibold text-[#191C1F]">
                  Product Warranty:
                </h4>
                <p className="text-sm text-[#5F6C72]">
                  {additionalDetails.productWarranty}
                </p>
              </div>
              {/* operatingSystem */}
              <div className="space-y-2">
                <h4 className="text-base font-semibold text-[#191C1F]">
                  Operating System:
                </h4>
                <p className="text-sm text-[#5F6C72]">
                  {additionalDetails.operatingSystem}
                </p>
              </div>
              {/* dimensions */}
              <div className="space-y-2">
                <h4 className="text-base font-semibold text-[#191C1F]">
                  Dimensions:
                </h4>
                <div className="flex flex-col gap-2">
                  <span className="text-[#191C1F] text-sm">
                    Dimensions: {""}
                    <span className="text-[#5F6C72]">
                      {additionalDetails.dimensions.size}
                    </span>
                  </span>
                  <span className="text-[#191C1F] text-sm">
                    Weight: {""}
                    <span className="text-[#5F6C72]">
                      {additionalDetails.dimensions.weight}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            {/* product Highlights */}
            <div className="space-y-3 col-span-6">
              <h4 className="text-base font-semibold text-[#191C1F]">
                Highlights:
              </h4>
              <ul className="space-y-3 list-disc  text-[#5F6C72] text-sm">
                {additionalDetails.highlights.map((highlight, index) => (
                  <li key={index}>
                    <span>{highlight}</span>
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

export default AdditionalInfromation;
