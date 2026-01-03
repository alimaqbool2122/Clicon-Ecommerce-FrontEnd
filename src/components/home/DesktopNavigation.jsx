import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import TopBar from "./TopBar";
import { homepageContent } from "../../../data/home/home";
import {
  Facebook,
  Twitter,
  Pineterest,
  Redidt,
  Youtube,
  Instragram,
  Search,
  PhoneCall,
  CaretDown,
  CaretRight,
  ArrowRight,
} from "../svg/Icons";
import { assets } from "../../../constants/assets";
import ROUTES from "../../../constants/routes";
import Cart from "./Cart";
import UserForm from "./UserForm";

const DesktopNavigation = () => {
  const [active, setActive] = useState(false);
  const [language, setLanguage] = useState(false);
  const [currency, setCurrency] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("Dollar (USD)");
  const btnRef = useRef(null);
  const languageRef = useRef(null);
  const currencyRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setActive(false);
      }
      if (languageRef.current && !languageRef.current.contains(e.target)) {
        setLanguage(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(e.target)) {
        setCurrency(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // To show topbar only on homepage..
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { welcomeText } = homepageContent.header;
  const topbarLinks = homepageContent.header.bottomnavLinks;
  const headercta = homepageContent.header.categories;
  const innerBrand = homepageContent.header.brands;
  const features = homepageContent.header.featuredPhones;
  const discount = homepageContent.header.discountBanner;
  const socialLinks = [
    { name: "Twitter", url: "#", icon: <Twitter fill="#ffffff" /> },
    {
      name: "Facebook",
      url: "#",
      icon: <Facebook fill="#1B6392" background="#ffffff" />,
    },
    { name: "Pinterest", url: "#", icon: <Pineterest fill="#ffffff" /> },
    {
      name: "Reddit",
      url: "#",
      icon: <Redidt fill="#1B6392" background="#ffffff" />,
    },
    { name: "Youtube", url: "#", icon: <Youtube fill="#ffffff" /> },
    { name: "Instagram", url: "#", icon: <Instragram fill="#ffffff" /> },
  ];

  const languages = [
    { id: 1, language: "English", image: assets.usa, tick: assets.Check },
    { id: 2, language: "Mandarin", image: assets.man, tick: assets.Check },
    { id: 3, language: "Russian", image: assets.rus, tick: assets.Check },
  ];

  const currencies = [
    { id: 1, currency: "Dollar (USD)", tick: assets.Check },
    { id: 2, currency: "Euro (EUR)", tick: assets.Check },
  ];

  return (
    <>
      {/* TopBar */}
      {isHome && <TopBar />}

      {/* Desktop Navigation */}

      {/* Top Nav */}
      <div className="bg-[#1B6392] border-b border-[#FFFFFF29] hidden lg:block">
        {/* Container */}
        <div className="container">
          <div className="flex items-center justify-between py-3.5">
            <div>
              <p className="text-sm leading-5 font-normal text-white">
                {welcomeText}
              </p>
            </div>

            <div className="flex items-center">
              {/* social wrapper */}
              <div className="border-r border-[#FFFFFF29]">
                <ul className="flex items-center">
                  <li className="text-sm text-white mr-3">Follow us:</li>
                  {socialLinks.map((social) => (
                    <li key={social.name} className="mr-3">
                      <Link href={social.url}>{social.icon}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Currency & language Wrapper */}
              <div className="flex items-center">
                {/* language */}
                <div className="relative" ref={languageRef}>
                  <span
                    className="text-sm text-white flex items-center gap-2 pl-6 pr-7.5 cursor-pointer"
                    onClick={() => setLanguage(!language)}
                  >
                    {selectedLanguage}
                    <Image
                      src={assets.CaretDown}
                      alt="caret-down"
                      width={14}
                      height={14}
                      className={`transition-transform duration-300 ${
                        language ? "" : "rotate-180"
                      }`}
                    />
                  </span>
                  {/* language dropdown */}
                  <div
                    className={`w-45 absolute top-7.5 right-8 py-2 bg-white border border-[#E4E7E9] rounded-sm z-10 shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]
                    transition-all duration-400 ease-out origin-top
                    ${
                      language
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }
                  `}
                  >
                    <div>
                      {languages.map((language) => (
                        <div
                          key={language.id}
                          className={`py-2 px-4 flex items-center justify-between cursor-pointer ${
                            selectedLanguage !== language.language
                              ? "hover:bg-[#f2f4f5]"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedLanguage(language.language);
                            setLanguage(false);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <Image
                              src={language.image}
                              alt={language.language}
                              width={24}
                              height={24}
                              className="border border-[#E4E7E9] rounded-full shrink-0"
                            />
                            <span
                              className={`text-sm font-medium ${
                                selectedLanguage === language.language
                                  ? "text-[#191C1F]"
                                  : "text-[#5F6C72]"
                              }`}
                            >
                              {language.language}
                            </span>
                          </div>
                          <div>
                            {selectedLanguage === language.language && (
                              <Image
                                src={language.tick}
                                alt="check"
                                width={16}
                                height={16}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Currency */}
                <div className="relative" ref={currencyRef}>
                  <span
                    className="text-sm text-white flex items-center gap-2 pl-6 pr-7.5 cursor-pointer"
                    onClick={() => setCurrency(!currency)}
                  >
                    {selectedCurrency}
                    <Image
                      src={assets.CaretDown}
                      alt="caret-down"
                      width={14}
                      height={14}
                      className={`transition-transform duration-300 ${
                        currency ? "" : "rotate-180"
                      }`}
                    />
                  </span>
                  {/* currency dropdown */}
                  <div
                    className={`w-45 absolute top-7.5 left-0 xl:left-6 py-2 bg-white border border-[#E4E7E9] rounded-sm z-10 shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]
                    transition-all duration-400 ease-out origin-top
                    ${
                      currency
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }
                  `}
                  >
                    <div>
                      {currencies.map((curency) => (
                        <div
                          key={curency.id}
                          className={`py-2 px-4 flex items-center justify-between cursor-pointer ${
                            selectedCurrency !== curency.currency
                              ? "hover:bg-[#f2f4f5]"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedCurrency(curency.currency);
                            setCurrency(false);
                          }}
                        >
                          <div className="">
                            <span
                              className={`text-sm font-medium ${
                                selectedCurrency === curency.currency
                                  ? "text-[#FA8232]"
                                  : "text-[#5F6C72]"
                              }`}
                            >
                              {curency.currency}
                            </span>
                          </div>
                          <div>
                            {selectedCurrency === curency.currency && (
                              <Image
                                src={curency.tick}
                                alt="check"
                                width={16}
                                height={16}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Nav */}
      <div className="bg-[#1B6392] hidden lg:block">
        {/* Container */}
        <div className="container">
          <div className="flex items-center justify-between py-5">
            {/* Header Logo */}
            <div className="logo">
              <Link href={ROUTES.HOME}>
                <Image
                  src={assets.logo_white}
                  width={177}
                  height={48}
                  alt="logo-pic"
                />
              </Link>
            </div>

            {/* Header Search Form */}
            <div className="">
              <form
                action="#"
                className="w-125 2xl:w-161.5 relative h-12 bg-white shadow-[0px_8px_32px_0px_#00000014] px-5 py-3.5 rounded-xs"
              >
                <input
                  type="text"
                  placeholder="Search for anything..."
                  className="outline-0 font-normal text-[14px] leading-5 text-[#212529] pr-7.5 placeholder-text"
                />

                <div className="absolute top-[50%] right-5 translate-y-[-50%] cursor-pointer">
                  <Search />
                </div>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-6 text-white">
              {/* Add to cart */}
              <Cart />
              {/* Wishlist */}
              <div>
                <button>
                  <Image
                    src={assets.Heart_White}
                    alt="cart-white"
                    width={32}
                    height={32}
                    className=""
                  />
                </button>
              </div>
              {/* user */}
              <UserForm />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="lg:bg-white border-b-2 border-[#f2f4f5] hidden lg:block">
        {/* Container */}
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <div className="relative">
                <button
                  ref={btnRef}
                  onClick={() => setActive(!active)}
                  className={`flex items-center gap-1.5 py-3.5 px-6 rounded-sm text-sm! font-medium leading-5 
                                    ${
                                      active
                                        ? "bg-[#FA8232]! text-white!"
                                        : "bg-[#F2F4F5]! text-[#191C1F]!"
                                    }
                                    transition-colors duration-300`}
                >
                  All Category
                  <span
                    className={`inline-block transition-transform duration-300 
                                        ${active ? "rotate-180" : "rotate-0"}`}
                  >
                    <CaretDown />
                  </span>
                </button>

                {/* Animated Dropdown */}
                <div
                  className={`
                                            absolute top-16 min-w-60 z-10
                                            bg-white border border-[#E4E7E9] rounded-[3px] shadow-[0px_8px_40px_rgba(0,0,0,0.12)]
                                            transition-all duration-400 ease-out origin-top

                                            ${
                                              active
                                                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                                            }
                                            `}
                >
                  <ul className="py-3">
                    {headercta.map((headernav, index) => (
                      <li key={index} className="relative group">
                        <Link
                          href={headernav.href}
                          className="text-[14px] font-medium leading-5 text-[#6c757d] py-2 px-4 flex items-center justify-between group duration-400 hover:bg-[#F2F4F5] hover:text-[#212529]"
                        >
                          {headernav.label}

                          {/* Show right arrow ONLY for SmartPhone */}
                          {headernav.label === "SmartPhone" && (
                            <span className="invisible duration-150 group-hover:visible">
                              <CaretRight />
                            </span>
                          )}
                        </Link>

                        {/* Show Submenu for SmartPhone */}
                        {headernav.label === "SmartPhone" && (
                          <div className="lg:hidden absolute top-0 left-[105%] bg-white border border-[#E4E7E9] rounded-[3px] shadow-[0px_8px_40px_rgba(0,0,0,0.12)] xl:w-217 z-2 p-5 xl:flex items-center duration-500 invisible opacity-0 group-hover:visible group-hover:opacity-100">
                            {/* ineer categories */}
                            <ul className="min-w-41 mr-5">
                              {innerBrand.map((innerlink, index) => (
                                <li key={index}>
                                  <Link
                                    href={innerlink.href}
                                    className="text-[14px] font-medium leading-5 text-[#6c757d] py-2 px-4 flex items-center justify-between duration-400 hover:bg-[#F2F4F5] hover:text-[#212529]"
                                  >
                                    {innerlink.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            {/* featured phoes */}
                            <div className="grid grid-cols-12 gap-5">
                              <div className="col-span-6">
                                <h6 className="text-base leading-6 font-semibold text-[#212529] mb-4">
                                  FEATURED PHONES
                                </h6>
                                <div className="grid grid-cols-12 gap-4">
                                  {features.map((features, index) => (
                                    <Link
                                      key={index}
                                      href="#"
                                      className="p-3 border border-[#e4e7e9] bg-white rounded-[3px] flex items-center gap-3 col-span-12"
                                    >
                                      <div className="shrink-0">
                                        <Image
                                          src={features.image}
                                          width={80}
                                          height={80}
                                          alt={features.title}
                                        />
                                      </div>

                                      <div>
                                        <p className="text-[14px] text-[#212529] leading-5 font-medium mb-1">
                                          {features.title}
                                        </p>
                                        <span className="text-[#2DA5F3] text-[14px] leading-5 font-semibold">
                                          <del className="text-[#929FA5] mr-1.25">
                                            {features.oldPrice}
                                          </del>
                                          {features.price}
                                        </span>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                              {discount.map((discount, index) => (
                                <div
                                  key={index}
                                  className="col-span-6 bg-[#F7E99E] p-8 rounded-sm"
                                >
                                  <Image
                                    src={discount.image}
                                    width={248}
                                    height={96}
                                    alt={discount.title}
                                  />

                                  <h2 className="mt-3 mb-2 text-[28px] text-[#212529] font-bold leading-8 text-center">
                                    {discount.title}
                                  </h2>
                                  <p className="text-[15.9px] text-[#475156] font-extralight text-center">
                                    {discount.description}
                                  </p>
                                  <span className="mt-4 mb-6 flex items-center justify-center text-center">
                                    <span className="text-[14px] text-[#475156] font-extralight mr-2 text-center">
                                      Starting price:
                                    </span>
                                    <span className="py-1.5 px-3 bg-white text-[#212529] text-[16px] leading-6 font-semibold rounded-[3px] text-center">
                                      $99 USD
                                    </span>
                                  </span>
                                  <Link
                                    href="#"
                                    className="flex items-center justify-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white py-3.75 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-300 ease-linear hover:bg-transparent hover:text-[#191C1F]"
                                  >
                                    Shop now
                                    <ArrowRight />
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Top Services */}
              <div className="">
                <ul className="flex items-center gap-6">
                  {topbarLinks.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-1.25 text-sm leading-6 
                                                font-normal text-[#5F6C72] duration-300 ease-linear 
                                                hover:text-[#FA8232]"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="tel flex items-center gap-2">
              <span>
                <PhoneCall />
              </span>
              <span className="text-[18px] leading-6 font-normal text-[#191C1F]">
                +1-202-555-0104
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopNavigation;
