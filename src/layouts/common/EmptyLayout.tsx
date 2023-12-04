import { memo, type ReactNode } from "react";
import { useNavigate } from "react-router";
import styles from "@/styles/_variables.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const MAIN_HEIGHT = styles.root_layout_main_height;

function EmptyLayout({
  content,
  redirectPath,
  redirectButtonMessage,
  redirectReplace = true,
}: {
  content: string | ReactNode;
  redirectPath?: string;
  redirectButtonMessage?: string;
  redirectReplace?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{ minHeight: MAIN_HEIGHT }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography color="grey" component="div" sx={{ py: 2 }}>
        {content}
      </Typography>

      {redirectPath && (
        <Button
          variant="outlined"
          onClick={() =>
            redirectPath && navigate(redirectPath, { replace: redirectReplace })
          }
        >
          {redirectButtonMessage ?? "Redirect"}
        </Button>
      )}
    </Box>
  );
}

const EmptyLayoutMemo = memo(EmptyLayout);
export default EmptyLayoutMemo;
