"use client";
import React, { useState, useRef } from "react";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/constants/assets";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ArrowRight } from "@/components/svg/Icons";
import AddCardModal from "@/components/payment-method/AddCardModal";
import EditCardModal from "@/components/payment-method/EditCardModal";
import DeleteCardModal from "@/components/payment-method/DeleteCardModal";

const page = () => {
  const [revealedCard, setRevealedCard] = useState(null);
  const [dropdownCardId, setDropdownCardId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const getMaskedNumber = (cardNumber, cardId) => {
    if (revealedCard === cardId) return cardNumber;
    // Extract only digits
    const digitsOnly = cardNumber.replace(/\D/g, "");
    const last4 = digitsOnly.slice(-4);
    return `**** **** **** ${last4}`;
  };

  const handleCopy = (item) => {
    navigator.clipboard.writeText(item.card_number);
    setRevealedCard(item.id);
    setTimeout(() => {
      setRevealedCard(null);
    }, 2000);
  };
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setOpenDialog(false);
    setOpenEditDialog(false);
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
  const OrderStatus = [
    {
      id: 1,
      title: "Total orders",
      value: "154",
      icon: assets.Rocket,
      bg: "bg-[#EAF6FE]",
    },
    {
      id: 2,
      title: "Pending orders",
      value: "05",
      icon: assets.Receipt,
      bg: "bg-[#FFF3EB]",
    },
    {
      id: 3,
      title: "Completed orders",
      value: "149",
      icon: assets.Package,
      bg: "bg-[#FFF3EB]",
    },
  ];

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

  const orderHistory = [
    {
      id: 1,
      order_id: "#96459761",
      status: "IN PROGRESS",
      date: "Dec 30, 2019 05:18",
      total: "$1,500 (5 Products)",
    },
    {
      id: 2,
      order_id: "#71667167",
      status: "COMPLETED",
      date: "Feb 2, 2019 19:28",
      total: "$80 (11 Products)",
    },
    {
      id: 3,
      order_id: "#95214362",
      status: "CANCELED",
      date: "Mar 20, 2019 23:14",
      total: "$160 (3 Products)",
    },
    {
      id: 4,
      order_id: "#71667167",
      status: "COMPLETED",
      date: "Feb 2, 2019 19:28",
      total: "$80 (1 Products)",
    },
    {
      id: 5,
      order_id: "#51746385",
      status: "COMPLETED",
      date: "Feb 2, 2019 19:28",
      total: "$2,300 (2 Products)",
    },
    {
      id: 6,
      order_id: "#51746385",
      status: "CANCELED",
      date: "Dec 30, 2019 07:52",
      total: "$70 (1 Products)",
    },
    {
      id: 7,
      order_id: "#673971743",
      status: "COMPLETED",
      date: "Dec 7, 2019 23:26",
      total: "$220 (1 Products)",
    },
  ];
  return (
    <>
      <div className="space-y-6">
        {/* personal info */}
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">Hello, Kevin</h1>
          <p className="text-sm text-[#475156] max-w-106">
            From your account dashboard. you can easily check & view your{" "}
            <Link
              href={ROUTES.ORDER_HISTORY}
              className="text-[#2DA5F3] font-medium"
            >
              Recent Orders
            </Link>
            , manage your{" "}
            <Link
              href={ROUTES.CARDS_ADDRESS}
              className="text-[#2DA5F3] font-medium"
            >
              Shipping and Billing Addresses
            </Link>{" "}
            and edit your{" "}
            <Link
              href={ROUTES.PROFILE_SETTINGS}
              className="text-[#2DA5F3] font-medium"
            >
              Password
            </Link>{" "}
            and{" "}
            <Link
              href={ROUTES.DASHBOARD}
              className="text-[#2DA5F3] font-medium"
            >
              Account Details.
            </Link>
          </p>
        </div>
        {/* account and Billing */}
        <div className="grid grid-cols-12 gap-6">
          {/* account info */}
          <div className="col-span-4 border border-[#E4E7E9] rounded-sm">
            <div className="px-6 py-4">
              <h3 className="text-sm font-medium uppercase">Account Info</h3>
            </div>
            <div className="border-t border-[#E4E7E9] p-6 pt-5.5">
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-12 h-12">
                  <Image
                    src={assets.member_2}
                    alt="user-img"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-[#191C1F] text-base font-semibold">
                    Kevin Gilbert
                  </h3>
                  <p className="text-sm text-[#5F6C72]">
                    Dhaka - 1207, Bangladesh
                  </p>
                </div>
              </div>
              <ul className="mb-5.5 space-y-1">
                <li>
                  <span className="text-sm text-[#191C1F]">Email:</span>{" "}
                  <span className="text-sm text-[#5F6C72]">
                    kevin.gilbert@gmail.com
                  </span>
                </li>
                <li>
                  <span className="text-sm text-[#191C1F]">Sec Email:</span>{" "}
                  <span className="text-sm text-[#5F6C72]">
                    kevin12345@gmail.com
                  </span>
                </li>
                <li>
                  <span className="text-sm text-[#191C1F]">Phone:</span>{" "}
                  <span className="text-sm text-[#5F6C72]">
                    +1-202-555-0118
                  </span>
                </li>
              </ul>
              <Link
                href={ROUTES.PROFILE_SETTINGS}
                className="inline-flex items-center gap-2 border-2 border-[#D5EDFD] bg-transparent text-[#2DA5F3] h-12 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear  hover:bg-[#2DA5F3] hover:text-white hover:border-[#2DA5F3]"
              >
                Edit Account
              </Link>
            </div>
          </div>
          {/* Billing Address */}
          <div className="col-span-4 border border-[#E4E7E9] rounded-sm">
            <div className="px-6 py-4">
              <h3 className="text-sm font-medium uppercase">Billing address</h3>
            </div>
            <div className="border-t border-[#E4E7E9] p-6 pt-5.5">
              <ul className="mb-5.5 space-y-1">
                <li className="flex  flex-col space-y-2">
                  <span className="text-sm text-[#191C1F] font-medium">
                    Kevin Gilbert
                  </span>
                  <span className="text-sm text-[#5F6C72]">
                    East Tejturi Bazar, Word No. 04, Road No. 13/x, House no.
                    1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh
                  </span>
                </li>
                <li>
                  <span className="text-sm text-[#191C1F]">Phone Number:</span>{" "}
                  <span className="text-sm text-[#5F6C72]">
                    +1-202-555-0118
                  </span>
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
                className="inline-flex items-center gap-2 border-2 border-[#D5EDFD] bg-transparent text-[#2DA5F3] h-12 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear  hover:bg-[#2DA5F3] hover:text-white hover:border-[#2DA5F3]"
              >
                Edit Address
              </Link>
            </div>
          </div>
          {/* Total orders */}
          <div className="col-span-4">
            <ul className="grid grid-cols-12 gap-6">
              {OrderStatus.map((item) => (
                <li key={item.id} className="col-span-12">
                  <div
                    className={`flex items-center gap-4 p-4.25 rounded-sm ${item.bg}`}
                  >
                    <div className="w-14 h-14 bg-white grid place-content-center rounded-xs shrink-0">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-semibold text-[#191C1F]">
                        <AnimatedCounter value={item.value} />
                      </h4>
                      <p className="text-[#475156] text-sm">{item.title}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* payment options */}
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
        {/* resent orders */}
        <div className="border border-[#E4E7E9] rounded-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h3 className="text-sm font-medium uppercase">Recent Orders</h3>
            <Link
              href={ROUTES.ORDER_HISTORY}
              className="text-sm text-[#FA8232] font-semibold flex items-center gap-2 duration-500 ease-linear cursor-pointer hover:text-[#2DA5F3]"
            >
              View All <ArrowRight />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* table header */}
              <thead>
                <tr className="flex items-center gap-6 bg-[#F2F4F5] border-t border-b border-[#E4E7E9] py-2.5 px-6">
                  <th className="w-31 text-left text-[#475156] text-[12px] font-medium uppercase">
                    Order ID
                  </th>
                  <th className="w-38 text-[#475156] text-[12px] font-medium uppercase text-left">
                    Status
                  </th>
                  <th className="w-50 text-[#475156] text-[12px] font-medium uppercase text-left">
                    Date
                  </th>
                  <th className="w-62 text-[#475156] text-[12px] font-medium uppercase text-left">
                    Total
                  </th>
                  <th className="w-29 text-[#475156] text-[12px] font-medium uppercase text-left">
                    Action
                  </th>
                </tr>
              </thead>
              {/* table body */}
              <tbody className="flex flex-col px-6 py-3">
                {orderHistory.map((item) => (
                  <tr key={item.id} className="flex items-center gap-6 py-3">
                    <td className="w-31 text-sm text-[#191C1F] font-medium">
                      {item.order_id}
                    </td>
                    <td className="w-38 text-sm text-[#FA8232] font-semibold">
                      {item.status}
                    </td>
                    <td className="w-50 text-sm text-[#5F6C72]">{item.date}</td>
                    <td className="w-62 text-sm text-[#475156]">
                      {item.total}
                    </td>
                    <td className="w-29">
                      {" "}
                      <Link
                        href={ROUTES.ORDER_HISTORY_DETAILS(item.id)}
                        className="text-sm text-[#2DA5F3] font-semibold flex items-center gap-2 duration-500 ease-linear cursor-pointer hover:text-[#FA8232]"
                      >
                        View Details <ArrowRight />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* browsing histroy */}
        <div className="border border-[#E4E7E9] rounded-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h3 className="text-sm font-medium uppercase">Browsing history</h3>
            <Link
              href={ROUTES.BROWSING_HISTORY}
              className="text-sm text-[#FA8232] font-semibold flex items-center gap-2 duration-500 ease-linear cursor-pointer hover:text-[#2DA5F3]"
            >
              View All <ArrowRight />
            </Link>
          </div>
          <div className="border-t border-[#E4E7E9] p-6 pt-5.5"></div>
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
