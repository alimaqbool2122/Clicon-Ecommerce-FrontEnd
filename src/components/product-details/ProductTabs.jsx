"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Description from "./Description";
import Specification from "./Specification";
import Review from "./Review";
import AdditionalInfromation from "./AdditionalInfromation";
const tabs = [
  "Description",
  "Additional information",
  "Specification",
  "Review",
];

const tabVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } },
};

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("Description");
  return (
    <>
      <div className="container pt-18">
        {/* Tabs*/}
        <div className="border border-[#E4E7E9] rounded-sm">
          <div className="flex flex-col md:flex-row items-center justify-center border-b border-[#E4E7E9] relative">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative py-4.5 px-5 w-full md:w-auto text-sm font-semibold uppercase cursor-pointer transition-colors duration-300",
                  activeTab === tab
                    ? "text-[#191C1F]"
                    : "text-[#5F6C72] hover:text-[#191C1F]",
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FA8232]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          <div className="p-5 lg:p-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {activeTab === "Description" && <Description />}
                {activeTab === "Additional information" && (
                  <AdditionalInfromation />
                )}
                {activeTab === "Specification" && <Specification />}
                {activeTab === "Review" && <Review />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTabs;
