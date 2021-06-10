import {
  Box,
  Flex,
  Text,
  IconButton,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import { NavBarButtonGroup } from "./NavBarButtonGroup";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { isLoggedInState } from "../Authentication/authSelector";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.600", "white");
  const borderColor = useColorModeValue("gray.200", "gray.900");
  const colorText = useColorModeValue("gray.800", "white");
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const history = useHistory();

  return (
    <Box>
      <Flex
        bg={bg}
        color={color}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={borderColor}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          {isLoggedIn && (
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          )}
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={colorText}
            onClick={() => history.push("/")}
            _hover={{ cursor: "pointer" }}
          >
            Husarbeid
          </Text>

          {isLoggedIn && (
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          )}
        </Flex>
        <NavBarButtonGroup />
      </Flex>

      {isLoggedIn && (
        <Collapse in={isOpen} animateOpacity>
          <MobileNav toggleMenu={onToggle} />
        </Collapse>
      )}
    </Box>
  );
};
