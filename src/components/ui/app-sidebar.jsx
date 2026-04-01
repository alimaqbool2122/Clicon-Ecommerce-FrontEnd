"use client";
import React from "react";
import {
  ClockClokWise,
  Compare,
  Dashboard,
  History,
  Location,
  LogOut,
  NoteBook,
  Setting,
  ShopingCard,
  UserIcon,
  Wishlist,
} from "../svg/Icons";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const sidebarLinks = [
  {
    name: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: <Dashboard width={20} height={20} />,
  },
  {
    name: "Order History",
    href: ROUTES.ORDER_HISTORY,
    icon: <History width={20} height={20} />,
  },
  {
    name: "Track Order",
    href: ROUTES.TRACK_ORDER,
    icon: <Location width={20} height={20} />,
  },
  {
    name: "Shopping Cart",
    href: ROUTES.SHOPING_CARD,
    icon: <ShopingCard width={20} height={20} />,
  },
  {
    name: "Wishlist",
    href: ROUTES.WISHLIST,
    icon: <Wishlist width={20} height={20} />,
  },
  {
    name: "Compare",
    href: ROUTES.COMPARE,
    icon: <Compare width={20} height={20} />,
  },
  {
    name: "Cards & Address",
    href: ROUTES.CARDS_ADDRESS,
    icon: <NoteBook width={20} height={20} />,
  },
  {
    name: "Browsing History",
    href: ROUTES.BROWSING_HISTORY,
    icon: <ClockClokWise width={20} height={20} />,
  },
  {
    name: "Profile",
    href: ROUTES.PROFILE,
    icon: <UserIcon width={20} height={20} />,
  },
  {
    name: "Setting",
    href: ROUTES.PROFILE_SETTINGS,
    icon: <Setting width={20} height={20} />,
  },
  {
    name: "Log-out",
    href: ROUTES.HOME,
    icon: <LogOut width={20} height={20} />,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <div>
        <ul className="w-66 py-4 bg-white border border-[#E4E7E9] rounded-sm shadow-[0px_8px_40px_0px_rgba(0,0,0,0.08)]">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`relative text-sm py-2.5 px-6 flex items-center gap-3 duration-300 ease-linear ${
                    isActive ? "text-white font-semibold" : "text-[#5F6C72]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActiveBackground"
                      className="absolute inset-0 bg-[#FA8232]"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-3">
                    {link.icon}
                    {link.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default AppSidebar;
