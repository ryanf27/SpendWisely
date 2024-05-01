"use client";

import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { TransactionsTable } from "@/components/TransactionsTable";
import { TransactionForm } from "@/components/TransactionForm";
import { Transaction, Category } from "@/types/index";
import { loadTransactions, saveTransaction } from "@/app/lib/transactions";
import { formatDateTime } from "@/app/lib/formatDate";

const TransactionPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { transactions, userCategories } = await loadTransactions();

        setTransactions(transactions);

        setCategories(
          userCategories.map((cat: any) => ({ name: cat.name, _id: cat._id }))
        );
      } catch (error) {
        console.error("Failed to load transactions and categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateOrEditTransaction = async (transaction: Transaction) => {
    const data = await saveTransaction(transaction);

    if (
      data.message === "Transaction created" ||
      data.message === "Transaction updated"
    ) {
      setTransactions((prev) => {
        if (transaction._id) {
          return prev.map((t) =>
            t._id === transaction._id ? { ...t, ...data.data } : t
          );
        }

        return [...prev, data.data];
      });
      setOpenForm(false);
      setSelectedTransaction(null);
    } else {
      console.error("Error handling transaction:", data.error);
    }
  };

  const handleOpenEditForm = (transaction: Transaction) => {
    transaction.date = formatDateTime(transaction.date);
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
        categories={categories}
        onEdit={handleOpenEditForm}
        setTransactions={setTransactions}
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
