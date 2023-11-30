import { memo, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, colors } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CLIENT_NAVIGATION } from "@/utils/constants";
import styles from "@/styles/_variables.module.scss";

const HEADER_HEIGHT = styles.root_layout_header_height;

function NavMobileMenu() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);

  const handleNavigate = useCallback(
    (path: string) => navigate(path),
    [navigate],
  );

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu-button"
        sx={{
          display: {
            xs: "flex",
            sm: "none",
          },
        }}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "flex",
            sm: "none",
          },
        }}
      >
        <Box
          sx={{
            height: HEADER_HEIGHT,
            p: 2,
            mb: 1,
          }}
        >
          <Typography
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mb: 1 }}
          >
            Menu
          </Typography>
          <Divider />
        </Box>

        <MenuList sx={{ p: 2, pt: 0 }}>
          {CLIENT_NAVIGATION.map(({ label, path, icon }) => {
            const isActive = pathname.endsWith(path);
            return (
              <MenuItem
                key={label}
                selected={isActive}
                sx={{ color: isActive ? colors.blueGrey[500] : "default" }}
                onClick={() => handleNavigate(path)}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{label}</ListItemText>
              </MenuItem>
            );
          })}

          <Divider />
        </MenuList>
      </Drawer>
    </>
  );
}

const NavMobileMenuMemo = memo(NavMobileMenu);
export default NavMobileMenuMemo;
