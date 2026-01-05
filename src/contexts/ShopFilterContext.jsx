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

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  return (
    <ShopFilterContext.Provider
      value={{ selectedCategories, setSelectedCategories, toggleCategory }}
    >
      {children}
    </ShopFilterContext.Provider>
  );
};

