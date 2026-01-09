import { Star } from "@/components/svg/Icons";
import { assets } from "../../constants/assets";

const shopDetailData = {
  product: {
    title:
      "2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray",
    rating: {
      stars: "4.7 Star Rating",
      totalReviews: "(21,671 User feedback)",
      startIcon: <Star />,
    },

    facts: [
      {
        label: "Sku:",
        title: "A264671",
      },
      {
        label: "Availability:",
        title: "In Stock",
      },
      {
        label: "Brand:",
        title: "Apple",
      },
      {
        label: "Category:",
        title: "Electronics Devices",
      },
    ],

    price: {
      current: 1699,
      original: 1999,
      discount: "21% OFF",
      currency: "USD",
    },
  },

  images: {
    mainImage: assets.macbook,
    thumbnails: [
      assets.gallery_01,
      assets.gallery_02,
      assets.gallery_03,
      assets.gallery_04,
      assets.gallery_05,
    ],
  },

  options: {
    color: ["Silver", "Space Gray"],
    size: [
      "14-inch Liquid Retina XDR display",
      "13-inch Liquid Retina XDR display",
      "16-inch Liquid Retina XDR display",
    ],
    memory: [
      "16GB unified memory",
      "32GB Unified Memory",
      "64GB Unified Memory",
    ],
    storage: ["1TB SSD Storage", "2TB SSD Storage", "4TB SSD Storage"],
  },

  actions: [
    {
      label: "Add to Wishlist",
      icon: assets.Heart_Green,
    },
    {
      label: "Add to Compare",
      icon: assets.ArrowsClockwise,
    },
    {
      label: "Share product:",
      icons: [assets.Copy, assets.Facebook, assets.Twitter, assets.Pinterest],
    },
  ],

  guarantee: "100% Guarantee Safe Checkout",
  paymentMethod: assets.Payment_Method,

  tabs: {
    description: [
      {
        desc1:
          "The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max chip — the first Apple silicon designed for pros — you get groundbreaking performance and amazing battery life. Add to that a stunning Liquid Retina XDR display, the best camera and audio ever in a Mac notebook, and all the ports you need. The first notebook of its kind, this MacBook Pro is a beast. M1 Pro takes the exceptional performance of the M1 architecture to a whole new level for pro users.",
        desc2:
          "Even the most ambitious projects are easily handled with up to 10 CPU cores, up to 16 GPU cores, a 16‑core Neural Engine, and dedicated encode and decode media engines that support H.264, HEVC, and ProRes codecs.",
      },
    ],

    features: [
      {
        label: "Free 1 Year Warranty",
        icon: assets.Medal,
      },
      {
        label: "Free Shipping & Fasted Delivery",
        icon: assets.Truck,
      },
      {
        label: "100% Money-back guarantee",
        icon: assets.Handshake,
      },
      {
        label: "24/7 Customer support",
        icon: assets.Headphones,
      },
      {
        label: "Secure payment method",
        icon: assets.CreditCard,
      },
    ],

    shippingInformation: [
      {
        method: "Courier",
        time: "2-4 days",
        cost: "free shipping",
      },
      {
        method: "Local Shipping",
        time: "up to one week",
        cost: "$19.00",
      },
      {
        method: "UPS Ground Shipping",
        time: "4-6 days",
        cost: "$29.00",
      },
      {
        method: "Unishop Global Export",
        time: "3-4 days",
        cost: "$39.00",
      },
    ],

    additionalInformation: {
      overview: [
        {
          label: "Model Name",
          value: "MacBook Pro",
        },
        {
          label: "Brand",
          value: "Apple",
        },
        {
          label: "Specific Uses",
          value: "Personal, Gaming, Business",
        },
        {
          label: "Screen Size",
          value: "16 Inches",
        },
        {
          label: "Display",
          value: "Liquid Retina XDR display",
        },
        {
          label: "Key-board",
          value: "Magic Keyboard with Touch ID",
        },
        {
          label: "Human Interface Input",
          value: "Keyboard",
        },
        {
          label: "CPU Manufacturer",
          value: "Apple",
        },
      ],
      additionalDetails: {
        productWarranty:
          "For warranty information about this product, please click here.",
        operatingSystem: "Mac OS Big Sur",
        dimensions: {
          size: "304.1 x 212.4 x 15.6 mm",
          weight: "3 Pounds (1.4 kg)",
        },
        highlights: [
          "Stylish & Portable Thin and Light Laptop",
          "13.3 inch Quad LED Backlit IPS Display (227 PPI, 500 nits Brightness, Wide Colour (P3), True Tone Technology)",
          "Light Laptop without Optical Disk Drive",
          "No cost EMI starting from $252 USD/month",
          "Net banking & Credit/ Debit/ ATM card",
        ],
      },
    },
  },
};

export default shopDetailData;
