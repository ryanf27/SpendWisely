import { Transaction } from "@/types";

export const loadTransactions = async () => {
  const response = await fetch("/api/transaction");

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const getTotalIncome = async () => {
  const response = await fetch("/api/transaction");
  if (!response.ok) {
    throw new Error(`Error fetching transactions: ${response.statusText}`);
  }

  const { transactions } = await response.json();

  const incomeTransactions = transactions.filter(
    (t: Transaction) => t.type === "income"
  );
  const totalIncome = incomeTransactions.reduce(
    (total: number, t: Transaction) => total + t.amount,
    0
  );

  return totalIncome;
};

export const getTotalExpense = async () => {
  const response = await fetch("/api/transaction");
  if (!response.ok) {
    throw new Error(`Error fetching transactions: ${response.statusText}`);
  }

  const { transactions } = await response.json();

  const expenseTransactions = transactions.filter(
    (t: Transaction) => t.type === "expense"
  );
  const totalExpense = expenseTransactions.reduce(
    (total: number, t: Transaction) => total + t.amount,
    0
  );

  return totalExpense;
};

export const saveTransaction = async (transaction: Transaction) => {
  const method = transaction._id ? "PUT" : "POST";
  const url = transaction._id
    ? `/api/transaction/${transaction._id}`
    : "/api/transaction";
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: transaction.amount,
      categoryId: transaction.categoryId,
      date: transaction.date,
      description: transaction.description,
      type: transaction.type,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
