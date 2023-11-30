import { collection, getDocs, query } from "firebase/firestore";
import { db } from ".";

/* eslint-disable-next-line  @typescript-eslint/ban-ts-comment */
/* @ts-ignore */
const getCollection = (rest: string[]) => collection(db, ...rest);

/**
 *
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

  return querySnapshot.docs.map((doc) => doc.data() as DocumentType);
};
