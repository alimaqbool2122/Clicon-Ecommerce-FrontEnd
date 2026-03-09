"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { assets } from "@/constants/assets";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import { supportServices } from "@/data/customer-support/customer-support";
import { popularTopics } from "@/data/customer-support/customer-support";
import { contactDetails } from "@/data/customer-support/customer-support";
import Link from "next/link";
import { ArrowRight } from "@/components/svg/Icons";

const page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value === "") {
      setActiveSearch("");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearch(searchQuery);
  };

  const filteredServices = supportServices.filter((service) =>
    service.title.toLowerCase().includes(activeSearch.toLowerCase()),
  );

  const filteredTopics = popularTopics.filter((topic) =>
    topic.toLowerCase().includes(activeSearch.toLowerCase()),
  );

  return (
    <>
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", icon: assets.House, href: ROUTES.HOME },
          { label: "Pages", href: ROUTES.HOME },
          {
            label: "Customer Support",
            href: ROUTES.CUSTOMER_SUPPORT,
            active: true,
          },
        ]}
      />
      {/* top-header */}
      <div
        className="w-full h-[332px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${assets.support_header_bg.src})` }}
      >
        {/* header data */}
        <div className="container py-18">
          <span className="bg-[#EFD33D] px-4 py-2 rounded-xs text-sm text-[#191C1F] font-semibold uppercase">
            HELP CENTER
          </span>
          <h1 className="text-2xl mt-4 sm:text-[32px] text-[#191C1F] font-semibold">
            How we can help you!
          </h1>
          {/* search form */}
          <form
            onSubmit={handleSearch}
            className="w-full max-w-134 flex items-center justify-between border border-[#E4E7E9] rounded-sm p-3 mt-6"
          >
            {/* search input */}
            <div className="flex items-center gap-2 w-full pl-2.5">
              <Image
                src={assets.search_customer}
                alt="search"
                width={24}
                height={24}
                className="cursor-pointer"
              />
              <input
                type="text"
                placeholder="Enter your question or keyword"
                className="w-full outline-0 text-base text-[#77878F] placeholder:text-[#77878F]"
                value={searchQuery}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  if (val === "") {
                    setActiveSearch("");
                  }
                }}
              />
            </div>
            {/* search button */}
            <button
              type="submit"
              className="h-12 px-6 rounded-xs text-sm font-bold text-white bg-[#FA8232] uppercase cursor-pointer border-2 border-[#FA8232] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F]"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        {/* customer-support services */}
        <div className="py-18 space-y-5 sm:space-y-10">
          <h1 className="text-2xl sm:text-[32px] text-[#191C1F] text-center font-semibold">
            What can we assist you with today?
          </h1>
          <ul className="grid grid-cols-12 gap-6">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <li
                  key={service.id}
                  className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
                >
                  <Link
                    href={service.href}
                    className="flex items-center gap-4 p-6 border-2 border-[#FFE7D6] rounded-sm text-base font-medium text-[#191C1F] duration-500 ease-linear hover:border-[#FA8232] hover:shadow-[0px_8px_40px_0px_rgba(250,130,50,0.12)]"
                  >
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={32}
                      height={32}
                    />
                    {service.title}
                  </Link>
                </li>
              ))
            ) : (
              <li className="col-span-12 text-[#77878F]">
                No services match your search.
              </li>
            )}
          </ul>
        </div>
        {/* popular topics */}
        <div className="pb-18 space-y-5 sm:space-y-10 container">
          <h1 className="text-2xl mt-4 sm:text-[32px] text-[#191C1F] text-center font-semibold">
            Popular Topics
          </h1>
          <ul className="grid grid-cols-12 gap-x-6 gap-y-4 list-disc">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic, index) => (
                <li
                  key={index}
                  className="col-span-12 md:col-span-6 lg:col-span-4 group duration-400 ease-linear marker:text-[#191C1F] hover:marker:text-[#FA8232] marker:transition-colors marker:duration-500 hover:translate-x-2"
                >
                  <Link
                    href="#"
                    className="text-base text-[#191C1F] font-semibold duration-400 ease-linear group-hover:text-[#FA8232]"
                  >
                    {topic}
                  </Link>
                </li>
              ))
            ) : (
              <li className="col-span-12 text-[#77878F] list-none">
                No popular topics match your search.
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* contact us */}
      <div className="bg-[#F2F4F5] py-18">
        <div className="container space-y-10">
          <div className="flex flex-col gap-4 items-center justify-center text-center">
            <span className="bg-[#2DA5F3] px-4 py-2 rounded-xs text-sm text-white font-semibold uppercase">
              CONTACT US
            </span>
            <h1 className="text-2xl sm:text-[32px] text-[#191C1F] font-semibold sm:leading-10">
              Don’t find your answer. <br /> Contact with us
            </h1>
          </div>
          <ul className="grid grid-cols-12 gap-6 md:px-29">
            {contactDetails.map((contact) => (
              <li
                key={contact.id}
                className="col-span-12 xl:col-span-6 bg-white shadow-[0px_24px_32px_rgba(25,28,31,0.08)] rounded-sm p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6"
              >
                <div
                  className={`w-24 h-24 ${contact.bgColor} rounded-sm grid place-content-center shrink-0`}
                >
                  <Image
                    src={contact.icon}
                    alt={contact.title}
                    width={48}
                    height={48}
                  />
                </div>
                <div className="space-y-4 text-center sm:text-start">
                  <h6 className="text-lg text-[#191C1F] font-semibold leading-6">
                    {contact.title}
                  </h6>
                  <p className="text-sm text-[#5F6C72]">
                    {contact.description}
                  </p>
                  <h1 className="text-2xl sm:text-2xl text-[#191C1F] leading-8">
                    {contact.value}
                  </h1>
                  <Link
                    href={`tel:${contact.value}`}
                    className={`inline-flex items-center gap-2 mt-2 border-2 ${contact.btnbg} ${contact.borderColor} text-[#FFF] py-3.5 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F]`}
                  >
                    {contact.butonText}
                    <ArrowRight />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default page;
