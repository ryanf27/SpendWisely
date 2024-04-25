"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";

interface ProfileData {
  username: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [editProfile, setEditProfile] = useState<ProfileData>();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) {
          throw new Error(`Failed to fetch profile data: ${response.status}`);
        }
        const data = await response.json();
        setProfile(data.userData);
        setEditProfile(data.userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditProfile((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    if (profile.newPassword !== profile.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editProfile),
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`);
      }

      const updatedData = await response.json();
      setProfile(updatedData);
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
      {isLoading ? (
        <CircularProgress />
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
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              name="username"
              value={editProfile?.username || ""}
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              value={editProfile?.email || ""}
              variant="outlined"
              onChange={handleChange}
            />

            <Typography variant="h6" sx={{ mt: 4 }}>
              Change Password
            </Typography>

            <TextField
              fullWidth
              label="Old Password"
              type="password"
              margin="normal"
              name="oldPassword"
              value={profile.oldPassword}
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              margin="normal"
              name="newPassword"
              value={profile.newPassword}
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              margin="normal"
              name="confirmPassword"
              value={profile.confirmPassword}
              variant="outlined"
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
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
