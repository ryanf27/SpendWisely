import { Transaction } from "@/types";

export const loadTransactions = async () => {
  const response = await fetch("/api/transaction");

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const saveTransaction = async (transaction: Transaction) => {
  const method = transaction._id ? "PUT" : "POST";

  const response = await fetch("/api/transaction", {
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
