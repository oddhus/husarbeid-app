export type NavItem = {
  label: string;
  to: string;
};

export type storedUser = {
  token: string;
  expirationTime: Date;
  user: User;
};

export type User = {
  userId: string;
  username: string;
  familyId?: string | null;
};
