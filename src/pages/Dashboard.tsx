import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import useStore from "../stores/appStore";
import { logout } from "../services/authService";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const loggedInUser = useStore((state) => state.loggedInUser);
  const setLoggedInUser = useStore((state) => state.setLoggedInUser);

  const handleLogout = async () => {
    try {
      await logout();
      setLoggedInUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!loggedInUser) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h6">You are not logged in.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* AppBar */}
      <AppBar position="static" color="primary">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, textAlign: "center" }}
          ></Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Welcome Section */}
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ mt: 4 }}>
          Welcome, {loggedInUser.name}
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          gutterBottom
          textAlign="center"
        >
          Role: {loggedInUser.role}
        </Typography>

        {/* Cards Section */}
        <Grid
          container
          spacing={4}
          sx={{
            mt: 4,
            width: "100%",
            maxWidth: "1200px",
            justifyContent: "center",
          }}
        >
          {/* User Management */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  User Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage users with options to add, edit, and delete.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => navigate("/users")}
                >
                  Manage Users
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Role Management */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Role Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Adjust roles and permissions in the system.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => navigate("/roles")}
                >
                  Manage Roles
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
