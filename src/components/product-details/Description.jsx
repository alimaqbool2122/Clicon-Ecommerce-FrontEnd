import React from "react";
import { shopDetailData } from "@/data/shop-detail/shop-detail";
import Image from "next/image";

const Description = () => {
  const { description, features, shippingInformation } = shopDetailData.tabs;

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* description */}
        <div className="col-span-12 xl:col-span-6 space-y-3 xl:pr-8">
          <h4 className="text-base font-semibold text-[#191C1F]">
            Description
          </h4>
          {description.map((item, index) => (
            <div key={index} className="space-y-3">
              <p className="text-sm text-[#5F6C72]">{item.desc1}</p>
              <p className="text-sm text-[#5F6C72]">{item.desc2}</p>
            </div>
          ))}
        </div>
        <div className="col-span-12 xl:col-span-6 flex flex-col md:flex-row xl:justify-between gap-6">
          {/* featrure */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-[#191C1F]">Feature</h4>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Image
                    src={feature.icon}
                    alt={feature.label}
                    width={24}
                    height={24}
                  />
                  <span className="text-[#191C1F] text-sm">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* shipping infromation */}
          <div className="space-y-5 md:border-l md:border-[#E4E7E9] md:pl-6">
            <h4 className="text-base font-semibold text-[#191C1F]">
              Shipping Information
            </h4>
            <ul className="space-y-3">
              {shippingInformation.map((shippingInfo, index) => (
                <li key={index} className="">
                  <p className="text-[#191C1F] text-sm font-medium">
                    {shippingInfo.method}:{" "}
                    <span className="text-[#5F6C72]">{shippingInfo.time}</span>{" "}
                    <span className="text-[#5F6C72]">{shippingInfo.cost}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
