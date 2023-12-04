import { memo, type ReactNode } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { EmptyLayout } from ".";

function ErrorLayout(props: {
  message: string | ReactNode;
  subMessage?: string | ReactNode;
}) {
  return (
    <EmptyLayout
      redirectPath="/"
      redirectButtonMessage="Back to Top"
      content={
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" fontWeight={700} color="black">
            Oops! Something Wrong...
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            Please connect to developer.
          </Typography>
          <Typography variant="h6" color="black">
            {props.message}
          </Typography>
          <Typography variant="body1">{props.subMessage}</Typography>
        </Box>
      }
    />
  );
}

const ErrorLayoutMemo = memo(ErrorLayout);
export default ErrorLayoutMemo;
