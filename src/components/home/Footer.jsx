import React from "react";
import Link from "next/link";
import Image from "next/image";
import { homepageContent } from "../../../data/home/home";
import { ArrowRight } from "../svg/Icons";

const Footer = () => {
  const footerbrand = homepageContent.footer.footerBrandCol;
  const productCategories = homepageContent.footer.productCategoriesCol;
  const shopLinks = homepageContent.footer.shopLinksCol;
  const appDownloadLinks = homepageContent.footer.appDownloadLinksCol;
  const popularLink = homepageContent.footer.popularLinkCol;
  return (
    <>
      <div>
        {/* Footer Top */}
        <div className="py-18 bg-[#191C1F]">
          {/* Container */}
          <div className="container">
            <div className="grid grid-cols-12 gap-x-3">
              {/* 1st Column */}
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3">
                <div className="mb-6 sm:mb-0">
                  {footerbrand.map((footerbrand, index) => (
                    <div key={index}>
                      <Link href="#">
                        <Image
                          src={footerbrand.image}
                          width={177}
                          height={48}
                          alt={footerbrand.customerText}
                        />
                      </Link>
                      <div>
                        <p className="text-[#adb5bd] text-base font-normal leading-6 py-3 mt-6">
                          {footerbrand.customerText}
                        </p>
                        <p className="text-lg leading-6 font-medium text-white">
                          {footerbrand.phone}
                        </p>
                        <p className="text-[#adb5bd] text-base font-normal leading-6 py-3">
                          {footerbrand.address1} <br />
                          {footerbrand.address2}
                        </p>
                        <p className="text-lg leading-6 font-medium text-white">
                          <Link href="mailto:info@clicon.com">
                            {footerbrand.email}
                          </Link>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2nd column */}
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2">
                <div className="mb-6 xl:mb-0">
                  <h3 className="text-[16px] leading-6 font-medium text-white mb-3 uppercase">
                    Top Category
                  </h3>
                  {productCategories.map((link, index) => (
                    <ul key={index}>
                      <li className="py-1.25">
                        <Link
                          href="#"
                          className='text-[#929FA5] text-[14px] font-medium leading-5 relative before:content-[""] before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:w-0 before:h-0.5 before:duration-300 before:ease-linear before:rounded-[30px] before:bg-[#F3DE6D] duration-300 ease-linear hover:text-white hover:pl-8 hover:before:w-6'
                        >
                          {link.footerLink}
                        </Link>
                      </li>
                    </ul>
                  ))}
                  <li className="py-1.25">
                    <Link
                      href="#"
                      className='inline-flex items-center gap-2 text-[#EBC80C] text-[14px] leading-5 font-semibold pb-1.5 relative before:content-[""] before:absolute before:left-1/2 before:bottom-0 before:-translate-x-1/2 before:h-0.5 before:w-[0%] before:bg-[#EBC80C] before:duration-400 hover:before:w-full'
                    >
                      Browse All Product
                      <ArrowRight />
                    </Link>
                  </li>
                </div>
              </div>

              {/* 3rd column */}
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2">
                <div className="mb-6 xl:mb-0">
                  <h3 className="text-[16px] leading-6 font-medium text-white mb-3 uppercase">
                    Quick links
                  </h3>
                  {shopLinks.map((link, index) => (
                    <ul key={index}>
                      <li className="py-1.25">
                        <Link
                          href="#"
                          className='text-[#929FA5] text-[14px] font-medium leading-5 relative before:content-[""] before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:w-0 before:h-0.5 before:duration-300 before:ease-linear before:rounded-[30px] before:bg-[#F3DE6D] duration-300 ease-linear hover:text-white hover:pl-8 hover:before:w-6'
                        >
                          {link.footerLink}
                        </Link>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>

              {/* 4th column */}
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2">
                <div className="mb-6 xl:mb-0">
                  <h3 className="text-[16px] leading-6 font-medium text-white mb-3 uppercase">
                    Download APp
                  </h3>
                  {appDownloadLinks.map((link, index) => (
                    <ul key={index}>
                      <li className="mb-3">
                        <Link
                          href="#"
                          className="bg-[#303639] w-44 h-17.25 py-4 px-5 inline-flex items-center rounded-sm duration-300 ease-linear hover:bg-[#FA8232]"
                        >
                          <div className="mr-4">{link.image}</div>

                          <div>
                            <p className="text-[13px] leading-2.75 text-white font-normal pb-1">
                              {link.gettext}
                            </p>
                            <p className="text-[14px] leading-5 font-semibold text-white">
                              {link.download}
                            </p>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>

              {/* 5th column */}
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3">
                <div className="">
                  <h3 className="text-[16px] leading-6 font-medium text-white mb-3 uppercase">
                    Popular Tag
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {popularLink.map((link, index) => (
                      <li key={index} className="mb-2">
                        <Link
                          href="#"
                          className="bg-[#191C1F] py-1.5 px-2.5 border border-[#343a40] text-[14px] leading-5 font-medium text-white rounded-xs duration-300 ease-linear hover:bg-[#303639] hover:border-white"
                        >
                          {link.populerlink}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer CopyRight */}
        <div className="bg-[#191C1F] p-6 shadow-[inset_0px_1px_0px_0px_rgba(48,54,57,1)]">
          <div>
            <p className="text-[14px] leading-5 font-normal text-[#ADB7BC] text-center">
              Clicon - eCommerce Template © 2025. Design by{" "}
              <Link href="#">Templatecookie</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
