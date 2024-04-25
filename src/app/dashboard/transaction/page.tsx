"use client";

import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { TransactionsTable } from "@/components/TransactionsTable";
import { TransactionForm } from "@/components/TransactionForm";
import { Transaction } from "@/types/index";

const TransactionPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<{ name: string; id: string }[]>(
    []
  );
  const [openForm, setOpenForm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    const loadTransactionsAndCategories = async () => {
      try {
        const response = await fetch("/api/transaction");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { transactions, userCategories } = await response.json();

        setTransactions(transactions);

        setCategories(
          userCategories.map((cat: any) => ({ name: cat.name, id: cat._id }))
        );
      } catch (error) {
        console.error("Failed to load transactions and categories:", error);
      }
    };

    loadTransactionsAndCategories();
  }, []);

  const handleCreateOrEditTransaction = async (transaction: Transaction) => {
    const method = transaction._id ? "PUT" : "POST";
    const url = transaction._id
      ? `/api/transaction/${transaction._id}`
      : "/api/transaction";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      console.error("Error in response", response.statusText);
      return;
    }

    const data = await response.json();

    if (
      data.message === "Transaction created" ||
      data.message === "Transaction updated"
    ) {
      setTransactions((prev) =>
        transaction._id
          ? prev.map((t) =>
              t._id === transaction._id ? { ...t, ...data.data } : t
            )
          : [...prev, data.data]
      );
      console.log(data.data);
      setOpenForm(false);
      setSelectedTransaction(null);
      console.log("Transaction list updated", transactions);
    } else {
      console.error("Error handling transaction:", data.error);
    }
  };

  const handleOpenEditForm = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedTransaction(null);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Button
        onClick={() =>
          handleOpenEditForm({
            _id: "",
            amount: 0,
            type: "",
            description: "",
            date: "",
            userId: "",
            categoryId: "",
          })
        }
      >
        Add Transaction
      </Button>
      <TransactionsTable
        transactions={transactions}
        onEdit={handleOpenEditForm}
      />
      <TransactionForm
        open={openForm}
        onClose={handleCloseForm}
        initialValues={selectedTransaction}
        onSubmit={handleCreateOrEditTransaction}
        categories={categories}
      />
    </Box>
  );
};

export default TransactionPage;
