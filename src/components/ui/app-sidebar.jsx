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
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "@/contexts/authProvider";
import Link from "next/link";
import { toast } from "react-toastify";

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
  const router = useRouter();
  const { logout } = useAuth();
  const { user } = useAuth();
  const userId = user?._id || user?.id;

  // Add Profile link with userId
  const links = [
    ...sidebarLinks.slice(0, 8),
    {
      name: "Profile",
      href: ROUTES.PROFILE(userId),
      icon: <UserIcon width={20} height={20} />,
    },
    ...sidebarLinks.slice(8),
  ];

  const handleLogout = () => {
    logout();
    toast.success("User logged out successfully");
    setTimeout(() => {
      router.push(ROUTES.HOME);
    }, 2000);
  };

  return (
    <>
      <div className="hidden 2xl:block">
        <ul className="w-66 py-4 bg-white border border-[#E4E7E9] rounded-sm shadow-[0px_8px_40px_0px_rgba(0,0,0,0.08)]">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={link.name === "Log-out" ? handleLogout : undefined}
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
                  <span className="relative flex items-center gap-3">
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
