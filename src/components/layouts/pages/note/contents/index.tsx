import { memo, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import type { NoteContentDoc, NoteDoc } from "@/types/db/notes";
import styles from "@/styles/_variables.module.scss";
import { EmptyLayout } from "@/components/layouts";

const HEADER_HEIGHT = styles.root_layout_header_height;
const ASIDE_WITH = styles.root_layout_aside_with;
const MAIN_HEIGHT = styles.root_layout_main_height;

function NoteContents(props: {
  noteData?: NoteDoc | undefined;
  noteContents: Array<NoteContentDoc>;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsIndex = searchParams.get("index");
  const selectedIndex = searchParamsIndex || 1; // contents doc id start from 1
  const selectedContent = props.noteContents[(selectedIndex as number) - 1];

  const [showMenus, setShowMenus] = useState<boolean>(false);

  // 点击切换文档 content's id
  const onSelectMenuItem = useCallback(
    (selectedContentDocID: number) => {
      const authorUID = searchParams.get("authorUID") ?? "null";
      const index = String(selectedContentDocID);
      setSearchParams({ authorUID, index });
    },
    [searchParams, setSearchParams],
  );

  if (!props.noteContents?.length) {
    return <EmptyLayout content={`空文档 (ー_ー)|||`} />;
  }

  return (
    <Box sx={{ minHeight: MAIN_HEIGHT }}>
      {/* mobile screen drawer & pc screen menu collapse */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => setShowMenus((s) => !s)}>
          <MenuOpenIcon />
        </IconButton>
        <Typography
          color="grey"
          sx={{
            opacity: showMenus ? 0 : 1,
            mr: 1,
          }}
        >
          Menus
        </Typography>
      </Box>

      {/* mobile screen drawer menu */}
      <Drawer
        anchor="left"
        open={showMenus}
        onClose={() => setShowMenus(false)}
        sx={{
          display: {
            xs: "flex",
            sm: "none",
          },
        }}
      >
        <NoteContentsMenuMemo
          noteTitle={props.noteData?.title}
          noteContents={props.noteContents}
          selectedIndex={selectedIndex}
          select={(index) => onSelectMenuItem(index + 1)}
        />
      </Drawer>

      <Box display="flex">
        {/* pc screen left menu */}
        <Collapse orientation="horizontal" in={!showMenus}>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            <NoteContentsMenuMemo
              noteContents={props.noteContents}
              selectedIndex={selectedIndex}
              select={(index) => onSelectMenuItem(index + 1)}
            />
          </Box>
        </Collapse>

        {/* main content */}
        <Box
          flex={1}
          sx={{
            px: {
              xs: 1,
              sm: 6,
            },
            mt: {
              xs: 0,
              sm: -5,
            },
          }}
        >
          {/* content's title */}
          <Typography variant="h5" fontWeight={700} sx={{ pt: 1, pb: 2 }}>
            {selectedContent?.title}
          </Typography>
          {/* content's sections */}
          {selectedContent?.sections?.map((section, i) => (
            <Box
              key={i}
              component="section"
              sx={{
                py: {
                  xs: 1,
                  sm: 2,
                },
              }}
            >
              <Typography variant="body1" component="p">
                {section.message}
              </Typography>
              <Typography variant="caption" component="p" color="grey">
                {section.translation}
              </Typography>
              <Typography variant="caption" component="p" color="grey">
                {section.supplement}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// menu items
function NoteContentsMenu(props: {
  noteTitle?: string;
  noteContents: Array<NoteContentDoc>;
  selectedIndex: string | number;
  select: (index: number) => void;
}) {
  return (
    <List
      sx={{
        width: ASIDE_WITH,
        py: {
          xs: 0,
          sm: 1,
        },
        px: 1,
      }}
    >
      {props.noteTitle && (
        <>
          <ListItem disablePadding sx={{ height: HEADER_HEIGHT, px: 2 }}>
            <Typography fontWeight={700} noWrap>
              {props.noteTitle}
            </Typography>
          </ListItem>
          <Divider />
        </>
      )}

      {props.noteContents?.map((content, index) => (
        <ListItem key={content.title} disablePadding sx={{ my: 0.5 }}>
          <ListItemButton
            selected={props.selectedIndex == index + 1}
            onClick={() => props.select(index)}
          >
            <Typography variant="body2" noWrap sx={{ py: 0.5 }}>
              {content.title}
            </Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

const NoteContentsMenuMemo = memo(NoteContentsMenu);
const NoteContentsMemo = memo(NoteContents);
export default NoteContentsMemo;
