import { Role } from "../models/Role";

const API_URL = "http://localhost:3001/roles";

// Fetch all roles
export const fetchRoles = async (): Promise<Role[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

// Add a new role
export const addRole = async (role: Role): Promise<Role> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(role),
  });
  return response.json();
};

// Update a role
export const updateRole = async (
  id: string,
  updatedRole: Partial<Role>
): Promise<Role | null> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedRole),
  });
  return response.ok ? response.json() : null;
};

// Delete a role
export const deleteRole = async (id: string): Promise<boolean> => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return response.ok;
};
