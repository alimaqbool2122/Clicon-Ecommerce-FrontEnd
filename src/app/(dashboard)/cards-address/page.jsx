"use client";
import React, { useState } from "react";
import { ArrowRight } from "@/components/svg/Icons";
import { assets } from "@/constants/assets";
import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import AddCardModal from "@/components/payment-method/AddCardModal";
import EditCardModal from "@/components/payment-method/EditCardModal";
import DeleteCardModal from "@/components/payment-method/DeleteCardModal";

const page = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [dropdownCardId, setDropdownCardId] = useState(null);
  const [revealedCard, setRevealedCard] = useState(null);

  const paymentOption = [
    {
      id: 1,
      amount: "$95, 400.00 USD",
      card_number: "1234  1234  1234  3814",
      card_name: "Kevin Gilbert",
      card_icon: assets.Visa,
      dots_icon: assets.DotsThree,
      copy_icon: assets.Copy_White,
      expiry_date: "12/25",
      cvv: "123",
    },
    {
      id: 2,
      amount: "$87, 583.00 USD",
      card_number: "1234  1234  1234  1761",
      card_name: "Kevin Gilbert",
      card_icon: assets.mastercard,
      dots_icon: assets.DotsThree,
      copy_icon: assets.Copy_White,
      expiry_date: "12/25",
      cvv: "123",
    },
  ];

  const getMaskedNumber = (cardNumber, cardId) => {
    if (revealedCard === cardId) return cardNumber;
    const digitsOnly = cardNumber.replace(/\D/g, "");
    const last4 = digitsOnly.slice(-4);
    return `**** **** **** ${last4}`;
  };

  const handleCopy = (item) => {
    navigator.clipboard.writeText(item.card_number);
    setRevealedCard(item.id);
    setTimeout(() => setRevealedCard(null), 2000);
  };

  const handleEditClick = (item) => {
    setSelectedCard(item);
    setOpenEditDialog(true);
    setDropdownCardId(null);
  };

  const handleDeleteClick = (item) => {
    setSelectedCard(item);
    setOpenDeleteDialog(true);
    setDropdownCardId(null);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleted card:", selectedCard);
    // add your delete API call here
    setSelectedCard(null);
  };

  return (
    <>
      {/* Payment Option */}
      <div className="border border-[#E4E7E9] rounded-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-sm font-medium uppercase">Payment Option</h3>
          <button
            className="text-sm text-[#FA8232] font-semibold flex items-center gap-2 duration-500 ease-linear cursor-pointer hover:text-[#2DA5F3]"
            onClick={() => setOpenDialog(true)}
          >
            Add Card <ArrowRight />
          </button>
        </div>

        <div className="border-t border-[#E4E7E9] p-6 pt-5.5 grid grid-cols-12 gap-6">
          {paymentOption.map((item, index) => (
            <div
              key={item.id}
              className={`col-span-4 rounded-sm w-74 h-49 p-6 ${
                index % 2 === 0
                  ? "bg-[radial-gradient(98.14%_214.97%_at_0%_0%,#1B6392_0%,#124261_100%)]"
                  : "bg-[radial-gradient(98.14%_214.97%_at_0%_0%,#248E1D_0%,#2DB324_100%)]"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-base font-medium text-white">
                  {item.amount}
                </h1>
                <div className="relative">
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      setDropdownCardId(
                        dropdownCardId === item.id ? null : item.id,
                      )
                    }
                  >
                    <Image
                      src={item.dots_icon}
                      alt={item.card_name}
                      width={24}
                      height={24}
                    />
                  </button>

                  {dropdownCardId === item.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setDropdownCardId(null)}
                      />
                      <div className="absolute right-0 top-8 w-36 bg-white rounded shadow-[0px_4px_16px_rgba(0,0,0,0.08)] z-20 py-2">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-[#5F6C72] cursor-pointer hover:text-black hover:bg-gray-50 transition-colors"
                          onClick={() => handleEditClick(item)}
                        >
                          Edit Card
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-[#5F6C72] cursor-pointer hover:text-black hover:bg-gray-50 transition-colors"
                          onClick={() => handleDeleteClick(item)}
                        >
                          Delete Card
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-2">
                <span className="text-[11px] text-[#FFFFFF] opacity-75 uppercase">
                  Card number
                </span>
                <div className="flex items-center gap-1.5">
                  <p
                    className="text-xl text-white tracking-widest"
                    style={{
                      letterSpacing:
                        revealedCard === item.id ? "0.05em" : "0.1em",
                    }}
                  >
                    {getMaskedNumber(item.card_number, item.id)}
                  </p>
                  <button
                    onClick={() => handleCopy(item)}
                    className="cursor-pointer bg-transparent border-none p-0 ml-1 flex items-center"
                    title="Copy card number"
                  >
                    <Image
                      src={item.copy_icon}
                      alt="Copy card number"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Image
                  src={item.card_icon}
                  alt={item.card_name}
                  width={40}
                  height={40}
                />
                <h3 className="text-sm font-medium text-white uppercase">
                  {item.card_name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing & Shipping Address */}
      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* Billing Address */}
        <div className="col-span-6 border border-[#E4E7E9] rounded-sm">
          <div className="px-6 py-4">
            <h3 className="text-sm font-medium uppercase">Billing address</h3>
          </div>
          <div className="border-t border-[#E4E7E9] p-6 pt-5.5">
            <ul className="mb-5.5 space-y-1">
              <li className="flex flex-col space-y-2">
                <span className="text-base text-[#191C1F] font-medium">
                  Kevin Gilbert
                </span>
                <span className="text-sm text-[#5F6C72]">
                  East Tejturi Bazar, Word No. 04, Road No. 13/x, House no.
                  1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh
                </span>
              </li>
              <li>
                <span className="text-sm text-[#191C1F]">Phone Number:</span>{" "}
                <span className="text-sm text-[#5F6C72]">+1-202-555-0118</span>
              </li>
              <li>
                <span className="text-sm text-[#191C1F]">Email:</span>{" "}
                <span className="text-sm text-[#5F6C72]">
                  kevin.gilbert@gmail.com
                </span>
              </li>
            </ul>
            <Link
              href={ROUTES.PROFILE_SETTINGS}
              className="inline-flex items-center gap-2 border-2 border-[#D5EDFD] bg-transparent text-[#2DA5F3] h-12 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-[#2DA5F3] hover:text-white hover:border-[#2DA5F3]"
            >
              Edit Address
            </Link>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="col-span-6 border border-[#E4E7E9] rounded-sm">
          <div className="px-6 py-4">
            <h3 className="text-sm font-medium uppercase">Shipping Address</h3>
          </div>
          <div className="border-t border-[#E4E7E9] p-6 pt-5.5">
            <ul className="mb-5.5 space-y-1">
              <li className="flex flex-col space-y-2">
                <span className="text-base text-[#191C1F] font-medium">
                  Kevin Gilbert
                </span>
                <span className="text-sm text-[#5F6C72]">
                  East Tejturi Bazar, Word No. 04, Road No. 13/x, House no.
                  1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh
                </span>
              </li>
              <li>
                <span className="text-sm text-[#191C1F]">Phone Number:</span>{" "}
                <span className="text-sm text-[#5F6C72]">+1-202-555-0118</span>
              </li>
              <li>
                <span className="text-sm text-[#191C1F]">Email:</span>{" "}
                <span className="text-sm text-[#5F6C72]">
                  kevin.gilbert@gmail.com
                </span>
              </li>
            </ul>
            <Link
              href={ROUTES.PROFILE_SETTINGS}
              className="inline-flex items-center gap-2 border-2 border-[#D5EDFD] bg-transparent text-[#2DA5F3] h-12 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-[#2DA5F3] hover:text-white hover:border-[#2DA5F3]"
            >
              Edit Address
            </Link>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddCardModal open={openDialog} onOpenChange={setOpenDialog} />
      <EditCardModal
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        cardData={selectedCard}
      />
      <DeleteCardModal
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default page;
