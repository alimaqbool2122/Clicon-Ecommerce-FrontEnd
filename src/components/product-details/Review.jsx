import React from "react";
import { Star } from "../svg/Icons";
import { assets } from "@/constants/assets";
import Image from "next/image";

const Review = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-10">
        {/* customer reviews rating */}
        <div className="col-span-12 flex items-center gap-8">
          {/* review count */}
          <div className="bg-[#FBF4CE] rounded-sm p-8 space-y-3 text-center">
            <h4 className="text-[56px] font-semibold">4.7</h4>
            <ul className="flex items-center justify-center gap-0.5">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <li key={i}>
                    <Star width={24} height={24} />
                  </li>
                ))}
            </ul>
            <p className="text-[#191C1F] font-medium text-base">
              Customer Rating{" "}
              <span className="text-[#475156] font-normal">(934,516)</span>
            </p>
          </div>
          {/* review progress */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <ul className="flex items-center gap-0.5">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <li key={i}>
                      <Star width={18} height={18} />
                    </li>
                  ))}
              </ul>
              <div className="w-106 h-1 bg-[#E4E7E9] rounded-full">
                <div className="w-78 h-1 bg-[#FA8232] rounded-full"></div>
              </div>
              <p className="text-[#191C1F] font-medium text-sm">
                63% <span className="text-[#77878F] font-normal">(94,532)</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ul className="flex items-center gap-0.5">
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <li key={i}>
                      <Star width={18} height={18} />
                    </li>
                  ))}
                <li>
                  <Image
                    src={assets.star_half}
                    alt="star"
                    width={18}
                    height={18}
                  />
                </li>
              </ul>
              <div className="w-106 h-1 bg-[#E4E7E9] rounded-full">
                <div className="w-31 h-1 bg-[#FA8232] rounded-full"></div>
              </div>
              <p className="text-[#191C1F] font-medium text-sm">
                24% <span className="text-[#77878F] font-normal">(6.717)</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ul className="flex items-center gap-0.5">
                {Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <li key={i}>
                      <Star width={18} height={18} />
                    </li>
                  ))}
                <li>
                  <Image
                    src={assets.star_half}
                    alt="star"
                    width={18}
                    height={18}
                  />
                </li>
                <li>
                  <Image
                    src={assets.star_half}
                    alt="star"
                    width={18}
                    height={18}
                  />
                </li>
              </ul>
              <div className="w-106 h-1 bg-[#E4E7E9] rounded-full">
                <div className="w-10 h-1 bg-[#FA8232] rounded-full"></div>
              </div>
              <p className="text-[#191C1F] font-medium text-sm">
                9% <span className="text-[#77878F] font-normal">(714)</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ul className="flex items-center gap-0.5">
                {Array(2)
                  .fill(null)
                  .map((_, i) => (
                    <li key={i}>
                      <Star width={18} height={18} />
                    </li>
                  ))}
                <li>
                  <Image
                    src={assets.star_half}
                    alt="star"
                    width={18}
                    height={18}
                  />
                </li>
                <li>
                  <Image
                    src={assets.star_half}
                    alt="star"
                    width={18}
                    height={18}
                  />
                </li>
                <li>
                  <Image
                    src={assets.star_half}
                    alt="star"
                    width={18}
                    height={18}
                  />
                </li>
              </ul>
              <div className="w-106 h-1 bg-[#E4E7E9] rounded-full">
                <div className="w-2 h-1 bg-[#FA8232] rounded-full"></div>
              </div>
              <p className="text-[#191C1F] font-medium text-sm">
                1% <span className="text-[#77878F] font-normal">(152)</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ul className="flex items-center gap-0.5">
                {Array(1)
                  .fill(null)
                  .map((_, i) => (
                    <li key={i}>
                      <Star width={18} height={18} />
                    </li>
                  ))}
                <li>
                  <Image
                    src={assets.star_half}
                    alt="star"
                    width={18}
                    height={18}
                  />
                </li>{" "}
                <li>
                  <Image
                    src={assets.star_half}
                    alt="star"
                    width={18}
                    height={18}
                  />
                </li>{" "}
                <li>
                  <Image
                    src={assets.star_half}
                    alt="star"
                    width={18}
                    height={18}
                  />
                </li>{" "}
                <li>
                  <Image
                    src={assets.star_half}
                    alt="star"
                    width={18}
                    height={18}
                  />
                </li>
              </ul>
              <div className="w-106 h-1 bg-[#E4E7E9] rounded-full">
                <div className="w-6 h-1 bg-[#FA8232] rounded-full"></div>
              </div>
              <p className="text-[#191C1F] font-medium text-sm">
                7% <span className="text-[#77878F] font-normal">(643)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
