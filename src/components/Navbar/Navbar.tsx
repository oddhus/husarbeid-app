import { useHistory } from "react-router-dom";
import { NAV_ITEMS } from "./NavbarItems";
import { removeToken } from "../../utils/tokenUtils";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { isLoggedInState } from "../Authentication/authSelector";
import { userState } from "../Authentication/authAtom";
import { NavLink } from "../shared/NavLink";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import { Logout, PersonAdd, Settings } from "@material-ui/icons";
import { AccountButton } from "./AccountButton";
import { HamburgerMenu } from "./HamburgerMenu";

export const Navbar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (to: string) => {
    history.push(to);
    handleClose();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <HamburgerMenu />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            {isLoggedIn ? (
              <AccountButton />
            ) : (
              <Button color="inherit" onClick={() => history.push("/signin")}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {/* <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* <IconButton
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
      </Box> */}
    </>
  );
};
