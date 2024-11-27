import axios from "axios";
import { User } from "../models/User";

const BASE_URL = "http://localhost:3001/users";

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(BASE_URL);
  return response.data;
};

// Add a new user
export const addUser = async (user: User): Promise<User> => {
  const response = await axios.post<User>(BASE_URL, user);
  return response.data;
};

// Update a user
export const updateUser = async (
  id: string,
  updatedUser: Partial<User>
): Promise<User | null> => {
  const response = await axios.patch<User>(`${BASE_URL}/${id}`, updatedUser);
  return response.data;
};

// Delete a user
export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
