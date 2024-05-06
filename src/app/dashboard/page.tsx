"use client";

import React, { useEffect, useState } from "react";
import BarChart from "@/components/BarChart";
import LineChartComponent from "@/components/LineChart";
import { useSession, signIn } from "next-auth/react";
import Typography from "@mui/material/Typography";
import { Grid, Card, CardContent, CardHeader, Box } from "@mui/material";

const Page = () => {
  const [ExpenseData, setExpenseData] = useState();
  const [IncomeData, setIncomeData] = useState();
  const [MonthlyTransactionData, setMonthlyTransactionData] = useState();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const fetchExpenseData = await fetch("/api/expense-by-category");
      const fetchIncomeData = await fetch("/api/income-by-category");
      const fetchMonthlyTransactionData = await fetch(
        "/api/montly-transaction"
      );

      const expenseResult = await fetchExpenseData.json();

      setExpenseData(
        expenseResult.data.map((item: any) => ({
          category: item.categoryName[0],
          amount: item.totalExpense,
        }))
      );

      const IncomeResult = await fetchIncomeData.json();

      setIncomeData(
        IncomeResult.data.map((item: any) => ({
          category: item.categoryName[0],
          amount: item.totalIncome,
        }))
      );

      const MontlyResult = await fetchMonthlyTransactionData.json();
      const monthlyTransactionData = MontlyResult.responseData.map(
        (item: any) => ({
          income: item.income,
          expense: item.expense,
          date: item.date,
        })
      );
      setMonthlyTransactionData(monthlyTransactionData);
    };

    if (status === "unauthenticated") {
      signIn("credentials", { callbackUrl: "/login" });
    }

    fetchData();
  }, [status]);

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Overview
      </Typography>

      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Income</Typography>
                <Typography variant="body1">Rp10,000,000</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Expense</Typography>
                <Typography variant="body1">Rp10,000,000</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Balance</Typography>
                <Typography variant="body1">Rp10,000,000</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardHeader title="Top Expense by Categories" />
              <CardContent>
                <BarChart data={ExpenseData} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardHeader title="Top income by Categories" />
              <CardContent>
                <BarChart data={IncomeData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardHeader title="Monthly Transaction" />
          <CardContent>
            <LineChartComponent data={MonthlyTransactionData} />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Page;
