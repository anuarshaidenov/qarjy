# Qarjy - Simple Budget Planning App

Qarjy is an intuitive web application designed to help you easily manage your finances. Whether you’re saving for the future or managing monthly expenses, Qarjy simplifies budgeting by using proven methods like 50/30/20 and 75/10/15. With a beautiful interface and straightforward tools, you can create and track your budget effortlessly.

## Features

•	Budget Planning: Create monthly budgets and manage your income, savings, and expenses.
  
•	50/30/20 Rule: Automatically calculate how much you should allocate for needs, wants, and savings.
 
•	75/10/15 Rule: Another budgeting method that emphasizes savings and a cushion fund for unexpected expenses.

•	Dashboard Overview: Get a clear snapshot of your financial health with easy-to-read stats and charts.

•	Localization: Available in both English and Kazakh.

## Demo

You can view the live app at [qarjy.site](https://www.qarjy.site/).

## Tech Stack

•	Frontend: Next.js, Tailwind CSS
	
•	Backend: Supabase, PostgresQL

## Installation

### 1. Clone the repository
 
```
git clone https://github.com/anuarshaidenov/qarjy.git
```



### 2. Navigate into the project directory

```
cd qarjy
```


### 3. Install dependencies

```
npm install
```


### 4. Set up environment variables. Create a .env.local file in the root and add the necessary environment variables

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NODE_ENV=development
```


### 5.	Run the development server

```
npm run dev
```


### 6.	Open http://localhost:3000 to view it in your browser.

## How It Works

1.	Enter your monthly income: Add your primary income sources like your salary or any side income.
2.	Set your expenses: Track essential expenses like rent, groceries, and subscriptions.
3.	Allocate to savings: Dedicate a portion of your income to savings and investments.
4.	Track your progress: Use the dashboard to monitor your financial health and adjust accordingly.

## Contribution

We welcome contributions! If you’d like to contribute, please fork the repository and submit a pull request with your proposed changes. Be sure to run tests and ensure the app works as expected before submitting.

## License

This project is licensed under the MIT License.
