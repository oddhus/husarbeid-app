export type NavItem = {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
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
