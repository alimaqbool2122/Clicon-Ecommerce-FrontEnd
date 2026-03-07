"use client";
import React, { createContext, useContext, useState } from "react";

const ShopFilterContext = createContext();

export const useShopFilter = () => {
  const context = useContext(ShopFilterContext);
  if (!context) {
    throw new Error("useShopFilter must be used within ShopFilterProvider");
  }
  return context;
};

export const ShopFilterProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const togglePriceRange = (priceRangeOption) => {
    setSelectedPriceRanges((prev) => {
      if (priceRangeOption === "All Price") {
        if (prev.includes("All Price")) {
          return [];
        } else {
          return ["All Price"];
        }
      } else {
        if (prev.includes(priceRangeOption)) {
          return prev.filter((item) => item !== priceRangeOption && item !== "All Price");
        } else {
          return [...prev.filter((item) => item !== "All Price"), priceRangeOption];
        }
      }
    });
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brand)) {
        return prev.filter((item) => item !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  return (
    <ShopFilterContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
        toggleCategory,
        selectedPriceRanges,
        togglePriceRange,
        selectedBrands,
        toggleBrand,
      }}
    >
      {children}
    </ShopFilterContext.Provider>
  );
};

