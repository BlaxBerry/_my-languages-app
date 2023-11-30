import { memo, useState } from "react";
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
import type { TopicDoc, TopicContentsDoc } from "@/types/db/topics";
import styles from "@/styles/_variables.module.scss";

const HEADER_HEIGHT = styles.root_layout_header_height;
const ASIDE_WITH = styles.root_layout_aside_with;
const MAIN_HEIGHT = styles.root_layout_main_height;

function TopicContents(props: {
  topicData?: TopicDoc | undefined;
  topicContents: TopicContentsDoc;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsIndex = searchParams.get("index");
  const selectedIndex = searchParamsIndex || 1; // topic's contents start from 1
  const selectedContent = props.topicContents[(selectedIndex as number) - 1];

  const [showMenus, setShowMenus] = useState<boolean>(false);

  if (!props.topicContents?.length) {
    return <Box sx={{ minHeight: MAIN_HEIGHT }}>空文档 (ー_ー)</Box>;
  }

  return (
    <Box sx={{ minHeight: MAIN_HEIGHT }}>
      {/* mobile screen drawer & pc screen menu collapse */}
      <Box display="flex" alignItems="center">
        <IconButton sx={{ mr: 1 }} onClick={() => setShowMenus((s) => !s)}>
          <MenuOpenIcon />
        </IconButton>
        <Typography>Menus</Typography>
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
        <Typography
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontWeight={700}
          noWrap
          sx={{ height: HEADER_HEIGHT }}
        >
          {props.topicData?.title}
        </Typography>
        <Divider />
        <TopicContentsMenuItemsMemo
          topicContents={props.topicContents}
          selectedIndex={selectedIndex}
          select={(index) => setSearchParams({ index: String(index + 1) })}
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
            <TopicContentsMenuItemsMemo
              topicContents={props.topicContents}
              selectedIndex={selectedIndex}
              select={(index) => setSearchParams({ index: String(index + 1) })}
            />
          </Box>
        </Collapse>

        {/* main content */}
        <Box flex={1} sx={{ px: 2 }}>
          <Typography variant="h5" fontWeight={700} sx={{ py: 1 }}>
            {selectedContent?.title}
          </Typography>
          {selectedContent?.sections?.map((section, i) => (
            <Typography key={i} variant="body1" sx={{ py: 1 }}>
              {section}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// menu items
function TopicContentsMenuItems(props: {
  topicContents: TopicContentsDoc;
  selectedIndex: string | number;
  select: (index: number) => void;
}) {
  return (
    <List sx={{ p: 1, width: ASIDE_WITH }}>
      {props.topicContents?.map((content, index) => (
        <ListItem key={content.title} disablePadding>
          <ListItemButton
            selected={props.selectedIndex == index + 1}
            onClick={() => props.select(index)}
          >
            <Typography variant="body2" noWrap sx={{ py: 1 }}>
              {content.title}
            </Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

const TopicContentsMenuItemsMemo = memo(TopicContentsMenuItems);
const TopicContentsMemo = memo(TopicContents);
export default TopicContentsMemo;
