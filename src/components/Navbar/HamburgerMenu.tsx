import { IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { Menu as MenuIcon, MenuOpen } from "@mui/icons-material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { NAV_ITEMS } from "./NavbarItems";

export const HamburgerMenu = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
      >
        {open ? <MenuOpen /> : <MenuIcon />}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        open={open}
        PaperProps={{
          sx: {
            width: 210,
            maxWidth: "100%",
            backgroundColor: "primary.main",
            color: "white",
          },
        }}
      >
        {NAV_ITEMS.map((item) => (
          <MenuItem key={item.label} onClick={() => history.push(item.to)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
