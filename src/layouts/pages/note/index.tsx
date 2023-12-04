import { memo } from "react";
import type { UserNoteDoc, UserNoteCommentDoc } from "@/types/db/notes";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import NoteContentsMemo from "./contents";
import NoteCommentsMemo from "./comments";
import { FlagImg } from "@/components";
import { EmptyLayout } from "@/layouts/common";

function PageLayoutNote(props: {
  noteData?: UserNoteDoc | undefined;
  noteComments: Array<UserNoteCommentDoc>;
}) {
  const { noteData, noteComments } = props;

  if (!noteData) {
    return (
      <EmptyLayout
        content={`查无此文档 (ー_ー)|||`}
        redirectPath="/notes"
        redirectButtonMessage="查看更多"
      />
    );
  }

  return (
    <Box>
      {/* note tile & meteData*/}
      <Box>
        <Typography variant="h4" fontWeight={700}>
          {noteData?.title}
        </Typography>
        <Typography
          variant="caption"
          color="grey"
          display="flex"
          alignItems="center"
          sx={{ mt: 0.5 }}
        >
          <FlagImg
            language={noteData?.language}
            sx={{ width: 25, height: 25, mr: 0.5 }}
          />
          <Avatar sx={{ width: 25, height: 25, mr: 0.5 }} />
          {noteData?.author}
        </Typography>
      </Box>
      <Divider sx={{ my: 1 }} />

      {/* note contents */}
      <NoteContentsMemo {...{ noteData }} />
      <Divider sx={{ my: 1 }} />

      {/* note comments */}
      <NoteCommentsMemo noteComments={noteComments} />
    </Box>
  );
}

const PageLayoutNoteMemo = memo(PageLayoutNote);
export default PageLayoutNoteMemo;
