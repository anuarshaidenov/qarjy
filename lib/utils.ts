import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatAmount = (amount: string) => {
  return parseInt(amount.split(",").join("")) || 0;
};

export const calculatePecentageBasedOnIncome = (
  income: number,
  percentage: number
) => {
  return (income * percentage) / 100;
};

export const calculateEssentialExpensesBasedOnIncome = (income: number) => {
  return income * 0.5;
};

export const calculateNonEssentialExpensesBasedOnIncome = (income: number) => {
  return income * 0.3;
};

export const calculate20SavingsBasedOnIncome = (income: number) => {
  return income * 0.2;
};

export const calculateOverallExpensesBasedOnIncome = (income: number) => {
  return income * 0.75;
};

export const calculateCushionFundBasedOnIncome = (income: number) => {
  return income * 0.1;
};

export const calculate15SavingsBasedOnIncome = (income: number) => {
  return income * 0.15;
};

export const calculateExpensesRemainder = (spent: number, income: number) => {
  return income - spent;
};

export const getCurrentMonthName = () => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });

  return month;
};
