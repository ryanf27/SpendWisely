"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Link from "next/link";

const pages = ["Features", "About Us", "Contact"];
const pageslink = ["/#features", "/#about", "/#contact"]; // Assuming these are IDs on the homepage

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [navBackground, setNavBackground] = useState(false);

  const handleScroll = () => {
    const show = window.scrollY > 0;
    setNavBackground(show);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const theme = useTheme();
  const dynamicTextColor = () => (navBackground ? "white" : "black");

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        bgcolor: "background.default",
        background: navBackground
          ? `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`
          : "transparent",
        transition: "background 0.3s",
        boxShadow: navBackground ? 1 : "none",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccountBalanceWalletIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: dynamicTextColor(),
              }}
            />
            <Link href="/" passHref>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: dynamicTextColor(),
                  textDecoration: "none",
                }}
              >
                FINPLAN
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: dynamicTextColor() }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link href={pageslink[index]} passHref>
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: dynamicTextColor(), display: "block" }}
              >
                <Link href={pageslink[index]} passHref>
                  <Typography
                    sx={{ textDecoration: "none", color: dynamicTextColor() }}
                  >
                    {page}
                  </Typography>
                </Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Auth Buttons */}
            <Link href="/login" passHref>
              <Button sx={{ color: dynamicTextColor(), marginRight: "10px" }}>
                Login
              </Button>
            </Link>
            <Link href="/register" passHref>
              <Button
                variant="contained"
                sx={{ marginRight: "20px", backgroundColor: "#F0C042" }}
              >
                Register
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
