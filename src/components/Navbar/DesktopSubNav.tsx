import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Link,
  Stack,
  useColorModeValue,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { NavItem } from "../../types";

export const DesktopSubNav: React.FC<NavItem> = ({ label, href, subLabel }) => {
  const bg = useColorModeValue("pink.50", "gray.900");

  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};
