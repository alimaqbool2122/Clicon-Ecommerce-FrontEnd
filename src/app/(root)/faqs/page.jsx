"use client";
import { assets } from "@/constants/assets";
import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useForm, Controller } from "react-hook-form";
import { ArrowRight } from "@/components/svg/Icons";
import Breadcrumb from "@/components/common/Breadcrumb";
import ROUTES from "@/constants/routes";

const page = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  const accordionData = [
    {
      title: "Suspendisse ultrices pharetra libero sed interdum.",
      content:
        "An accordion is a vertically stacked list of items that allows users to expand and collapse content sections.",
    },
    {
      title: "Fusce molestie condimentum facilisis.",
      content:
        "Nulla malesuada iaculis nisi, vitae sagittis lacus laoreet in. Morbi aliquet pulvinar orci non vulputate. Donec aliquet ullamcorper gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed molestie accumsan dui, non iaculis magna mattis id. Ut consectetur massa at viverra euismod. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent eget sem purus.",
      content_list: [
        "Vivamus sed est non arcu porta aliquet et vitae nulla.",
        "Integer et lacus vitae justo fermentum rutrum. In nec ultrices massa.",
        "Proin blandit nunc risus, at semper turpis sagittis nec. ",
        "Quisque ut dolor erat.",
      ],
    },
    {
      title: "Quisque quis nunc quis urna tempor lobortis vel non orci. ",
      content:
        "They’re used in FAQs, menus, and anywhere you want to organize content efficiently without overwhelming the page layout.",
    },
    {
      title:
        "Donec rutrum ultrices ante nec malesuada. In accumsan eget nisi a rhoncus.",
      content:
        "In this particular setup, only one accordion can be open at a time to keep the interface tidy.",
    },
    {
      title: "Nulla sed sapien maximus, faucibus massa vitae.",
      content:
        "In this particular setup, only one accordion can be open at a time to keep the interface tidy.",
    },
  ];

  return (
    <>
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", icon: assets.House, href: ROUTES.HOME },
          { label: "Pages", href: ROUTES.HOME },
          { label: "FAQs", href: ROUTES.FAQ, active: true },
        ]}
      />
      <div className="container py-18">
        <div className="grid grid-cols-12 gap-6">
          {/* faqs */}
          <div className="col-span-12 xl:col-span-8 space-y-10 w-full xl:max-w-190">
            <h1 className="text-2xl sm:text-[32px] text-[#191C1F] font-semibold">
              Frequently Asked Questions
            </h1>
            {/* faqs Wrapper */}
            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="space-y-5"
            >
              {accordionData.map((item, index) => (
                <AccordionItem
                  key={`item-${index}`}
                  value={`item-${index}`}
                  className="transition-all duration-500 ease-in-out border-none rounded-b-sm data-[state=open]:shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)] data-[state=open]:relative data-[state=open]:z-10"
                >
                  <AccordionTrigger className="flex items-center justify-between p-4 sm:px-6 sm:py-5 border rounded-sm data-[state=open]:rounded-b-none cursor-pointer transition-all duration-500 data-[state=open]:bg-[#FA8232] data-[state=open]:border-[#FA8232] data-[state=closed]:bg-white data-[state=closed]:border-[#E4E7E9] hover:no-underline [&>svg]:hidden group">
                    <span className="text-sm sm:text-lg font-medium duration-500 ease-in-out group-data-[state=open]:text-white group-data-[state=closed]:text-[#191C1F] text-left">
                      {item.title}
                    </span>

                    {/* Icon Switch (Plus / Minus) */}
                    <div className="group-data-[state=open]:hidden shrink-0">
                      <Image
                        src={assets.Plus_faq}
                        alt="plus faq"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="group-data-[state=open]:block hidden shrink-0">
                      <Image
                        src={assets.Minus_faq}
                        alt="minus faq"
                        width={20}
                        height={20}
                      />
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="bg-white p-4 sm:p-6 rounded-b-sm border border-t-0 border-[#E4E7E9] space-y-4">
                    <p className="text-sm text-[#475156]">{item.content}</p>
                    {item.content_list && (
                      <ul className="list-disc pl-5 space-y-2">
                        {item.content_list.map((listItem, listIndex) => (
                          <li key={listIndex} className="">
                            <p className="text-sm text-[#5F6C72]">{listItem}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          {/* send message */}
          <div className="col-span-12 xl:col-span-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-12 space-y-6 bg-[#FBF4CE] p-6 sm:p-8 rounded-sm"
            >
              {/* header */}
              <div className="col-span-12 space-y-3">
                <h1 className="text-lg text-[#191C1F] font-medium">
                  Don’t find your answer, Ask for support.
                </h1>
                <p className="text-sm text-[#475156]">
                  Interdum et malesuada fames ac ante ipsum primis in faucibus.
                  Sed molestie accumsan dui, non iaculis primis in faucibu
                  raesent eget sem purus.
                </p>
              </div>
              <div className="space-y-3 col-span-12">
                {/* Email */}
                <div>
                  <input
                    type="text"
                    className="w-full h-11 bg-white rounded-xs border border-[#F7E99E] outline-0 text-[#77878F] px-3.75 placeholder:text-[#77878F] placeholder-text"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address including @",
                      },
                    })}
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="text-[#191C1F] flex items-center gap-1.5 text-sm mt-1">
                      <Image
                        src={assets.Info_Black}
                        alt="plus faq"
                        width={20}
                        height={20}
                      />
                      {errors.email.message}
                    </p>
                  )}
                </div>
                {/* subject */}
                <div>
                  <input
                    type="text"
                    className="w-full h-11 bg-white rounded-xs border border-[#F7E99E] outline-0 text-[#77878F] px-3.75 placeholder:text-[#77878F] placeholder-text"
                    {...register("subject", {
                      required: "Subject is required",
                      minLength: {
                        value: 3,
                        message: "Subject must be at least 3 characters",
                      },
                    })}
                    placeholder="Subject"
                  />
                  {errors.subject && (
                    <p className="text-[#191C1F] flex items-center gap-1.5 text-sm mt-1">
                      <Image
                        src={assets.Info_Black}
                        alt="plus faq"
                        width={20}
                        height={20}
                      />
                      {errors.subject.message}
                    </p>
                  )}
                </div>
                {/* message */}
                <div>
                  <textarea
                    id="order_notes"
                    rows={3}
                    className="w-full bg-white rounded-xs border border-[#F7E99E] outline-0 text-[#77878F] px-3.75 py-3 placeholder:text-[#77878F] placeholder-text resize-none"
                    {...register("order_notes")}
                    placeholder="Message (Optional)"
                  />
                </div>
              </div>
              {/* submit button */}
              <button
                type="submit"
                className="col-span-12 flex items-center justify-center gap-2 border-2! border-[#FA8232]! bg-[#FA8232]! text-white h-12 w-48 text-sm! leading-px uppercase font-bold! rounded-[3px] duration-500 ease-linear hover:bg-transparent! hover:text-[#191C1F] cursor-pointer"
              >
                Send message
                <ArrowRight />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
