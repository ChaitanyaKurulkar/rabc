import { Permission } from "../models/Permission";

export const fetchPermissions = async (): Promise<Permission[]> => {
  try {
    const response = await fetch("http://localhost:3001/permissions");
    if (!response.ok) throw new Error("Failed to fetch permissions.");
    return response.json();
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return [];
  }
};
