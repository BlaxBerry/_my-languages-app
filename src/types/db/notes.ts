import type { Language } from "../client";

/** 文章信息 */
export type NoteDoc = {
  /** 文章ID */
  // 创建日期IOS8601 (dayjs().toISOString())
  id: string;
  /** 文章总标题 */
  title: string;
  /** 文章创建者名称 */
  // TopicNote作者仅限超级管理员
  author: string;
  /** 文章相关的语言 */
  language: Language;
  /** 文章创建日期 */
  // IOS8601 (dayjs().toISOString())
  createAt?: string;
  /** 文章更新日期 */
  // IOS8601 (dayjs().toISOString())
  updateAt?: string;
  /** 文章内容列表 */
  contents: NoteContentDoc[];
  /** 文章评论列表 */
  comments: NoteCommentDoc[];
};

/** 文章内容 */
export type NoteContentDoc = {
  /** 文章内容子标题 */
  title: string;
  /** 文章内容段落列表 */
  sections: NoteContentSection[];
};

/** 文章内容段落 */
export type NoteContentSection = {
  /** 段落文本 */
  message: string;
  /** 段落翻译 (非必需) */
  translation?: string;
  /** 段落文本补充 (非必需) */
  supplement?: string;
};

/** 文章评论 */
export type NoteCommentDoc = {
  /** 文章评论者名称 */
  author: string;
  /** 文章评论者ID */
  // authorId: string
  /** 文章评论者头像地址 */
  // authorAvatar: string
  /** 文章评论内容 */
  message: string;
  /** 文章评论日期 */
  // IOS8601 (dayjs().toISOString())
  createAt: string;
};
