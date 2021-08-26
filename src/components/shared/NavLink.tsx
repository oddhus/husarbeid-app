import { Link } from "@material-ui/core";
import React, { ReactNode } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

export const NavLink = ({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) => (
  <Link component={ReactRouterLink} to={to} variant="body2">
    {children}
  </Link>
);
