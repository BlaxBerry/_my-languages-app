/** @see https://firebase.google.com/docs/firestore/manage-data/add-data?hl=zh-cn#increment_a_numeric_value */
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from ".";

/* eslint-disable-next-line  @typescript-eslint/ban-ts-comment */
/* @ts-ignore */
const getCollection = (rest: string[]) => collection(db, ...rest);

/**
 * 获取指定集合路径下的所有文档
 * @example
 * async function func() {
 *   const res = await getAllDocs("collection")
 *   const res = await getAllDocs("collection/document")
 *   const res = await getAllDocs("collection/document/subCollection")
 * }
 */
export const getAllDocs = async <DocumentType>(
  path: string,
): Promise<DocumentType[]> => {
  const pathSegments = path.split("/");
  const q = query(getCollection(pathSegments));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => doc.data() as DocumentType,
  ) as DocumentType[];
};

/**
 * 获取指定集合路径下的指定文档
 * async function func() {
 *   const res = await getSpecificDoc("users/[UID]/notes/[noteID]")
 *   const res = await getSpecificDoc("users/[UID]/notes/[noteID]/contents/[contentID]")
 * }
 */
export const getSpecificDoc = async <T>(
  path: string,
): Promise<T | undefined> => {
  const pathSegments = path.split("/");
  /* eslint-disable-next-line  @typescript-eslint/ban-ts-comment */
  /* @ts-ignore */
  const docRef = doc(db, ...pathSegments);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as T;
  } else {
    // No such document!
    return undefined;
  }
};

/**
 * 更新已有的指定文档 & 创建指定`noteID`的文档
 * ( 若文档已存在则为更新，若文档不存在则为创建 )
 * @example
 * async function func() {
 *   const res = await updateDoc("users/[UID]/notes/[noteID]")
 *   const res = await updateDoc("users/[UID]/notes/[noteID]/contents/[contentID]")
 * }
 */
export const updateSpecificDoc = (
  path: string,
  data: Record<string, unknown>,
) => {
  const pathSegments = path.split("/");
  /* eslint-disable-next-line  @typescript-eslint/ban-ts-comment */
  /* @ts-ignore */
  return setDoc(doc(db, ...pathSegments), data);
};

/**
 * 添加自动生成`noteID`的文档
 */
export const addSpecificDoc = (path: string, data: Record<string, unknown>) => {
  const pathSegments = path.split("/");
  /* eslint-disable-next-line  @typescript-eslint/ban-ts-comment */
  /* @ts-ignore */
  return addDoc(collection(db, ...pathSegments), data);
};
