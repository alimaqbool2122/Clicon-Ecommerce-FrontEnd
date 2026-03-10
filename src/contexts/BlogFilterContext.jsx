"use client";
import React, { createContext, useContext, useState } from "react";

const BlogFilterContext = createContext();

export const useBlogFilter = () => {
  const context = useContext(BlogFilterContext);
  if (!context) {
    throw new Error("useBlogFilter must be used within BlogFilterProvider");
  }
  return context;
};

export const BlogFilterProvider = ({ children }) => {
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
          return prev.filter(
            (item) => item !== priceRangeOption && item !== "All Price",
          );
        } else {
          return [
            ...prev.filter((item) => item !== "All Price"),
            priceRangeOption,
          ];
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
    <BlogFilterContext.Provider
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
    </BlogFilterContext.Provider>
  );
};
