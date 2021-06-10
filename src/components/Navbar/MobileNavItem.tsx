import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Link,
  Stack,
  useColorModeValue,
  useDisclosure,
  Text,
  Icon,
  Collapse,
} from "@chakra-ui/react";
import React from "react";
import { NavItem } from "../../types";

type ToggleFunc = {
  toggleMenu: () => void;
};

export const MobileNavItem = ({
  label,
  children,
  href,
  toggleMenu,
}: NavItem & ToggleFunc) => {
  const { isOpen, onToggle } = useDisclosure();
  const colorText = useColorModeValue("gray.600", "gray.200");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
        {...(!children && { onClick: toggleMenu })}
      >
        <Text fontWeight={600} color={colorText}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={borderColor}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.label}
                py={2}
                href={child.href}
                {...(children && { onClick: toggleMenu })}
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
