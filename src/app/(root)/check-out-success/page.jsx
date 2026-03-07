import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { assets } from "@/constants/assets";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import { ArrowRight } from "@/components/svg/Icons";
import Link from "next/link";

const page = () => {
  return (
    <>
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", icon: assets.House, href: ROUTES.HOME },
          {
            label: "Shopping Card",
            href: ROUTES.SHOPING_CARD,
          },
          {
            label: "Checkout Success",
            href: ROUTES.CHECK_OUT_SUCCESS,
            active: true,
          },
        ]}
      />
      {/* checkout success */}
      <div className="container py-31">
        <div className="flex flex-col items-center">
          <Image
            src={assets.CheckCircleSuccess}
            alt="Check Circle Success"
            width={80}
            height={80}
            className="mb-6"
          />
          <h1 className="text-xl sm:text-2xl text-center font-semibold text-[#191C1F] mb-3">
            Your order is successfully place
          </h1>
          <p className="text-sm text-[#5F6C72] max-w-106 mx-auto text-center">
            Pellentesque sed lectus nec tortor tristique accumsan quis dictum
            risus. Donec volutpat mollis nulla non facilisis.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={ROUTES.DASHBOARD}
              className="group/icon relative flex items-center justify-center gap-2 border-2 border-[#FFE7D6] bg-transparent text-[#FA8232] h-13 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-[#FA8232] hover:text-white hover:border-[#FA8232]"
            >
              <div className="relative w-5 h-5">
                <Image
                  src={assets.Stack}
                  alt="Stack"
                  width={20}
                  height={20}
                  className="transition-opacity duration-500 opacity-100 group-hover/icon:opacity-0"
                />
                <Image
                  src={assets.Stack_White}
                  alt="Stack"
                  width={20}
                  height={20}
                  className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover/icon:opacity-100"
                />
              </div>
              Go to Dashboard
            </Link>
            <Link
              href={ROUTES.ORDER_HISTORY}
              className="flex items-center justify-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white h-13 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F] hover:border-[#FA8232]"
            >
              View Order
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
