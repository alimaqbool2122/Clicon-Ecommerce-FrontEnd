"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/constants/assets";
import ROUTES from "@/constants/routes";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCompare } from "@/redux/services/compareSlice";
import { addToCart } from "@/redux/services/cartSlice";
import { toggleWishlistItem } from "@/redux/services/wishlistSlice";
import { toast } from "react-toastify";

function getFact(item, needle) {
  return item.facts?.find((f) => String(f.label).includes(needle))?.title;
}

function StockBadge({ text }) {
  const raw = text || "—";
  const t = raw.toLowerCase();
  const out = t.includes("out");
  return (
    <span
      className={`text-sm font-semibold ${out ? "text-[#EE5858]" : "text-[#2DB224]"}`}
    >
      {raw === "—" ? "—" : raw.toUpperCase()}
    </span>
  );
}

const COMPARE_ROWS = [
  { key: "rating", label: "Customer feedback:" },
  { key: "price", label: "Price:" },
  { key: "soldBy", label: "Sold by:" },
  { key: "brand", label: "Brand:" },
  { key: "model", label: "Model / SKU:" },
  { key: "stock", label: "Stock status:" },
  { key: "config", label: "Configuration:" },
  { key: "weight", label: "Weight:" },
];

const CopmareTable = () => {
  const items = useSelector((state) => state.compare.items);
  const dispatch = useDispatch();

  const renderCell = (item, key) => {
    switch (key) {
      case "rating":
        return (
          <span className="text-sm text-[#475156]">
            {[item.ratingStars, item.ratingReviews].filter(Boolean).join(" ") ||
              "—"}
          </span>
        );
      case "price":
        return (
          <span className="text-[#2DA5F3] text-lg font-semibold">
            {item.priceOld && (
              <del className="text-[#929FA5] mr-1 text-base font-normal">
                {item.priceOld}
              </del>
            )}
            {item.price || "—"}
          </span>
        );
      case "soldBy":
        return <span className="text-sm">Clicon</span>;
      case "brand":
        return <span className="text-sm">{getFact(item, "Brand") || "—"}</span>;
      case "model":
        return (
          <span className="text-sm line-clamp-3">
            {getFact(item, "Sku") || item.title || "—"}
          </span>
        );
      case "stock":
        return <StockBadge text={getFact(item, "Availability")} />;
      case "config":
        return (
          <span className="text-sm">
            {[item.colorName, item.variantSummary]
              .filter(Boolean)
              .join(" · ") || "—"}
          </span>
        );
      case "weight":
        return <span className="text-sm">—</span>;
      default:
        return "—";
    }
  };

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        image: item.image,
        title: item.title,
        price: item.price,
        priceOld: item.priceOld,
        quantity: 1,
        selectedSize: item.variantSummary,
        selectedColor: item.colorName,
      }),
    );
    toast.success("Product added to cart");
  };

  const handleAddToWishlist = (item) => {
    const avail = getFact(item, "Availability") ?? "";
    const inStock = !avail.toLowerCase().includes("out");
    dispatch(
      toggleWishlistItem({
        id: item.id,
        image: item.image,
        title: item.title,
        price: item.price,
        priceOld: item.priceOld,
        inStock,
      }),
    );
    toast.success("Product added to wishlist");
  };

  const handleRemove = (id) => {
    dispatch(removeFromCompare(id));
    toast.success("Product removed from compare");
  };

  if (items.length === 0) {
    return (
      <div className="container py-18">
        <div className="border border-[#E4E7E9] rounded-sm p-12 text-center text-sm text-[#6c757d]">
          No products to compare.{" "}
          <Link href={ROUTES.SHOP} className="text-[#2DA5F3] font-medium">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-18">
      <div className="w-full border border-[#E4E7E9] rounded-sm overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-1/4 p-6 font-medium text-left">Products</th>
              {items.map((item) => (
                <th
                  key={item.id}
                  className="w-1/4 border border-[#E4E7E9] border-t-0 border-b-0 border-r-0"
                >
                  <div className="space-y-4 p-8">
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="cursor-pointer"
                    >
                      <Image
                        src={assets.XCircle}
                        alt="Remove"
                        width={24}
                        height={24}
                      />
                    </button>
                    <div className="space-y-4 flex flex-col justify-between h-[calc(100%-40px)]">
                      <div className="relative w-full h-68 mx-auto">
                        <Image
                          src={item.image}
                          alt={item.title ?? "Product"}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-base text-[#191C1F] font-normal text-left line-clamp-3">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(item)}
                          className="group/icon relative flex items-center justify-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white w-53 h-12 cursor-pointer text-base leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F]"
                        >
                          Add to Cart
                          <div className="relative w-6 h-6">
                            <Image
                              src={assets.Cart_White}
                              alt=""
                              width={24}
                              height={24}
                              className="transition-opacity duration-500 opacity-100 group-hover/icon:opacity-0"
                            />
                            <Image
                              src={assets.Cart_Black}
                              alt=""
                              width={24}
                              height={24}
                              className="absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover/icon:opacity-100"
                            />
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddToWishlist(item)}
                          className="group/icon relative w-12 h-12 bg-white grid place-content-center rounded-[3px] border-2 cursor-pointer border-[#FFE7D6] duration-500 ease-linear hover:border-[#FA8232] hover:text-[#FA8232]"
                        >
                          <Image
                            src={assets.Heart}
                            alt=""
                            width={24}
                            height={24}
                            className="transition-opacity duration-300 opacity-100 group-hover/icon:opacity-0"
                          />
                          <Image
                            src={assets.Heart_Black}
                            alt=""
                            width={24}
                            height={24}
                            className="absolute inset-0 m-auto transition-opacity duration-300 opacity-0 group-hover/icon:opacity-100"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row, rowIndex) => (
              <tr key={row.key}>
                <td
                  className={`${
                    rowIndex % 2 === 0 ? "bg-[#F2F4F5]" : ""
                  } px-6 py-3 text-sm text-[#475156] font-medium`}
                >
                  {row.label}
                </td>
                {items.map((item) => (
                  <td
                    key={`${row.key}-${item.id}`}
                    className={`${
                      rowIndex % 2 === 0 ? "bg-[#F2F4F5]" : ""
                    } px-8 py-3 border border-[#E4E7E9] border-t-0 border-b-0 border-r-0 text-sm`}
                  >
                    {renderCell(item, row.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CopmareTable;
