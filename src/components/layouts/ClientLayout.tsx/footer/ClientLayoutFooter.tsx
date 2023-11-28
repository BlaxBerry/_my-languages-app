import { memo } from "react";
import { colors } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import styles from "@/styles/_variables.module.scss";

const FOOTER_HEIGHT = styles.root_layout_footer_height;

function ClientLayoutFooter() {
  return (
    <Typography
      component="footer"
      variant="caption"
      sx={{ height: FOOTER_HEIGHT }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: "100%",
          borderTop: `1px solid ${colors.blueGrey[200]}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Copyright © 2023-present BlaxBerry
      </Container>
    </Typography>
  );
}

const ClientLayoutFooterMemo = memo(ClientLayoutFooter);
export default ClientLayoutFooterMemo;
