import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { Role } from "../models/Role";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (role: Omit<Role, "id">) => void;
  role?: Role | null;
}

//creating role model
const AddEditRoleModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  role,
}) => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });

  useEffect(() => {
    if (role) {
      setName(role.name);
      setPermissions(
        role.permissions || { read: false, write: false, delete: false }
      );
    } else {
      setName("");
      setPermissions({ read: false, write: false, delete: false });
    }
  }, [role]);

  const handlePermissionChange = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit({ name, permissions });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{role ? "Edit Role" : "Add Role"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Role Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box marginTop={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={permissions.read}
                onChange={() => handlePermissionChange("read")}
              />
            }
            label="Read"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={permissions.write}
                onChange={() => handlePermissionChange("write")}
              />
            }
            label="Write"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={permissions.delete}
                onChange={() => handlePermissionChange("delete")}
              />
            }
            label="Delete"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {role ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditRoleModal;
