"use client";

import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { BudgetsTable } from "@/components/BudgetTable";
import { BudgetForm } from "@/components/BudgetForm";
import { Budget } from "@/types/index";
import { formatDateTime } from "@/app/lib/formatDate";
import { loadBudgets, saveBudget } from "@/app/lib/budgets";

const BudgetPage: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { budgets } = await loadBudgets();

        setBudgets(budgets);
      } catch (error) {
        console.error("Failed to load transactions and categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateOrEditTransaction = async (budget: Budget) => {
    const data = await saveBudget(budget);

    if (
      data.message === "Budget created successfully" ||
      data.message === "Budget updated successfully"
    ) {
      setBudgets((prev) => {
        if (budget._id) {
          return prev.map((t) =>
            t._id === budget._id ? { ...t, ...data.data } : t
          );
        }

        return [...prev, data.data];
      });
      setOpenForm(false);
      setSelectedBudget(null);
    } else {
      console.error("Error handling :", data.error);
    }
  };

  const handleOpenEditForm = (budget: Budget) => {
    budget.startDate = formatDateTime(budget.startDate);
    budget.endDate = formatDateTime(budget.endDate);
    setSelectedBudget(budget);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedBudget(null);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Button
        onClick={() =>
          handleOpenEditForm({
            _id: "",
            userId: "",
            limitAmount: 0,
            period: "",
            startDate: "",
            endDate: "",
          })
        }
      >
        Add Transaction
      </Button>
      <BudgetsTable
        budgets={budgets}
        onEdit={handleOpenEditForm}
        setBudgets={setBudgets}
      />
      <BudgetForm
        open={openForm}
        onClose={handleCloseForm}
        initialValues={selectedBudget}
        onSubmit={handleCreateOrEditTransaction}
      />
    </Box>
  );
};

export default BudgetPage;
