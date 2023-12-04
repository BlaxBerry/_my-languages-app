import { memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NotesCards from "./notesCards";
import type { NoteDoc, UserNoteDoc } from "@/types/db/notes";
import { EmptyLayout } from "@/layouts/common";

function PageLayoutNotes(props: { notes: Array<NoteDoc | UserNoteDoc> }) {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} textAlign="center">
        Notes
      </Typography>

      {!props?.notes?.length && (
        <EmptyLayout
          content={"暂无您的文章"}
          redirectButtonMessage="新建文章"
          redirectPath="/notes/create"
          redirectReplace={false}
        />
      )}

      {props?.notes?.length > 0 && <NotesCards notes={props.notes} />}
    </Box>
  );
}

const PageLayoutNotesMemo = memo(PageLayoutNotes);
export default PageLayoutNotesMemo;
