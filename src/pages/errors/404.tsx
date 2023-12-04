import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { EmptyLayout } from "@/layouts/common";

export default function Error404Index() {
  return (
    <EmptyLayout
      redirectPath="/"
      redirectButtonMessage="Back to Top"
      content={
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" fontWeight={700} color="black">
            404
          </Typography>
          <Typography variant="body1">Page Not Found...</Typography>
        </Box>
      }
    />
  );
}
