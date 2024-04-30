"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Paper, Typography, Button, CircularProgress } from "@mui/material";
import { Transaction, Category } from "@/types/index";
import { formatDateTime } from "@/app/lib/formatDate";

const DetailTransactionPage: React.FC<{ params: { id: string } }> = ({
  params,
}) => {
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [categories, setCategories] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`/api/transaction/${params.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { transaction, category } = await response.json();
        setTransaction(transaction);
        setCategories(category);
      } catch (error) {
        console.error("Failed to fetch transaction", error);
      }
      setLoading(false);
    };

    fetchTransaction();
  }, [params.id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!transaction) {
    return <Typography variant="h6">Transaction not found</Typography>;
  }

  return (
    <Paper sx={{ padding: 4, margin: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Transaction Detail
      </Typography>
      <Typography variant="h6">Amount: $ {transaction.amount}</Typography>
      <Typography variant="h6">Category : {categories?.name}</Typography>
      <Typography variant="h6">Type: {transaction.type}</Typography>
      <Typography variant="h6">
        Date: {formatDateTime(transaction.date)}
      </Typography>
      <Typography variant="h6">
        Description: {transaction.description}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => router.push("/dashboard/transaction")}
      >
        Back to Transactions
      </Button>
    </Paper>
  );
};

export default DetailTransactionPage;
