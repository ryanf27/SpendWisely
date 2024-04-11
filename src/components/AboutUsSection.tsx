"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import heroImg from "../../public/3d-hand-making-cashless-payment-from-smartphone.jpg";
import Image from "next/image";

const AboutUsSection = () => {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        pt: 8,
        pb: 6,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Image
                src={heroImg}
                alt="About us Image"
                style={{
                  width: "100%",
                  height: isXsScreen ? 300 : 450,
                  objectFit: "contain",
                }}
                priority
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{
                fontWeight: "bold",
              }}
            >
              About Us
            </Typography>
            <Typography
              variant="h6"
              align="center"
              paragraph
              sx={{ color: "#333" }}
            >
              Discover our mission and values.
            </Typography>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                mt: 3,
                background: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <Typography paragraph>
                Our journey began with a simple idea: to make financial planning
                accessible and understandable for everyone. With a team of
                dedicated financial experts and technologists, we&apos;ve
                created a platform that does just that.
              </Typography>
              <Typography paragraph>
                We believe in empowering individuals with the tools and
                knowledge to make informed financial decisions. Our commitment
                to security, privacy, and user-centric design is unwavering.
                Join us on this journey to financial independence.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUsSection;
