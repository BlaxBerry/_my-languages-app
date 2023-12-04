import { memo } from "react";
import type { User } from "@firebase/auth";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

function ProfileAvatarImg(props: { user: User | null }) {
  const { user } = props;

  return (
    <Badge
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      overlap="circular"
      color={user?.emailVerified ? "success" : "error"}
      sx={{
        width: 100,
        height: 100,
        "& .MuiBadge-badge": { p: 0 },
      }}
      badgeContent={
        <Tooltip
          placement="right"
          arrow
          title={user?.emailVerified ? "邮箱已验证" : "邮箱未验证"}
        >
          {user?.emailVerified ? (
            <DoneIcon sx={{ width: 15, height: 15 }} />
          ) : (
            <CloseIcon sx={{ width: 15, height: 15 }} />
          )}
        </Tooltip>
      }
    >
      <Avatar
        src={user?.photoURL ?? ""}
        alt=""
        sx={{
          width: 100,
          height: 100,
          border: 2,
          borderColor: user?.emailVerified ? "green" : "red",
        }}
      />
    </Badge>
  );
}

const ProfileAvatarImgMemo = memo(ProfileAvatarImg);
export default ProfileAvatarImgMemo;
