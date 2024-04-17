"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Link as MuiLink,
  Divider,
  Snackbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to register");
      router.push("/login");
    } catch (error) {
      console.error("Registration Error:", error);
      setErrorMessage("Registration failed. Please try again.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <Box
        sx={{
          background:
            "url('https://images.unsplash.com/photo-1541140911322-98afe66ea6da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdoaXRlJTIwJTIwYmFja2dyb3VuZCUyMGZpbmFuY2lhbHxlbnwwfHwwfHx8MA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          p: 3,
          borderRadius: 2,
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        }}
      >
        <IconButton
          sx={{
            color: "black",
            mb: 2,
            padding: 2,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
          }}
          component={Link}
          href="/"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ mb: 2, color: "black" }}>
          Register
        </Typography>
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={() => signIn("google")}
          sx={{ width: "100%", borderColor: "#4285F4", color: "#4285F4" }}
        >
          Login with Google
        </Button>
        <Divider sx={{ width: "100%", my: 2, borderColor: "#ccc" }}>OR</Divider>
        <form onSubmit={handleSubmit} style={{ width: "100%" }} noValidate>
          <TextField
            fullWidth
            margin="normal"
            id="username"
            name="username"
            label="Username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            sx={{ input: { color: "black" }, label: { color: "black" } }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ input: { color: "black" }, label: { color: "black" } }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ input: { color: "black" }, label: { color: "black" } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Typography sx={{ mt: 2, color: "black" }}>
            Already have an account?{" "}
            <MuiLink href="/login" sx={{ color: "#4285F4" }}>
              Sign in
            </MuiLink>
          </Typography>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={errorMessage}
        />
      </Box>
    </Container>
  );
};

export default Register;
