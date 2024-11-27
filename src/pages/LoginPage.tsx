import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { login } from "../services/authService";
import useStore from "../stores/appStore";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setLoggedInUser = useStore((state) => state.setLoggedInUser);

  const handleLogin = async () => {
    setError(null);
    try {
      const user = await login(email, password);
      setLoggedInUser(user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
    >
      <Card style={{ width: 400 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Welcome Back!
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box mt={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              style={{ marginTop: 16 }}
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
