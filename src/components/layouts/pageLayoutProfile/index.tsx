import { memo, useCallback, useRef } from "react";
import type { User } from "firebase/auth";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import ProfileAccountInfo from "./accountInfo";
import ProfileUpdateDrawer, {
  type ProfileUpdateDrawerRef,
} from "./updateDrawer";

function PageLayoutProfile(props: {
  user: User | null;
  // userNotes: NotesDoc;
  // userPlans: PlansDoc;
  logout: () => void;
  update: (params: { displayName: string; photoURL: string }) => void;
}) {
  const { user, update } = props;

  const refUpdateDrawer = useRef<ProfileUpdateDrawerRef>(null);
  const showUpdateDrawer = useCallback(() => {
    refUpdateDrawer.current?.handleOpen();
  }, []);

  return (
    <Box>
      {/* 1. user account info & update */}
      <ProfileAccountInfo {...{ user, showUpdateDrawer }} />

      {/* 2. user info update drawer */}
      <ProfileUpdateDrawer ref={refUpdateDrawer} {...{ user, update }} />

      {/* 3. user's something */}
      <Box sx={{ px: 2, py: 4 }}>
        接触过的语言
        <Grid container spacing={2} sx={{ py: 4 }}>
          {[1, 2, 3, 4, 5, 6].map((e) => (
            <Grid item key={e} xs={6} sm={4} md={3} lg={2}>
              <Card>
                <CardActionArea>
                  <CardContent>xx</CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        个人笔记
        <Grid container spacing={2} sx={{ py: 4 }}>
          {[1, 2].map((e) => (
            <Grid item key={e} xs={12} md={6} lg={4}>
              <Card>
                <CardActionArea>
                  <CardContent>xx</CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        学习计划
        <Grid container spacing={2} sx={{ py: 4 }}>
          {[1, 2, 3, 4].map((e) => (
            <Grid item key={e} xs={12} md={6} lg={4}>
              <Card>
                <CardActionArea>
                  <CardContent>xx</CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="error" onClick={props.logout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}

const PageLayoutProfileMemo = memo(PageLayoutProfile);
export default PageLayoutProfileMemo;
