export interface Role {
  id: string;
  name: string;
  permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
  };
}
