import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import { Role } from "../models/Role";

interface RoleTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (id: string) => void;
}

const RoleTable: React.FC<RoleTableProps> = ({ roles, onEdit, onDelete }) => {
  const [sortBy, setSortBy] = useState<keyof Role>("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (property: keyof Role) => {
    const isAsc = sortBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setSortBy(property);
  };

  const sortedRoles = [...roles].sort((a, b) => {
    const comparison =
      a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0;
    return order === "asc" ? comparison : -comparison;
  });

  const paginatedRoles = sortedRoles.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatPermissions = (permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
  }) => {
    const formatted = Object.entries(permissions)
      .filter(([, value]) => value) // Include only true permissions
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1)); // Capitalize
    return formatted.join(", ");
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortBy === "name"}
                direction={order}
                onClick={() => handleSort("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "permissions"}
                direction={order}
                onClick={() => handleSort("permissions")}
              >
                Permissions
              </TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRoles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{formatPermissions(role.permissions)}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => onEdit(role)}>
                  Edit
                </Button>
                <Button color="secondary" onClick={() => onDelete(role.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={roles.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) =>
          setRowsPerPage(parseInt(e.target.value, 10))
        }
      />
    </>
  );
};

export default RoleTable;
