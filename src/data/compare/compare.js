import { Star } from "@/components/svg/Icons";
import { assets } from "../../constants/assets";

export const comparisonData = {
  tableHeader: [
    {
      id: "1",
      image: assets.compare_1,
      crossicon: assets.XCircle,
      title: "Gamdias ARES M2 Gaming Keyboard, Mouse and Mouse Mat Combo",
    },
    {
      id: "2",
      image: assets.compare_2,
      crossicon: assets.XCircle,
      title:
        'Apple iMac 24" 4K Retina Display M1 8 Core CPU, 8 Core GPU, 256GB SSD, Blue (MGPK3ZP/A) 2021',
    },
    {
      id: "3",
      image: assets.compare_3,
      crossicon: assets.XCircle,
      title:
        "Samsung Galaxy S21 FE 5G Cell Phone, Factory Unlocked Android Smartphone, 128GB, 120Hz Display.",
    },
  ],
  tableBody: [
    {
      id: "feedback",
      label: "Customer feedback:",
      items: [
        {
          id: 1,
          content: (
            <ul className="flex items-center gap-0.5">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <li key={i}>
                    <Star width={20} height={20} />
                  </li>
                ))}
              <li className="text-[14px] ml-1 leading-5 text-[#77878F]">
                (51,746,385)
              </li>
            </ul>
          ),
        },
        {
          id: 2,
          content: (
            <ul className="flex items-center gap-0.5">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <li key={i}>
                    <Star width={20} height={20} />
                  </li>
                ))}
              <li className="text-[14px] ml-1 leading-5 text-[#77878F]">
                (673,971,743)
              </li>
            </ul>
          ),
        },
        {
          id: 3,
          content: (
            <ul className="flex items-center gap-0.5">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <li key={i}>
                    <Star width={20} height={20} />
                  </li>
                ))}
              <li className="text-[14px] ml-1 leading-5 text-[#77878F]">
                (96,459,761)
              </li>
            </ul>
          ),
        },
      ],
    },
    {
      id: "price",
      label: "Price:",
      items: [
        {
          id: 1,
          content: (
            <span className="text-[#2DA5F3] text-lg font-semibold">
              $899.00
            </span>
          ),
        },
        {
          id: 2,
          content: (
            <span className="text-[#2DA5F3] text-lg font-semibold">
              $1,699.00
            </span>
          ),
        },
        {
          id: 3,
          content: (
            <span className="text-[#2DA5F3] text-lg font-semibold">
              $699.99
            </span>
          ),
        },
      ],
    },
    {
      id: "soldBy",
      label: "Sold by:",
      items: [
        { id: 1, content: "Clicon" },
        { id: 2, content: "Apple" },
        { id: 3, content: "Clicon" },
      ],
    },
    {
      id: "brand",
      label: "Brand:",
      items: [
        { id: 1, content: "StarTech" },
        { id: 2, content: "Apple" },
        { id: 3, content: "Samsung" },
      ],
    },
    {
      id: "model",
      label: "Model:",
      items: [
        { id: 1, content: "ARES M2 and ZEUS E2" },
        { id: 2, content: 'Apple iMac 24" M1 Blue 2021' },
        { id: 3, content: "Samsung Galaxy S21 FE" },
      ],
    },
    {
      id: "stockStatus",
      label: "Stock Status:",
      items: [
        {
          id: 1,
          content: (
            <span className="text-sm font-semibold text-[#2DB224]">
              IN STOCK
            </span>
          ),
        },
        {
          id: 2,
          content: (
            <span className="text-sm font-semibold text-[#2DB224]">
              IN STOCK
            </span>
          ),
        },
        {
          id: 3,
          content: (
            <span className="text-sm font-semibold text-[#EE5858]">
              OUT OF STOCK
            </span>
          ),
        },
      ],
    },
    {
      id: "size",
      label: "Size:",
      items: [
        { id: 1, content: "6.71 inches, 110.5 cm" },
        { id: 2, content: "6.7 inches, 109.8 cm" },
        { id: 3, content: "6.4 inches, 98.9 cm" },
      ],
    },
    {
      id: "weight",
      label: "Weight:",
      items: [
        { id: 1, content: "650 g (7.41 oz)" },
        { id: 2, content: "240 g (8.47 oz)" },
        { id: 3, content: "177 g (6.24 oz)" },
      ],
    },
  ],
};
