"use client";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BudgetsTableProps } from "@/types/index";
import { formatDateTime } from "@/app/lib/formatDate";
import { Budget } from "@/types/index";

export const BudgetsTable = ({
  budgets,
  setBudgets,
  onEdit,
}: BudgetsTableProps) => {
  const deleteBudget = async (budgetId: string) => {
    const isUserConfirmed = window.confirm(
      "Are you sure you want to delete this budget?"
    );

    if (!isUserConfirmed) return;

    try {
      const response = await fetch(`/api/budget`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: budgetId }),
      });

      if (response.ok) {
        const { message } = await response.json();

        if (message === "Budget not found") {
          alert("Budget not found.");
        } else if (message === "Budget deleted") {
          alert("Budget deleted successfully.");
          setBudgets(budgets.filter((b: Budget) => b._id !== budgetId));
        }
      } else {
        throw new Error("Deletion failed.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the budget.");
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
          <TableRow>
            <TableCell>Limit Amount</TableCell>
            <TableCell>Period</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {budgets.length > 0 ? (
            budgets.map((budget: Budget) => (
              <TableRow
                key={budget._id}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.03)",
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell>{budget.limitAmount}</TableCell>
                <TableCell>{budget.period}</TableCell>
                <TableCell>{formatDateTime(budget.startDate)}</TableCell>
                <TableCell>{formatDateTime(budget.endDate)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(budget)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteBudget(budget._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No budgets available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
