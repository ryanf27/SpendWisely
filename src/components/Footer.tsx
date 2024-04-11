"use client";

import React from "react";
import {
  Container,
  Typography,
  Grid,
  Link,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer: React.FC = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        pt: 8,
        pb: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={matchesSM ? 2 : 4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" gutterBottom style={{ color: "#fff" }}>
              FINPLAN
            </Typography>
            <Typography variant="body1" style={{ color: "#ddd" }}>
              Your gateway to smarter budgeting and financial freedom.
              Let&apos;s navigate the complexities of personal finance together.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" gutterBottom style={{ color: "#fff" }}>
              Resources
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems={matchesSM ? "center" : "flex-start"}
            >
              <Link
                href="/planning"
                underline="hover"
                style={{ color: "#ddd", marginBottom: 10 }}
              >
                Planning Tools
              </Link>
              <Link
                href="/advice"
                underline="hover"
                style={{ color: "#ddd", marginBottom: 10 }}
              >
                Financial Advice
              </Link>
              <Link
                href="/calculators"
                underline="hover"
                style={{ color: "#ddd", marginBottom: 10 }}
              >
                Calculators
              </Link>
              <Link href="/blog" underline="hover" style={{ color: "#ddd" }}>
                Blog
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" gutterBottom style={{ color: "#fff" }}>
              Connect With Us
            </Typography>
            <Box>
              <Link href="https://linkedin.com" style={{ color: "#fff" }}>
                <LinkedInIcon sx={{ mr: 2 }} />
              </Link>
              <Link href="https://twitter.com" style={{ color: "#fff" }}>
                <TwitterIcon sx={{ mr: 2 }} />
              </Link>
              <Link href="https://youtube.com" style={{ color: "#fff" }}>
                <YouTubeIcon />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Divider
          style={{ backgroundColor: "#ddd", marginTop: 32, marginBottom: 20 }}
        />
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: 20, color: "#ddd" }}
        >
          © 2024 MyFinancePlanner. Embrace your financial journey.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
