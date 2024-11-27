import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { User } from "../models/User";

interface AddEditUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: Partial<User>) => void;
  user: User | null;
}

//user model
const AddEditUserModal: React.FC<AddEditUserModalProps> = ({
  open,
  onClose,
  onSubmit,
  user,
}) => {
  const [formData, setFormData] = useState<Partial<User>>(user || {});
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData(user || {});
    setError("");
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.role ||
      !formData.password
    ) {
      setError("All fields are required.");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        bgcolor="white"
        p={3}
        borderRadius={2}
        maxWidth={400}
        mx="auto"
        mt="20vh"
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Typography variant="h6">{user ? "Edit User" : "Add User"}</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Role"
          name="role"
          value={formData.role || ""}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password || ""}
          onChange={handleChange}
          fullWidth
        />
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEditUserModal;
