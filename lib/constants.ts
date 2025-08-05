export const LOCALES = ["en", "kz"];

export const LOCALSTORAGE_KEYS = {
  fifty3020budget: "fifty3020budget",
  seventyfive1015budget: "seventyfive1015budget",
  currency: "currency",
  currentTab: "currentTab",
};

export const currencies = [
  {
    code: "KZT",
    symbol: "₸",
    name: "Kazakhstan Tenge",
  },
  {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
  },
  {
    code: "EUR",
    symbol: "€",
    name: "Euro",
  },
  {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
  },
  {
    code: "AED",
    symbol: "AED",
    name: "United Arab Emirates Dirham",
  },
];

export const QUERY_KEYS = {
  AUTH: "auth",
  BUDGET: "budget",
  BUDGETS: "budgets",
  EXPENSES: "expenses",
  MONTHLY_INCOME: "monthlyIncome",
  LATEST_BUDGET_ID: "latestBudgetId",
  NOTES: "notes",
  EXPENSES_OVERVIEW: "expensesOverview",
  SUGGESTED_EXPENSES: "suggestedExpenses",
};

export const BUDGET_TYPES = {
  "50-30-20": "50-30-20",
  "75-10-15": "75-10-15",
};

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
  SUSPENDED = "suspended",
  DELETED = "deleted",
}
