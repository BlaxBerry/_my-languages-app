import type { Language } from "../client";

/** 话题 */
export type TopicsDoc = TopicDoc[];
export interface TopicDoc {
  /* 话题文档ID */
  id: string;
  /* 话题总标题 */
  title: string;
  /* 创建者名称 (目前仅限超级管理员) */
  author: string;
  /* 话题相关的语言 */
  language: Language;
  /* 话题内容 */
  contents: TopicContentsDoc;
  /* 话题评论 */
  comments: TopicCommentsDoc;
}

/** 话题内容 */
export type TopicContentsDoc = TopicContentDoc[];
export interface TopicContentDoc {
  /* 话题内容子标题 */
  title: string;
  /* 话题内容 */
  sections: string[];
}

/** 话题评论 */
export type TopicCommentsDoc = TopicCommentDoc[];
export interface TopicCommentDoc {
  /* 评论者名称 */
  author: string;
  /* 评论者ID */
  // authorId: string
  /* 评论者头像地址 */
  // authorAvatar: string
  /* 评论内容 */
  message: string;
  /* 评论日期IOS8601 (dayjs().toISOString()) */
  createAt: string;
}
