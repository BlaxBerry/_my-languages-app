import { useCallback, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import { auth } from "@/libs/firebase";
import { addSpecificDoc, updateSpecificDoc } from "@/libs/firebase/firestore";
import { LANGUAGES, MARKDOWN_EDITOR_DEFAULT_VALUE } from "@/utils/constants";
import type { NoteDoc, UserNoteDoc } from "@/types/db/notes";
import type { Language } from "@/types/client";
import { FlagImg } from "@/components";

export default function NoteCreateIndex() {
  const navigate = useNavigate();
  // 当前登陆账户的信息
  const currentUserUID = auth?.currentUser?.uid;
  const currentUserName = auth?.currentUser?.displayName;

  const [noteTitle, setNoteTitle] = useState<string>("");
  const [markdownValue, setMarkdownValue] = useState<string>(
    MARKDOWN_EDITOR_DEFAULT_VALUE,
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [noteLanguage, setNoteLanguage] = useState<Language>("en");

  const addNote = useCallback(async () => {
    const nowDateISO6801 = dayjs().toISOString();
    const newNoteID = nowDateISO6801;
    try {
      if (currentUserUID && currentUserName) {
        // 向users集合新增的文档 ( users ← )
        const newNoteData: NoteDoc = {
          noteID: newNoteID,
          title: noteTitle || "New Note",
          language: noteLanguage,
          authorUID: currentUserUID,
          author: currentUserName,
          createAt: nowDateISO6801,
          updateAt: nowDateISO6801,
        };
        // 向用户notes集合新增的文档 ( user/[UID]/notes/[noteID] ← )
        const userNewNoteData: UserNoteDoc = {
          ...newNoteData,
          md: markdownValue,
        };
        // 1. add → firestore: users/[UID]/notes/[noteID]
        await updateSpecificDoc(
          `users/${currentUserUID}/notes/${newNoteID}`,
          userNewNoteData,
        );
        // 2. add → firestore: notes/
        await addSpecificDoc(`notes`, newNoteData);
        // 3. client navigate
        navigate(`/notes/${newNoteID}?authorUID=${currentUserUID}`);
      }
    } catch (err) {
      /* eslint-disable-next-line no-console */
      console.log("error", err);
    }
  }, [
    navigate,
    currentUserUID,
    currentUserName,
    noteTitle,
    noteLanguage,
    markdownValue,
  ]);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700}>
        新建文章
      </Typography>

      <Box display="flex" alignItems="center">
        <>
          <Box
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ cursor: "pointer" }}
          >
            <FlagImg language={noteLanguage} sx={{ mr: 1 }} />
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {LANGUAGES.map((lang) => (
              <MenuItem
                key={lang}
                onClick={() => {
                  setNoteLanguage(lang);
                  setAnchorEl(null);
                }}
              >
                <FlagImg
                  language={lang}
                  sx={{ width: 25, height: 25, mr: 1 }}
                />
                {lang}
              </MenuItem>
            ))}
          </Menu>
        </>
        <TextField
          size="small"
          fullWidth
          sx={{ my: 1 }}
          placeholder="文章标题"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
      </Box>

      <MDEditor
        data-color-mode="light"
        value={markdownValue}
        onChange={(e) => setMarkdownValue(e ?? "")}
        preview="live"
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />

      <Box component="nav" display="flex" justifyContent="flex-end">
        <Button
          variant="outlined"
          size="small"
          color="success"
          startIcon={<SaveIcon />}
          onClick={addNote}
        >
          保存
        </Button>
      </Box>
    </Box>
  );
}
