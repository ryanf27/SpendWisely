"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
} from "@mui/material";

interface ProfileData {
  username: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/profile");

        if (!response.ok) {
          throw new Error(`Failed to fetch profile data: ${response.status}`);
        }

        const data = await response.json();

        setProfile(data.userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
      {isLoading ? (
        <Typography variant="body1" color="textSecondary" align="center">
          Loading profile...
        </Typography>
      ) : error ? (
        <Typography variant="body1" color="error" align="center">
          Error: {error}
        </Typography>
      ) : profile ? (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            My Profile
          </Typography>
          <Avatar
            src="https://images.unsplash.com/photo-1713145872507-3ca2c884ecc2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile Picture"
            sx={{ width: 90, height: 90, mx: "auto" }}
          />
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              value={profile.username}
              variant="outlined"
              disabled
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={profile.email}
              variant="outlined"
              disabled
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              value={profile.password}
              variant="outlined"
              disabled
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Update Profile
            </Button>
          </form>
        </Paper>
      ) : (
        <Typography variant="body1" color="textSecondary" align="center">
          No profile data found.
        </Typography>
      )}
    </Container>
  );
};

export default Profile;
