import React, { useState, useRef, useEffect } from "react";
import { assets } from "../../constants/assets";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cross } from "../svg/Icons";
import ROUTES from "@/constants/routes";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/redux/services/cartSlice";

const Cart = () => {
  const [cartActive, setCartActive] = useState(false);
  const cartBtnRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (cartBtnRef.current && !cartBtnRef.current.contains(e.target)) {
        setCartActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // get cart items from redux
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      parseFloat(String(item.price ?? "0").replace(/[^0-9.]/g, "")) *
        item.quantity,
    0,
  );
  const handleRemove = (id, selectedSize, selectedColor) => {
    dispatch(removeFromCart({ id, selectedSize, selectedColor }));
  };
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subtotalFormatted = subtotal.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <>
      <div className="relative" ref={cartBtnRef}>
        <button
          className="relative cursor-pointer"
          onClick={() => setCartActive(!cartActive)}
        >
          <Image
            src={assets.Cart_White}
            alt="cart-white"
            width={32}
            height={32}
            className=""
          />
          {totalQuantity > 0 && (
            <div className="size-5 bg-white py-0.5 flex items-center justify-center rounded-full absolute -top-1 left-4">

              <span className="text-[#1B6392] text-[12px] font-semibold">{totalQuantity}</span>

            </div>
          )}
        </button>
        {/* cart */}
        <div
          className={`w-94 absolute top-12 right-0 z-10 bg-white border border-[#E4E7E9] rounded-sm shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]
                    transition-all duration-400 ease-out origin-top
                    ${cartActive
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }
                  `}
        >
          <div>
            {/* card Title */}
            <div className="border-b border-[#e4e7e9] py-4 px-6">
              <h6 className="text-base text-[#191C1F] leading-6 font-medium">
                Shopping Cart <span className="text-[#6c757d]">({totalQuantity})</span>
              </h6>
            </div>
            {/* cart item */}
            <div className="border-b border-[#e4e7e9] py-6 px-5">
              <div
                className={
                  cartItems.length > 2 ? "max-h-48 overflow-y-auto" : ""
                }
              >
                <div className="grid grid-cols-12 gap-4">
                  {cartItems.length === 0 ? (
                    <p className="col-span-12 text-sm text-[#6c757d] text-center py-2">
                      Your cart is empty
                    </p>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={`${item.id}-${item.selectedSize ?? ""}-${item.selectedColor ?? ""}`}
                        className="col-span-12 flex items-center"
                      >
                        <div className="relative w-20 h-20 mr-4 shrink-0 border-2 border-[#E4E7E9]">
                          <Image
                            src={item.image}
                            alt={item.title ?? "Product"}
                            fill
                            className="shrink-0 object-contain p-1"
                          />
                        </div>

                        <div className="flex items-center justify-between w-full">
                          <div>
                            <p className="text-sm leading-5 text-[#212529] font-normal pr-4 line-clamp-2">
                              {item.title}
                            </p>
                            <span>
                              <span className="text-[#5F6C72] text-sm leading-5 font-normal">
                                {item.quantity} x
                              </span>
                              <span className="text-sm leading-5 font-semibold text-[#2DA5F3] ml-1">
                                {item.price}
                              </span>
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemove(
                                item.id,
                                item.selectedSize,
                                item.selectedColor,
                              )
                            }
                            className="shrink-0 p-1 cursor-pointer hover:opacity-70"
                            aria-label="Remove from cart"
                          >
                            <Cross fill="#929FA5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            {/* cart total */}
            <div className="py-6 px-5 flex items-center justify-between">
              <span className="text-[#475156] text-sm leading-5 font-normal">
                Sub-Total:
              </span>
              <span className="text-[#191C1F] text-sm leading-5 font-medium">
                ${subtotalFormatted} USD
              </span>
            </div>
            {/* cart buttons */}
            <div className="p-6 pt-0 flex flex-col gap-3">
              <Link
                href={ROUTES.CHECK_OUT}
                className="flex items-center justify-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white h-12 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F] hover:border-[#FA8232]"
              >
                Checkout now
                <ArrowRight />
              </Link>

              <Link
                href={ROUTES.SHOPING_CARD}
                className="flex items-center justify-center border-2 border-[#FFE7D6] bg-white text-[#FA8232] text-[14px] leading-px uppercase font-bold rounded-[3px] h-12 duration-300 ease-linear hover:bg-[#FA8232] hover:text-white hover:border-[#FA8232]"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
