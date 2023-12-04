import { memo, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import type { User } from "firebase/auth";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import ProfileAccountInfo from "./accountInfo";
import ProfileUpdateDrawer, {
  type ProfileUpdateDrawerRef,
} from "./updateDrawer";
import { FlagImg } from "@/components";
import type { UserNoteDoc } from "@/types/db/notes";

function PageLayoutProfile(props: {
  user: User | null;
  userNotes: Array<UserNoteDoc>;
  logout: () => void;
  update: (params: { displayName: string; photoURL: string }) => void;
}) {
  const { user, update, userNotes } = props;

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
        <Box>
          <Typography>接触过的语言</Typography>
          <Grid container spacing={2} sx={{ py: 4 }}>
            {[1, 2, 3, 4, 5, 6].map((e) => (
              <Grid item key={e} xs={6} sm={4} md={2} lg={2}>
                <Card>
                  <CardActionArea>
                    <CardContent>xx</CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* user's notes */}
        {userNotes?.length > 0 && (
          <Box sx={{ py: 4 }}>
            <Badge color="secondary" badgeContent={userNotes?.length}>
              <Typography sx={{ pr: 1.5 }} fontWeight={700}>
                个人笔记
              </Typography>
            </Badge>
            <Grid container spacing={2} sx={{ pt: 2 }}>
              {userNotes?.map((note) => (
                <Grid item key={note.noteID} xs={12} sm={6} md={4} lg={4}>
                  <Link to={`/notes/${note.noteID}?authorUID=${user?.uid}`}>
                    <Card>
                      <CardActionArea>
                        <CardContent
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <FlagImg language={note.language} />
                          <Typography noWrap sx={{ ml: 2 }}>
                            {note.title}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <Box>
          <Typography>学习计划</Typography>
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
