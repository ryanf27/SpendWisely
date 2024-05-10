import React from "react";
import Sidebar from "@/components/Sidebar";
import { Box } from "@mui/material";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", backgroundColor: "#f9f9f9" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, width: `calc(100% - 250px)` }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
