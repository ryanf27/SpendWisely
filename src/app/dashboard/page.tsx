"use client";

import React from "react";
import { useSession, signIn } from "next-auth/react";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    signIn("credentials", { redirect: false });
    router.push("/login");
    return null;
  }

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
