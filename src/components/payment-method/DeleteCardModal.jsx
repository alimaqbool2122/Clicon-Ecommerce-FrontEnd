"use client";
import React from "react";
import Image from "next/image";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Cross } from "@/components/svg/Icons";
import { assets } from "@/constants/assets";

const DeleteCardModal = ({ open, onOpenChange, onConfirm }) => {
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="w-[calc(100%-2rem)] sm:max-w-[420px] rounded-[8px] border-none p-0 overflow-hidden"
      >
        <div className="p-8 relative bg-white">
          <DialogClose className="absolute top-4 right-4 cursor-pointer">
            <Cross fill="#929FA5" width={20} height={20} />
          </DialogClose>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-5"
          >
            {/* Warning Icon */}
            <div className="w-18 h-18 grid place-content-center bg-red-50 text-red-500 rounded-full shrink-0 ring-8 ring-red-50 mb-4">
              <Image
                src={assets.Info_Black}
                alt="warning"
                width={36}
                height={36}
              />
            </div>

            {/* Text */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#191C1F]">Delete Card</h3>
              <p className="text-sm text-[#5F6C72] max-w-[280px]">
                Are you absolutely sure you want to delete this card? This
                action cannot be undone.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full pt-4">
              <button
                onClick={() => onOpenChange(false)}
                className="w-full border-2 border-[#E4E7E9] bg-white text-[#475156] px-6 h-12 text-sm leading-px uppercase font-bold rounded-[3px] duration-300 ease-linear hover:border-[#191C1F] hover:text-[#191C1F] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="w-full border-2 border-[#FA8232] bg-[#FA8232] text-white px-6 h-12 text-sm leading-px uppercase font-bold rounded-[3px] duration-300 ease-linear hover:bg-transparent hover:text-[#FA8232] cursor-pointer shadow-[0_4px_14px_0_rgba(239,68,68,0.39)]"
              >
                Yes, Delete
              </button>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCardModal;
