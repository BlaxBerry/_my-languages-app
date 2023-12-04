import { memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NotesCards from "./notesCards";
import type { NoteDoc, UserNoteDoc } from "@/types/db/notes";

function PageLayoutNotes(props: { notes: Array<NoteDoc | UserNoteDoc> }) {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} textAlign="center">
        Notes
      </Typography>

      <NotesCards notes={props.notes} />
    </Box>
  );
}

const PageLayoutNotesMemo = memo(PageLayoutNotes);
export default PageLayoutNotesMemo;
