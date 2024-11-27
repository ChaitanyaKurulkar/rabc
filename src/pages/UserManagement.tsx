import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useStore from "../stores/appStore";
import AddEditUserModal from "../components/AddEditUserModel";
import {
  fetchUsers,
  addUser as apiAddUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from "../services/userService";
import { User } from "../models/User";

const UserManagement: React.FC = () => {
  const { users, setUsers, addUser, updateUser, deleteUser } = useStore();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleAddEditUser = async (user: Partial<User>) => {
    if (editingUser) {
      try {
        const updatedUser = await apiUpdateUser(editingUser.id, user);
        updateUser(editingUser.id, updatedUser!);
      } catch (error) {
        console.error("Failed to update user", error);
      }
    } else {
      try {
        const newUser = await apiAddUser({
          ...user,
          id: Date.now().toString(),
          isActive: true,
        } as User);
        addUser(newUser);
      } catch (error) {
        console.error("Failed to add user", error);
      }
    }
    setOpenModal(false);
    setEditingUser(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await apiDeleteUser(id);
      deleteUser(id);
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <CircularProgress />;

  return (
    <Box padding={3}>
      <Typography variant="h4" marginBottom={2}>
        User Management
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <TextField
          variant="outlined"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ width: "250px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
        >
          Add User
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setEditingUser(user);
                        setOpenModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddEditUserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddEditUser}
        user={editingUser}
      />
    </Box>
  );
};

export default UserManagement;
