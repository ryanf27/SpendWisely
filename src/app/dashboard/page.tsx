// pages/dashboard/page.tsx
import React from "react";

import Typography from "@mui/material/Typography";

const Page = () => {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard Page
      </Typography>
      <Typography paragraph>
        Welcome to your Dashboard. Use the sidebar to navigate through the
        application.
      </Typography>
    </>
  );
};

export default Page;
