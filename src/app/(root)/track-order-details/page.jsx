import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { assets } from "../../../constants/assets";
import ROUTES from "../../../constants/routes";
import { trackOrderDetailData } from "../../../data/track-order-details/track-order-detail";
import Image from "next/image";

const page = () => {
  const {
    orderSummary,
    expectedArrival,
    expectedArrivalDate,
    progressStages,
    orderActivity,
  } = trackOrderDetailData;
  return (
    <>
      <div>
        {/* Top Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", icon: assets.House, href: ROUTES.HOME },
            { label: "Pages", href: ROUTES.HOME },
            { label: "Track Order", href: ROUTES.TRACK_ORDER },
            {
              label: "Track Order Details",
              href: ROUTES.TRACK_ORDER_DETAILS,
              active: true,
            },
          ]}
        />
        {/* container */}
        <div className="container py-18">
          {/* Track order detail card */}
          <div className="max-w-246 mx-auto border border-[#E4E7E9] rounded-sm">
            <div className="p-6 space-y-6 border-b border-[#E4E7E9]">
              {/* order-details */}
              <div className="bg-[#FDFAE7] border border-[#F7E99E] p-6 rounded-sm flex flex-wrap items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl text-[#191C1F]">
                    {orderSummary.orderId}
                  </h3>
                  <p className="text-[#475156] text-sm">
                    {orderSummary.details}
                  </p>
                </div>
                <p className="text-xl md:text-[28px] font-semibold text-[#2DA5F3] mt-3 md:mt-0">
                  {orderSummary.totalPrice}
                </p>
              </div>
              {/* expectedArrivalDate */}
              <p className="text-[#475156] text-sm">
                {expectedArrival}{" "}
                <span className="text-[#191C1F] font-semibold">
                  {expectedArrivalDate}
                </span>
              </p>
              {/* Progress bars */}
              <div
                className="relative w-full max-w-178 mx-auto"
                style={{ height: "24px" }}
              >
                {/* Background full line (inactive) */}
                <div
                  className="absolute top-1/2 left-3 right-3 -translate-y-1/2 bg-[#FA8232] opacity-30"
                  style={{ height: "8px" }}
                />
                {/* Active line — grows from left based on how many stages are completed/active */}
                {(() => {
                  const lastActiveIndex = progressStages.reduce(
                    (acc, stage, i) =>
                      stage.status === "completed" || stage.status === "active"
                        ? i
                        : acc,
                    -1,
                  );
                  if (lastActiveIndex <= 0) return null;
                  const pct =
                    (lastActiveIndex / (progressStages.length - 1)) * 100;
                  return (
                    <div
                      className="absolute top-1/2 left-3 -translate-y-1/2 bg-[#FA8232]"
                      style={{ height: "8px", width: `calc(${pct}% - 6px)` }}
                    />
                  );
                })()}
                {/* Circles absolutely positioned over the line */}
                {progressStages.map((progressStage, index) => {
                  const pct = (index / (progressStages.length - 1)) * 100;
                  return (
                    <div
                      key={progressStage.id}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                      style={{ left: `${pct}%` }}
                    >
                      {progressStage.status === "completed" ? (
                        <div className="w-6 h-6 bg-[#FA8232] rounded-full flex items-center justify-center">
                          <Image
                            src={assets.Check_white}
                            alt="tick"
                            width={12}
                            height={12}
                          />
                        </div>
                      ) : progressStage.status === "active" ? (
                        <div className="w-6 h-6 bg-[#FA8232] rounded-full" />
                      ) : (
                        <div className="w-6 h-6 border-2 border-[#FA8232] rounded-full bg-white" />
                      )}
                    </div>
                  );
                })}
              </div>
              {/* progress stages */}
              <div className="grid grid-cols-12 space-y-4 md:space-y-0">
                {progressStages.map((progressStage, index) => (
                  <div
                    key={progressStage.id}
                    className={`col-span-6 md:col-span-3 ${index >= 2 ? "opacity-50" : ""}`}
                  >
                    <div className="space-y-3">
                      <Image
                        src={progressStage.icon}
                        alt={progressStage.title}
                        width={32}
                        height={32}
                        className="mx-auto"
                      />
                      <p className="text-sm text-[#191C1F] font-medium text-center">
                        {progressStage.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* order activity */}
            <div className="p-6 space-y-6">
              <h3 className="text-lg font-medium">Order Activity</h3>
              <div className="grid grid-cols-12 gap-4">
                {orderActivity.map((item) => (
                  <div key={item.id} className="col-span-12">
                    <div className="flex flex-col sm:flex-row text-center sm:text-left items-center justify-center sm:justify-start gap-4">
                      <div
                        className={`w-12 h-12 ${item.bgColor} border ${item.borderColor} rounded-xs grid place-content-center shrink-0`}
                      >
                        <Image
                          src={item.icon}
                          alt={item.message}
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm">{item.message}</p>
                        <p className="text-sm text-[#77878F]">
                          {item.date} {item.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
