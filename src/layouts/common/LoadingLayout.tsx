import { memo } from "react";
import styles from "@/styles/_variables.module.scss";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const MAIN_HEIGHT = styles.root_layout_main_height;

function LoadingLayout(props: { message?: string }) {
  return (
    <Box
      sx={{ minHeight: MAIN_HEIGHT }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress disableShrink color="secondary" />
      <Typography color="grey" component="div" sx={{ py: 2 }}>
        {props.message || "Loading..."}
      </Typography>
    </Box>
  );
}

const LoadingLayoutMemo = memo(LoadingLayout);
export default LoadingLayoutMemo;
