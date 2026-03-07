import { assets } from "../../constants/assets";

export const trackOrderDetailData = {
  orderSummary: {
    orderId: "#96459761",
    details: "4 Products • Order Placed in 17 Jan, 2021 at 7:32 PM",
    totalPrice: "$1199.00",
  },
  expectedArrival: "Order expected arrival",
  expectedArrivalDate: "23 Jan, 2021",
  progressStages: [
    {
      id: 1,
      title: "Order Placed",
      icon: assets.Notebook,
      status: "completed", // completed, active, inactive
    },
    {
      id: 2,
      title: "Packaging",
      icon: assets.Package,
      status: "inactive", // current active stage
    },
    {
      id: 3,
      title: "On The Road",
      icon: assets.Truckk,
      status: "inactive", // not yet reached
    },
    {
      id: 4,
      title: "Delivered",
      icon: assets.Handshake_lg,
      status: "inactive", // not yet reached
    },
  ],
  orderActivity: [
    {
      id: 1,
      message:
        "Your order has been delivered. Thank you for shopping at Clicon!",
      date: "23 Jan, 2021",
      time: "at 7:32 PM",
      icon: assets.Doube_Checks,
      bgColor: "bg-[#EAF7E9]",
      borderColor: "border-[#D5F0D3]",
    },
    {
      id: 2,
      message:
        "Our delivery man (John Wick) Has picked-up your order for delvery.",
      date: "23 Jan, 2021",
      time: "at 2:00 PM",
      icon: assets.User_blue,
      bgColor: "bg-[#EAF6FE]",
      borderColor: "border-[#D5EDFD]",
    },
    {
      id: 3,
      message: "Your order has reached at last mile hub.",
      date: "22 Jan, 2021",
      time: "at 8:00 AM",
      icon: assets.MapPinLine,
      bgColor: "bg-[#EAF6FE]",
      borderColor: "border-[#D5EDFD]",
    },
    {
      id: 4,
      message: "Your order on the way to (last mile) hub.",
      date: "21 Jan, 2021",
      time: "at 5:32 AM",
      icon: assets.MapTrifold,
      bgColor: "bg-[#EAF6FE]",
      borderColor: "border-[#D5EDFD]",
    },
    {
      id: 5,
      message: "Your order is successfully verified.",
      date: "20 Jan, 2021",
      time: "at 7:32 PM",
      icon: assets.CheckCircle,
      bgColor: "bg-[#EAF7E9]",
      borderColor: "border-[#D5F0D3]",
    },
    {
      id: 6,
      message: "Your order has been confirmed.",
      date: "19 Jan, 2021",
      time: "at 2:01 PM",
      icon: assets.Notepad,
      bgColor: "bg-[#EAF6FE]",
      borderColor: "border-[#D5EDFD]",
    },
  ],
};
