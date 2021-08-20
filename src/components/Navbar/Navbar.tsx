import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NAV_ITEMS } from "./NavbarItems";
import { removeToken } from "../../utils/tokenUtils";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { isLoggedInState } from "../Authentication/authSelector";
import { userState } from "../Authentication/authAtom";
import { NavLink } from "../shared/NavLink";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const resetUser = useResetRecoilState(userState);
  const history = useHistory();

  const handleLogOut = () => {
    resetUser();
    removeToken();
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Husarbeid</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.label} to={item.to}>
                  {item.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {isLoggedIn ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <NavLink to={"/family"}>My Family</NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to={"/my-account"}>My Account</NavLink>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => handleLogOut()}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Button onClick={() => history.push("/signin")}>Log in</Button>
              </>
            )}
          </Flex>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.label} to={item.to}>
                  {item.label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
};
