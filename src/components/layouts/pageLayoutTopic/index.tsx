import { memo } from "react";
import type {
  TopicDoc,
  TopicCommentsDoc,
  TopicContentsDoc,
} from "@/types/db/topics";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TopicContentsMemo from "./contents";
import TopicCommentsMemo from "./comments";

function PageLayoutTopic(props: {
  topicData?: TopicDoc | undefined;
  topicContents: TopicContentsDoc;
  topicComments: TopicCommentsDoc;
}) {
  const { topicData, topicContents, topicComments } = props;

  return (
    <Box sx={{ height: "100%" }}>
      {/* topic data */}
      <Typography variant="h4" fontWeight={700}>
        {topicData?.title}
      </Typography>
      <Typography variant="caption">by {topicData?.author}</Typography>
      <Divider sx={{ my: 1 }} />

      {/* topic content */}
      <TopicContentsMemo topicData={topicData} topicContents={topicContents} />
      <Divider sx={{ my: 1 }} />

      {/* topic comments  */}
      <TopicCommentsMemo topicComments={topicComments} />
    </Box>
  );
}

const PageLayoutTopicMemo = memo(PageLayoutTopic);
export default PageLayoutTopicMemo;
