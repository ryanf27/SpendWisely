"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { Transaction, TransactionFormProps } from "@/types/index";

export const TransactionForm: React.FC<TransactionFormProps> = ({
  open,
  onClose,
  initialValues,
  onSubmit,
  categories,
}) => {
  const [transaction, setTransaction] = useState<Transaction>(
    initialValues || {
      _id: "",
      userId: "",
      categoryId: "",
      amount: 0,
      type: "",
      date: "",
      description: "",
    }
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialValues ? initialValues.categoryId : ""
  );

  useEffect(() => {
    if (initialValues) {
      setTransaction(initialValues);
      setSelectedCategory(initialValues.categoryId);
    }
  }, [initialValues]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = event.target.value as string;
    setSelectedCategory(categoryId);
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      categoryId: event.target.value,
    }));
  };

  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(transaction);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {transaction._id ? "Edit Transaction" : "Add Transaction"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={transaction.amount}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="categoryId"
            value={selectedCategory}
            onChange={handleCategoryChange}
            fullWidth
            margin="normal"
            select
          >
            {categories &&
              categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
          </TextField>

          <TextField
            label="Type"
            name="type"
            value={transaction.type}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            select
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={transaction.date}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Description"
            name="description"
            value={transaction.description || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{ mt: 2 }}
          >
            {transaction._id ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
