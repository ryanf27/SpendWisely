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
import { Budget, BudgetFormProps } from "@/types/index";

export const BudgetForm: React.FC<BudgetFormProps> = ({
  open,
  onClose,
  initialValues,
  onSubmit,
}) => {
  const [budget, setBudget] = useState<Budget>(
    initialValues || {
      _id: "",
      userId: "",
      limitAmount: 0,
      period: "",
      startDate: "",
      endDate: "",
    }
  );

  useEffect(() => {
    if (initialValues) {
      setBudget(initialValues);
    }
  }, [initialValues]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBudget((prevBudget) => ({
      ...prevBudget,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(budget);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{budget._id ? "Edit Budget" : "Add Budget"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Limit Amount"
            name="limitAmount"
            type="number"
            value={budget.limitAmount}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Period"
            name="period"
            value={budget.period}
            onChange={handleInputChange}
            select // Add this to enable the select options
            fullWidth
            margin="normal"
          >
            {["daily", "weekly", "monthly"].map((option) => (
              <MenuItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={budget.startDate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            value={budget.endDate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{ mt: 2 }}
          >
            {budget._id ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
