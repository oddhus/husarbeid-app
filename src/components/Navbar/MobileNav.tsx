import { Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { NAV_ITEMS } from "../../routes/NavbarItems";
import { MobileNavItem } from "./MobileNavItem";

type ToggleFunc = {
  toggleMenu: () => void;
};

export const MobileNav: React.FC<ToggleFunc> = ({ toggleMenu }) => {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Stack bg={bg} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          toggleMenu={toggleMenu}
          {...navItem}
        />
      ))}
    </Stack>
  );
};
