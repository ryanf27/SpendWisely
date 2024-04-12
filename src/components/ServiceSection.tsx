"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SecurityIcon from "@mui/icons-material/Security";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SavingsIcon from "@mui/icons-material/Savings";
import { SvgIconProps, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";

interface FeatureProps {
  title: string;
  description: string;
  Icon: React.ElementType<SvgIconProps>;
}

const FeatureItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  transition: "transform .3s, box-shadow .3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[10],
  },
}));

const ColorfulIcon = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.dark, 0.2),
  },
  margin: "auto",
}));

const Feature: React.FC<FeatureProps> = ({ title, description, Icon }) => (
  <Grid item xs={12} sm={6} md={4}>
    <FeatureItem elevation={3}>
      <Box mb={2}>
        <ColorfulIcon>
          <Icon fontSize="large" />
        </ColorfulIcon>
      </Box>
      <Typography variant="h6" component="h3" gutterBottom>
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </FeatureItem>
  </Grid>
);

const ServiceSection = () => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            textAlign="center"
            mb={4}
            fontWeight="bold"
          >
            FEATURE HIGHLIGHTS
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            color="text.secondary"
            mb={5}
          >
            Explore the standout features that enhance your personal finance
            management experience.
          </Typography>
          <Grid container spacing={4}>
            <Feature
              Icon={MonetizationOnIcon}
              title="Budgeting"
              description="Easily create budgets, and see our suggestions based on your spending."
            />
            <Feature
              Icon={AssessmentIcon}
              title="Investing"
              description="Robust tools to identify potential investment opportunities."
            />
            <Feature
              Icon={SecurityIcon}
              title="Secure"
              description="Your security is our priority. We use industry-leading security features."
            />
            <Feature
              Icon={TrendingUpIcon}
              title="Expense Analysis"
              description="Track and analyze your expenses to understand your spending habits better."
            />
            <Feature
              Icon={AccountBalanceIcon}
              title="Tax Planning"
              description="Strategies and tools to make tax planning simpler and more efficient."
            />
            <Feature
              Icon={SavingsIcon}
              title="Investment Tracking"
              description="Monitor your investments and adjust your strategy based on performance."
            />
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ServiceSection;
