import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
  type ForwardRefRenderFunction,
  type FormEvent,
} from "react";
import type { User } from "firebase/auth";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { MOCK_AVATAR_URL } from "@/__mocks__";

export type ProfileUpdateDrawerRef = {
  handleOpen: () => void;
  handleClose: () => void;
};

type ProfileUpdateDrawerProps = {
  user: User | null;
  update: (params: { displayName: string; photoURL: string }) => void;
};

const ProfileUpdateDrawer: ForwardRefRenderFunction<
  ProfileUpdateDrawerRef,
  ProfileUpdateDrawerProps
> = (props, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  useImperativeHandle(
    ref,
    () => ({
      handleOpen,
      handleClose,
    }),
    [handleOpen, handleClose],
  );

  const onSubmit = useCallback(
    (e: FormEvent<UpdateForm>) => {
      e.preventDefault();
      const elements = e.currentTarget.elements;
      const displayName = elements.displayName?.value;
      const photoURL = elements.photoURL?.value;
      //   if (
      //     displayName === props.user?.displayName ||
      //     photoURL === props.user?.photoURL
      //   ) {
      //     // nothing changed
      //     return;
      //   }
      props.update?.({ displayName, photoURL });
      handleClose();
    },
    [props, handleClose],
  );

  return (
    <Drawer anchor="bottom" open={open} onClose={handleClose}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 4 }}>
          Ready to update ?
        </Typography>

        <Box component="form" onSubmit={onSubmit}>
          {/* displayName */}
          <Box sx={{ mb: 2 }}>
            <TextField
              label="用户名"
              name="displayName"
              fullWidth
              defaultValue={props.user?.displayName || props.user?.email}
            />
          </Box>
          {/* avatar photo url */}
          <Box sx={{ mb: 2 }}>
            <TextField
              label="头像图片地址"
              name="photoURL"
              fullWidth
              defaultValue={props.user?.photoURL || MOCK_AVATAR_URL}
            />
          </Box>

          <Stack
            spacing={1}
            direction={{
              xs: "column",
              sm: "row",
            }}
          >
            <Button variant="contained" type="submit">
              更新
            </Button>
          </Stack>
        </Box>
      </Container>
    </Drawer>
  );
};

const ProfileUpdateDrawerMemo = memo(forwardRef(ProfileUpdateDrawer));
export default ProfileUpdateDrawerMemo;

interface UpdateForm extends HTMLFormElement {
  readonly elements: FormElements;
}
interface FormElements extends HTMLFormControlsCollection {
  displayName: HTMLInputElement;
  photoURL: HTMLInputElement;
}
