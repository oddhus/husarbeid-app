import React, { ReactNode } from "react";
import { Link, useColorModeValue } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export const NavLink = ({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) => (
  <Link
    as={ReactRouterLink}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    to={to}
  >
    {children}
  </Link>
);
