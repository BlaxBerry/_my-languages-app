/* eslint-disable react-refresh/only-export-components */
import { Suspense } from "react";
import {
  type LoaderFunction,
  defer,
  useLoaderData,
  Await,
} from "react-router-dom";
import type { UserNoteCommentDoc, UserNoteDoc } from "@/types/db/notes";
import PageLayoutNote from "@/layouts/pages/note";
import { getAllDocs, getSpecificDoc } from "@/libs/firebase/firestore";
import { ErrorLayout, LoadingLayout } from "@/layouts/common";

type LoaderData = {
  res: Promise<[UserNoteDoc, Array<UserNoteCommentDoc>]>;
};

// /notes/[noteID]?authorUID=[account_uid]
export const noteLoader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const authorUID = url.searchParams.get("authorUID");
  const noteID = params.noteID;

  const res = Promise.all([
    getSpecificDoc<UserNoteDoc>(`users/${authorUID}/notes/${noteID}`),
    getAllDocs<UserNoteCommentDoc>(
      `users/${authorUID}/notes/${noteID}/comments`,
    ),
  ]);
  return defer({
    res,
  });
};

export default function NoteIndex() {
  const { res } = useLoaderData() as LoaderData;

  return (
    <Suspense fallback={<LoadingLayout message="Fetching..." />}>
      <Await
        resolve={res}
        errorElement={
          <ErrorLayout message={`notes/[id] route data loading error`} />
        }
      >
        {(res: [UserNoteDoc, Array<UserNoteCommentDoc>]) => (
          <PageLayoutNote noteData={res[0]} noteComments={res[1]} />
        )}
      </Await>
    </Suspense>
  );
}
