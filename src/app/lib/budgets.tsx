import { Budget } from "@/types";

export const loadBudgets = async () => {
  const response = await fetch("/api/budget");

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const saveBudget = async (budget: Budget) => {
  const method = budget._id ? "PUT" : "POST";
  const url = budget._id ? `/api/budget/${budget._id}` : "/api/budget";
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      limitAmount: budget.limitAmount,
      startDate: budget.startDate,
      endDate: budget.endDate,
      period: budget.period,
      userId: budget.userId,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
