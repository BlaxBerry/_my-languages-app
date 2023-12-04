import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/system/Box";
import styles from "@/styles/_variables.module.scss";
import { CLIENT_NAVIGATION } from "@/utils/constants";

const HEADER_HEIGHT = styles.root_layout_header_height;

function NavPCMenu() {
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        display: {
          xs: "none",
          sm: "flex",
        },
        height: "100%",
        alignItems: "center",
      }}
    >
      {CLIENT_NAVIGATION.filter(({ label }) => label !== "Home").map(
        ({ label, path }) => {
          const isActive = pathname.startsWith(path);
          return (
            <Link
              key={label}
              to={path}
              style={{
                boxSizing: "border-box",
                display: "inline-block",
                height: "100%",
                lineHeight: HEADER_HEIGHT,
                padding: "0 1rem",
                transition: "all 0.25s linear",
                borderBottom: `3px solid ${isActive ? "white" : "transparent"}`,
              }}
            >
              {label}
            </Link>
          );
        },
      )}
    </Box>
  );
}

const NavPCMenuMemo = memo(NavPCMenu);
export default NavPCMenuMemo;
