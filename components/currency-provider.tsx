"use client";

import React, { createContext, useContext, useState } from "react";

import { currencies, LOCALSTORAGE_KEYS } from "@/lib/constants";

type Currency = (typeof currencies)[0];

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
};
export const CurrencyContext = createContext<CurrencyContextType>({
  currency: currencies[0],
  setCurrency: (currency: Currency) => {},
});

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<Currency>(
    JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.currency) || "null") ||
      currencies[0]
  );

  const setCurrencyHandler = (currency: Currency) => {
    setCurrency(currency);
    console.log(currency);
    localStorage.setItem(LOCALSTORAGE_KEYS.currency, JSON.stringify(currency));
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency: setCurrencyHandler }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
