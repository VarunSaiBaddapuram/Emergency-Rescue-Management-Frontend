import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAppDispatch } from "../../store/hooks";
import { setAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { toast } from "react-toastify";
import { ApiError } from "../../types/api.types";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });
      
      const { token, user } = response.data;
      
      dispatch(setAuth({ token, user }));
      
      toast.success("Login successful!");

      // Simple role-based redirect
      if (user.role === "admin") {
        navigate("/agency/home");
      } else if (user.role === "reliefCenter") {
        navigate("/my-relief-center");
      } else if (user.role === "collectionCenter") {
        navigate("/my-collection-center");
      } else {
        navigate("/");
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const paperStyle = {
    padding: 40,
    height: "auto",
    width: 350,
    margin: "80px auto",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  };

  const avatarStyle = { backgroundColor: "#1bbd7e", marginBottom: 16 };
  const btnStyle = { margin: "24px 0" };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Avatar style={avatarStyle}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" fontWeight="bold">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
          <TextField
            label="Email"
            placeholder="Enter Email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnStyle}
            fullWidth
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Box>
        <Typography>
          Don't have an account?{" "}
          <Link href="/agency/register" underline="hover">
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
