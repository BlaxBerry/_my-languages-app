import { memo, type ReactNode } from "react";
import Container from "@mui/material/Container";
import styles from "@/styles/_variables.module.scss";

const MAIN_HEIGHT = styles.root_layout_main_height;

function RootLayoutMain(props: { children: ReactNode }) {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        minHeight: MAIN_HEIGHT,
      }}
    >
      {props.children}
    </Container>
  );
}

const RootLayoutMainMemo = memo(RootLayoutMain);
export default RootLayoutMainMemo;
