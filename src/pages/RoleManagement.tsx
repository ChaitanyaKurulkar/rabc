import React, { useEffect, useState } from "react";
import { Button, Typography, Box, CircularProgress, Grid } from "@mui/material";
import {
  fetchRoles,
  addRole,
  updateRole,
  deleteRole,
} from "../services/roleService";
import RoleTable from "../components/RoleTable";
import { Role } from "../models/Role";
import AddEditRoleModal from "../components/AddEditRoleModel";

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  useEffect(() => {
    const fetchAllRoles = async () => {
      const data = await fetchRoles();
      setRoles(data);
      setLoading(false);
    };
    fetchAllRoles();
  }, []);

  const handleAddEditRole = async (role: Omit<Role, "id">) => {
    if (editingRole) {
      const updatedRole = await updateRole(editingRole.id, role);
      if (updatedRole) {
        setRoles((prev) =>
          prev.map((r) => (r.id === editingRole.id ? updatedRole : r))
        );
      }
    } else {
      const newRole = await addRole({
        id: Date.now().toString(),
        ...role,
      });
      setRoles((prev) => [...prev, newRole]);
    }
    setOpenModal(false);
    setEditingRole(null);
  };

  const handleDeleteRole = async (id: string) => {
    const success = await deleteRole(id);
    if (success) {
      setRoles((prev) => prev.filter((role) => role.id !== id));
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8}>
          <Typography variant="body1">
            Manage roles and permissions effectively.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} textAlign="right">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            Add Role
          </Button>
        </Grid>
      </Grid>
      <RoleTable
        roles={roles}
        onEdit={setEditingRole}
        onDelete={handleDeleteRole}
      />
      <AddEditRoleModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddEditRole}
        role={editingRole}
      />
    </Box>
  );
};

export default RoleManagement;
