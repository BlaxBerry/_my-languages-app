import { memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { NoteDoc, UserNoteDoc } from "@/types/db/notes";
import NotesCards from "../notes/notesCards";

function PageLayoutCommunity(props: { notes: Array<NoteDoc | UserNoteDoc> }) {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} textAlign="center">
        Community List
      </Typography>

      <Typography variant="h5" fontWeight={700}>
        Hot Notes
      </Typography>

      <NotesCards notes={props.notes} />
    </Box>
  );
}

const PageLayoutCommunityMemo = memo(PageLayoutCommunity);
export default PageLayoutCommunityMemo;
