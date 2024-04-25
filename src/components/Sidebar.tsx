"use client";

import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = React.useState<string>("/");

  const handleNavigation = (path: string) => {
    setActiveItem(path);
    router.push(path);
  };

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Box sx={{ width: 250, height: "100vh", backgroundColor: "#f4f4f4" }}>
      <List disablePadding>
        <ListItem
          onClick={() => handleNavigation("/")}
          sx={{
            backgroundColor:
              activeItem === "/dashboard" ? "#e0e0e0" : "inherit",
            "&:hover": { backgroundColor: "#e0e0e0", cursor: "pointer" },
          }}
        >
          <ListItemIcon>
            <HomeIcon color={activeItem === "/" ? "primary" : "inherit"} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem
          onClick={() => handleNavigation("/dashboard")}
          sx={{
            backgroundColor:
              activeItem === "/dashboard" ? "#e0e0e0" : "inherit",
            "&:hover": { backgroundColor: "#e0e0e0", cursor: "pointer" },
          }}
        >
          <ListItemIcon>
            <DashboardIcon
              color={activeItem === "/dashboard" ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem
          onClick={() => handleNavigation("/dashboard/profile")}
          sx={{
            backgroundColor:
              activeItem === "/dashboard/profile" ? "primary" : "inherit",
            "&:hover": { backgroundColor: "#e0e0e0", cursor: "pointer" },
          }}
        >
          <ListItemIcon>
            <AccountBoxIcon
              color={
                activeItem === "/dashboard/profile" ? "primary" : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        <ListItem
          onClick={() => handleNavigation("/dashboard/transaction")}
          sx={{
            backgroundColor:
              activeItem === "/dashboard/transaction" ? "primary" : "inherit",
            "&:hover": { backgroundColor: "#e0e0e0", cursor: "pointer" },
          }}
        >
          <ListItemIcon>
            <ReceiptIcon
              color={
                activeItem === "/dashboard/transaction" ? "primary" : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItem>

        <ListItem
          onClick={() => handleNavigation("/dashboard/budget")}
          sx={{
            backgroundColor:
              activeItem === "/dashboard/transaction" ? "primary" : "inherit",
            "&:hover": { backgroundColor: "#e0e0e0", cursor: "pointer" },
          }}
        >
          <ListItemIcon>
            <AccountBalanceWalletIcon
              color={activeItem === "/dashboard/budget" ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText primary="Budget" />
        </ListItem>
        <Divider />
        <ListItem
          onClick={handleSignOut}
          sx={{
            backgroundColor:
              activeItem === "/dashboard/transaction" ? "primary" : "inherit",
            "&:hover": { backgroundColor: "#e0e0e0", cursor: "pointer" },
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
