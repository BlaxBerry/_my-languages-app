import { memo } from "react";
import type { NoteDoc, NoteCommentDoc, NoteContentDoc } from "@/types/db/notes";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import NoteContentsMemo from "./contents";
import NoteCommentsMemo from "./comments";
import { EmptyLayout } from "../..";
import { FlagImg } from "@/components/common";

function PageLayoutNote(props: {
  noteData?: NoteDoc | undefined;
  noteContents: Array<NoteContentDoc>;
  noteComments: Array<NoteCommentDoc>;
}) {
  const { noteData, noteContents, noteComments } = props;

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
          component="div"
          display="flex"
          alignItems="center"
          variant="caption"
          color="grey"
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
      <NoteContentsMemo {...{ noteData, noteContents }} />
      <Divider sx={{ my: 1 }} />

      {/* note comments */}
      <NoteCommentsMemo noteComments={noteComments} />
    </Box>
  );
}

const PageLayoutNoteMemo = memo(PageLayoutNote);
export default PageLayoutNoteMemo;
