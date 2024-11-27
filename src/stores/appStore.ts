import { User } from "../models/User";
import { Role } from "../models/Role";
import { create } from "zustand";

interface AppState {
  users: User[];
  roles: Role[];
  loggedInUser: User | null;
  setLoggedInUser: (user: User | null) => void;
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updatedUser: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

const useStore = create<AppState>((set) => ({
  users: [],
  roles: [],
  // User Operations
  loggedInUser: null,
  setLoggedInUser: (user) => set(() => ({ loggedInUser: user })),
  setUsers: (users: User[]) => set(() => ({ users })),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  // Role Operations
  addRole: (role: Role) => set((state) => ({ roles: [...state.roles, role] })),
  updateRole: (id: string, updatedRole: Partial<Role>) =>
    set((state) => ({
      roles: state.roles.map((role) =>
        role.id === id ? { ...role, ...updatedRole } : role
      ),
    })),
  deleteRole: (id: string) =>
    set((state) => ({
      roles: state.roles.filter((role) => role.id !== id),
    })),
}));

export default useStore;
