import { assets } from "../../constants/assets";

export const shoppingCardContent = {
  title: "Shopping Cart",
  subTitle: "Card Totals",
  couponTitle: "Coupon Code",
  tableHeader: [
    { id: "1", title: "Products" },
    { id: "2", title: "Price" },
    { id: "3", title: "Quantity" },
    { id: "4", title: "Sub-total" },
  ],
  cardTotal: [
    {
      id: "1",
      title: "Sub-total",
      price: "$320",
    },
    {
      id: "2",
      title: "Shipping",
      price: "Free",
    },
    {
      id: "3",
      title: "Discount",
      price: "$24",
    },
    {
      id: "4",
      title: "Tax",
      price: "$61.99",
    },
    {
      id: "5",
      title: "Total",
      price: "$357.99 USD",
    },
  ],
  products: [
    {
      id: "1",
      image: assets.product_14,
      title: "4K UHD LED Smart TV with Chromecast Built-in",
      price: "$70",
      oldPrice: "$99",
      subTotal: "$70",
      crossicon: assets.XCircle,
    },
    {
      id: "2",
      image: assets.product_23,
      title: "Wired Over-Ear Gaming Headphones with USB",
      price: "$250",
      subTotal: "$250",
      crossicon: assets.XCircle,
    },
  ],
};
