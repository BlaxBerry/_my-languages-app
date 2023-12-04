import { memo, useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SortIcon from "@mui/icons-material/Sort";
import { MOCK_AVATAR_URL } from "@/__mocks__";
import { getDiffDaysAgo } from "@/utils/helpers";
import type { UserNoteCommentDoc } from "@/types/db/notes";

type SortOrderBy = "asc" | "desc";
const SORT_ORDER_BY: Record<Uppercase<SortOrderBy>, SortOrderBy> = {
  ASC: "asc",
  DESC: "desc",
} as const;

function NoteComments(props: { noteComments: Array<UserNoteCommentDoc> }) {
  /** 获取评论创建日期与当前日期的差 (?days ago) */
  const getDiffCreateAtFromNow = useCallback((dateString: string) => {
    const diffDaysAgo = getDiffDaysAgo(dateString);
    return diffDaysAgo === 0 ? "Today" : `${diffDaysAgo}days ago`;
  }, []);

  const [sortOrderBy, setSortOrderBy] = useState<SortOrderBy>(
    SORT_ORDER_BY.ASC,
  );
  const toggleSortOrderBy = useCallback(() => {
    setSortOrderBy((s) => {
      return s === SORT_ORDER_BY.ASC ? SORT_ORDER_BY.DESC : SORT_ORDER_BY.ASC;
    });
  }, [setSortOrderBy]);

  /**
   * 排序评论列表根据评论创建日期升序/降序
   * - asc 升序 (latest first)
   * - desc 降序 (oldest first)
   */
  const topicCommentsSortedByCreateAt = useMemo(() => {
    return props.noteComments?.sort((a, b) => {
      const aUnix = dayjs(b.createAt).unix();
      const bUnix = dayjs(a.createAt).unix();
      if (sortOrderBy === SORT_ORDER_BY.ASC) return aUnix - bUnix;
      else return bUnix - aUnix;
    });
  }, [props.noteComments, sortOrderBy]);

  return (
    <Box>
      <Box display="flex" alignItems="center" sx={{ py: 1 }}>
        <Typography>
          {!props.noteComments.length
            ? `暂无评论`
            : `All ${props.noteComments.length} Comments`}
        </Typography>

        {props.noteComments?.length > 0 && (
          <Box display="flex" alignItems="center">
            <SortIcon sx={{ ml: 4 }} />
            <Button onClick={toggleSortOrderBy}>
              {`( ${sortOrderBy === SORT_ORDER_BY.ASC ? "latest" : "oldest"} )`}
            </Button>
          </Box>
        )}
      </Box>

      {topicCommentsSortedByCreateAt?.map((comment, index) => (
        <Box key={index} display="flex" sx={{ py: 2 }}>
          <Avatar src={MOCK_AVATAR_URL} sx={{ width: 45, height: 45 }} />

          <Box flex={1} sx={{ ml: 1 }}>
            <Box display="flex" alignItems="center">
              {/* comment author name */}
              <Typography variant="caption" fontWeight={700}>
                {comment.author}
              </Typography>
              {/* comment created at (diff) */}
              <Typography variant="caption" color="grey" sx={{ ml: 2 }}>
                {getDiffCreateAtFromNow(comment.createAt)}
              </Typography>
            </Box>
            {/* comment message */}
            <Typography variant="body2">{comment.message}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

const NoteCommentsMemo = memo(NoteComments);
export default NoteCommentsMemo;
