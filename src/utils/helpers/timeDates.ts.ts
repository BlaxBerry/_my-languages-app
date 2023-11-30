import dayjs from "dayjs";

/** 获取目标日期位于当前日期的几天前 */
export const getDiffDaysAgo = (target: string) => {
  const now = dayjs();
  const d = dayjs(target);
  return now.diff(d, "day");
};
