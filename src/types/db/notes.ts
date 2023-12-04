import type { Language } from "../client";

/**
 * 文章文档
 * (`firestore: notes/[auto_id]`)
 */
export interface NoteDoc extends Record<string, unknown> {
  /** 文章noteID */
  // 创建日期IOS8601 (dayjs().toISOString())
  noteID: string;
  /** 文章标题 */
  title: string;
  /** 文章相关的语言 */
  language: Language;
  /** 文章创建者名称 */
  author: string;
  /** 文章创建者账户UID */
  authorUID: string;
  /** 文章创建日期 */
  // IOS8601 (dayjs().toISOString())
  createAt: string;
  /** 文章更新日期 */
  // IOS8601 (dayjs().toISOString())
  updateAt: string;
}

/**
 * 用户文章文档
 * `firestore: users/[UID]/notes/[createAtIOS8601]`
 */
export interface UserNoteDoc extends NoteDoc {
  /** 文章内容 */
  // markdown
  md: string;
}

/**
 * 用户文章评论
 * `firestore: users/[UID]/notes/[createAtIOS8601]/comments/[auto_id]`
 */
export type UserNoteCommentDoc = {
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
