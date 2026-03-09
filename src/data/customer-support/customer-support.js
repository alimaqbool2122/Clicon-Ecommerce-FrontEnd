import { assets } from "@/constants/assets";
import ROUTES from "@/constants/routes";
export const supportServices = [
  { id: 1, title: "Track Order", icon: assets.Truck, href: ROUTES.TRACK_ORDER },
  {
    id: 2,
    title: "Reset Password",
    icon: assets.LockOpen,
    href: ROUTES.RESET_PASSWORD,
  },
  {
    id: 3,
    title: "Payment Option",
    icon: assets.CreditCard,
    href: ROUTES.CHECK_OUT,
  },
  {
    id: 4,
    title: "User & Account",
    icon: assets.User_yellow,
    href: ROUTES.SIGIN,
  },
  {
    id: 5,
    title: "Wishlist & Compare",
    icon: assets.Stack,
    href: ROUTES.COMPARE,
  },
  {
    id: 6,
    title: "Shipping & Billing",
    icon: assets.Notepad_yellow,
    href: ROUTES.CHECK_OUT,
  },
  {
    id: 7,
    title: "Shopping Cart & Wallet",
    icon: assets.CreditCard,
    href: ROUTES.SHOPING_CARD,
  },
  {
    id: 8,
    title: "Sell on Clicon",
    icon: assets.Storefront,
    href: ROUTES.SHOP,
  },
];

export const popularTopics = [
  "How do I return my item?",
  "What are the 'Delivery Timelines'?",
  "How to cancel Clicon Order.",
  "What is Clicons Returns Policy?",
  "What is 'Discover Your Daraz Campaign 2022'?",
  "Ask the Digital and Device Community",
  "How long is the refund process?",
  "What is the Voucher & Gift Offer in this Campaign?",
  "How to change my shop name?",
];

export const contactDetails = [
  {
    id: 1,
    title: "Call us now",
    description:
      "we are available online from 9:00 AM to 5:00 PM (GMT95:45) Talk with use now",
    value: "+1-202-555-0126",
    icon: assets.PhoneCall,
    bgColor: "bg-[#EAF6FE]",
    butonText: "Call now",
    borderColor: "border-[#2DA5F3]",
    btnbg: "bg-[#2DA5F3]",
  },
  {
    id: 2,
    title: "Chat with us",
    description:
      "we are available online from 9:00 AM to 5:00 PM (GMT95:45) Talk with use now",
    value: "Support@clicon.com",
    icon: assets.ChatCircleDots,
    bgColor: "bg-[#EAF7E9]",
    butonText: "Contact Us",
    btnbg: "bg-[#2DB224]",
    borderColor: "border-[#2DB224]",
  },
];
