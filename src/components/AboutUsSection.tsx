"use client";

import React from "react";
import { Box, Container, Typography, Grid, CardContent } from "@mui/material";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AboutUsSection = () => {
  return (
    <div id="about">
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
          <Grid
            container
            spacing={5}
            alignItems="center"
            justifyContent="center"
          >
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
                  src={"/img1.jpg"}
                  alt="About us Image"
                  width={680}
                  height={680}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                align="left"
                sx={{
                  color: "#F0BF3C",
                  fontWeight: 700,
                }}
              >
                GET TO KNOW US
              </Typography>
              <Typography variant="h5" align="left" sx={{ color: "#444" }}>
                Discover our mission and values.
              </Typography>
              <Box
                sx={{
                  mt: 3,
                }}
              >
                <Typography paragraph>
                  At the heart of our company is a commitment to making
                  financial independence achievable for everyone. Our team
                  blends expertise in technology and finance to deliver
                  powerful, user-friendly solutions.
                </Typography>
                <Typography paragraph>
                  Transparency, security, and continuous innovation are the
                  cornerstones of our approach. Embrace the journey towards
                  smarter financial management with us.
                </Typography>
              </Box>
              <Box sx={{ mt: 6 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ color: "#4CAF50" }}
                    >
                      <CheckCircleIcon sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">
                        Unlimited Access
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ color: "#2196F3" }}
                    >
                      <CheckCircleIcon sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">
                        Proven Success
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ color: "#FFC107" }}
                    >
                      <CheckCircleIcon sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">
                        Simplified Solutions
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ color: "#673AB7" }}
                    >
                      <CheckCircleIcon sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">
                        Customized Advice
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ color: "#E91E63" }}
                    >
                      <CheckCircleIcon sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">
                        Real-Time Updates
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ color: "#009688" }}
                    >
                      <CheckCircleIcon sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">Secure</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default AboutUsSection;
