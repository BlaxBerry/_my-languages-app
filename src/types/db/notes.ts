import type { Language } from "../client";

/** 文章 */
export type NotesDoc = NoteDoc[];
export interface NoteDoc {
  /* 文章标题 */
  title: string;
  /* 文章相关的语言 */
  language: Language;
}
