import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState, useContext } from "react";
import { HamburgerMenu } from "@refinedev/mui";
import { ColorModeContext } from "../../contexts/color-mode";

export const Header: React.FC = () => {
  const { mode, setMode } = useContext(ColorModeContext);

  const [profileAnchorEl, setProfileAnchorEl] =
    useState<null | HTMLElement>(null);

  const handleProfileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
      <HamburgerMenu/>

        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            gap={2}
          >
            
            {/* Tombol Toggle Dark/Light Mode */}
            <IconButton
              color="inherit"
              onClick={() => {
                setMode();
              }}
            >
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>

            {/* Informasi Profil Pengguna */}
            <Stack direction="row" gap="16px" alignItems="center">
              <Typography
                sx={{
                  display: {
                    xs: "none",
                    sm: "inline-block",
                  },
                }}
                variant="subtitle2"
              >
                John Doe
              </Typography>
              <IconButton onClick={handleProfileMenuClick}>
                <Avatar
                  src="https://via.placeholder.com/40"
                  alt="John Doe"
                />
              </IconButton>
              <Menu
                anchorEl={profileAnchorEl}
                open={Boolean(profileAnchorEl)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
              </Menu>
            </Stack>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
