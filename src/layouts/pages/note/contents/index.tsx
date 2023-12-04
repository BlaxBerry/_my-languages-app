import { memo, useCallback, useEffect, useMemo, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditNoteIcon from "@mui/icons-material/EditNote";
import styles from "@/styles/_variables.module.scss";
import { MARKDOWN_EDITOR_DEFAULT_VALUE } from "@/utils/constants";
import { auth } from "@/libs/firebase";
import { addSpecificDoc, updateSpecificDoc } from "@/libs/firebase/firestore";
import type { NoteDoc, UserNoteDoc } from "@/types/db/notes";
import { EmptyLayout } from "@/layouts/common";

const MAIN_HEIGHT = styles.root_layout_main_height;

function NoteContents({ noteData }: { noteData?: UserNoteDoc | undefined }) {
  // 当前登陆账户的信息
  const currentUserUID = auth?.currentUser?.uid;
  const currentUserName = auth?.currentUser?.displayName;
  // 该文档携带的信息
  const currentNoteID = noteData?.noteID;
  const currentNoteAuthorUID = new URLSearchParams(window.location.search).get(
    "authorUID",
  );
  // 当前用户是否有权限修改该文档
  const hasEditPermission = useMemo(
    () =>
      // 当前用户是否已登陆
      auth?.currentUser &&
      // 当前用户UID是否等同于该文档作者UID
      currentUserUID === currentNoteAuthorUID,
    [currentUserUID, currentNoteAuthorUID],
  );

  const isEmptyContent = useMemo<boolean>(
    () => noteData?.md?.trim() === "",
    [noteData?.md],
  );
  const [markdownValue, setMarkdownValue] = useState<string>(
    MARKDOWN_EDITOR_DEFAULT_VALUE,
  );
  useEffect(() => {
    if (noteData?.md) {
      setMarkdownValue(noteData?.md);
    }
  }, [noteData]);

  const [couldEdit, setCouldEdit] = useState<"ADD" | "UPDATE" | null>(null);
  const saveEditorContent = useCallback(async () => {
    try {
      const nowDateISO6801 = dayjs().toISOString();
      if (currentUserUID && currentUserName && currentNoteID && markdownValue) {
        // 更新当前文档
        if (couldEdit === "UPDATE") {
          const data: UserNoteDoc = {
            ...noteData,
            updateAt: nowDateISO6801,
            md: markdownValue,
          };
          await updateSpecificDoc(
            `users/${currentUserUID}/notes/${currentNoteID}`,
            data,
          );
        }
        // 新增新文档
        if (couldEdit === "ADD") {
          const newNoteID = nowDateISO6801;
          // 向users集合新增的文档 ( users ← )
          const newNoteData: NoteDoc = {
            noteID: newNoteID,
            title: "New Note",
            language: "en",
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
        }
      }
      setCouldEdit(null);
      window.location.reload();
    } catch (err) {
      /* eslint-disable-next-line no-console */
      console.log("error", err);
    }
  }, [
    currentNoteID,
    currentUserUID,
    currentUserName,
    noteData,
    markdownValue,
    couldEdit,
    setCouldEdit,
  ]);

  return (
    <Box
      sx={{ minHeight: MAIN_HEIGHT, mt: hasEditPermission ? -8 : 0 }}
      display="flex"
      flexDirection="column"
    >
      {/* editor switcher */}
      {hasEditPermission && (
        <Box
          component="nav"
          display="flex"
          justifyContent="flex-end"
          sx={{ py: 2 }}
        >
          {couldEdit && (
            <>
              <IconButton size="small" onClick={() => saveEditorContent()}>
                <SaveIcon />
              </IconButton>
              <IconButton size="small" onClick={() => setCouldEdit(null)}>
                <CancelIcon />
              </IconButton>
            </>
          )}
          {!couldEdit && (
            <IconButton size="small" onClick={() => setCouldEdit("UPDATE")}>
              <EditNoteIcon />
            </IconButton>
          )}
        </Box>
      )}

      {/* empty content */}
      {isEmptyContent && !couldEdit && (
        <EmptyLayout content={`空文档 (ー_ー)|||`} />
      )}

      {/* markdown content */}
      <Box flex={1} display="flex" data-color-mode="light">
        {/* 仅查看 */}
        {(!hasEditPermission || !couldEdit) && (
          <MDEditor.Markdown
            source={noteData?.md}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        )}
        {/* 查看&编辑 */}
        {hasEditPermission && couldEdit && (
          <MDEditor
            value={markdownValue}
            onChange={(e) => setMarkdownValue(e ?? "")}
            preview="live"
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
            style={{ flex: 1, height: "auto" }}
          />
        )}
      </Box>
    </Box>
  );
}

const NoteContentsMemo = memo(NoteContents);
export default NoteContentsMemo;
