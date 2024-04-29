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
import { TransactionsTableProps } from "@/types/index";

export const TransactionsTable = ({
  transactions,
  categories,
  setTransactions,
  onEdit,
}: TransactionsTableProps) => {
  const categoryMap: Record<string, string> = categories.reduce(
    (acc: Record<string, string>, category) => {
      acc[category._id] = category.name;
      return acc;
    },
    {}
  );

  const deleteTransaction = async (transactionId: string) => {
    const isUserConfirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!isUserConfirmed) return;

    try {
      const response = await fetch(`/api/transaction`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: transactionId }),
      });

      if (response.ok) {
        const { message } = await response.json();

        if (message === "Transaction not found") {
          alert("Transaction not found.");
        } else if (message === "Transaction deleted") {
          alert("Transaction deleted successfully.");
          setTransactions(transactions.filter((t) => t._id !== transactionId));
        }
      } else {
        throw new Error("Deletion failed.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the transaction.");
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{categoryMap[transaction.categoryId]}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(transaction)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteTransaction(transaction._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No transactions available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
