import axios from "axios";
import { User } from "../models/User";

const BASE_URL = "http://localhost:3001";

export const login = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      params: { email, password },
    });

    const users: User[] = response.data;

    if (users.length > 0) {
      return users[0];
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

// Logout a user
export const logout = async (): Promise<void> => {
  await axios.post(`${BASE_URL}/users`);
};
