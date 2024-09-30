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

export const getCurrentMonthName = (locale = "default") => {
  const date = new Date();
  const month = date.toLocaleString(locale, { month: "long" });

  return month.toLowerCase();
};

export const getNextMonthName = (locale = "default") => {
  const date = new Date();
  if (date.getMonth() === 11) {
    return new Date(date.getFullYear() + 1, 0, 1).toLocaleString(locale, {
      month: "long",
    });
  }

  return new Date(date.getFullYear(), date.getMonth() + 1, 1)
    .toLocaleString(locale, {
      month: "long",
    })
    .toLowerCase();
};

export const daysUntilNextMonth = () => {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const diffDays = Math.ceil(
    Math.abs(nextMonth.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffDays;
};

export const getMonthFromDate = (date: Date) => {
  const month = date.toLocaleString("default", { month: "long" });
  return month;
};

export const getYearFromDate = (date: Date) => {
  const year = date.toLocaleString("default", { year: "numeric" });
  return year;
};
