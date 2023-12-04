import { memo, useMemo } from "react";
import dayjs from "dayjs";
import type { User } from "firebase/auth";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { ProfileAvatarImg } from "@/components";
import { getDiffDaysAgo } from "@/utils/helpers";

function ProfileAccountInfo(props: {
  user: User | null;
  showUpdateDrawer: () => void;
}) {
  const { user } = props;

  const createAtFormatted = useMemo<string>(() => {
    const d = dayjs(user?.metadata?.creationTime);
    return d.format("YYYY-MM-DD");
  }, [user?.metadata?.creationTime]);

  const lastLoginAtDiffFromNow = useMemo<string>(() => {
    const dateString = dayjs(user?.metadata?.lastSignInTime).format();
    const diffDaysAgo = getDiffDaysAgo(dateString);
    return diffDaysAgo === 0 ? "Today" : `${diffDaysAgo}days ago`;
  }, [user?.metadata?.lastSignInTime]);

  return (
    <>
      <Grid container spacing={2} sx={{ py: 4 }}>
        {/* 1. avatar */}
        <Grid
          item
          xs={12}
          md={4}
          display="flex"
          justifyContent={{
            xs: "center",
            md: "flex-end",
          }}
        >
          <ProfileAvatarImg user={user} />
        </Grid>
        {/* 2. name & uid & email &  meteData */}
        <Grid
          item
          xs={12}
          md={8}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems={{
            xs: "center",
            md: "flex-start",
          }}
        >
          {/* 2.1 name */}
          <Box display="flex" alignItems="center">
            <Typography variant="h6" fontWeight={700} noWrap>
              {user?.displayName ?? `No Name`}
            </Typography>
            <IconButton
              color="secondary"
              size="small"
              sx={{ ml: 1 }}
              onClick={props.showUpdateDrawer}
            >
              <EditNoteIcon />
            </IconButton>
          </Box>
          <Box>
            {/* 2.2 uid */}
            <Typography variant="body2" color="grey" component="p">
              <Box component="span" display="inline-block" sx={{ width: 50 }}>
                UID
              </Box>
              {user?.uid}
            </Typography>
            {/* 2.3 email */}
            <Typography variant="body2" color="grey">
              <Box component="span" display="inline-block" sx={{ width: 50 }}>
                Email
              </Box>
              {user?.email}
            </Typography>
          </Box>
          {/* 2.4 user meteData description */}
          <Typography
            component="p"
            variant="caption"
            color="grey"
            fontStyle="italic"
            sx={{ py: 2 }}
          >
            {`Hi~ Dear ${user?.displayName || "User " + user?.email}. `}
            <br />
            {`Your account created at ${createAtFormatted}. `}
            <br />
            {`Your last login is ${lastLoginAtDiffFromNow ?? "?"}. `}
            <br />
            {`Enjoy your study, have a nice day. `}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

const ProfileAccountInfoMemo = memo(ProfileAccountInfo);
export default ProfileAccountInfoMemo;
