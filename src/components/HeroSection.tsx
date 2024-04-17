import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import Image from "next/image";

const HeroSection = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={8}
          alignItems="center"
          justifyContent="center"
          style={{ height: "100%" }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Financial Planning, Simplified
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Make smarter financial decisions with instant access to financial
              insights and tools.
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#F0BF3C" }}
              >
                Get Started
              </Button>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "100vh",
                maxWidth: "100%",
                overflow: "hidden",
              }}
            >
              <Image
                src={"/img2.jpg"}
                alt="Hero Section Image"
                width={650}
                height={650}
                priority
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
