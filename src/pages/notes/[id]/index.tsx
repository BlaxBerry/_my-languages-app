import { Suspense } from "react";
import {
  type LoaderFunction,
  defer,
  useLoaderData,
  Await,
} from "react-router-dom";
import type { NoteCommentDoc, NoteContentDoc, NoteDoc } from "@/types/db/notes";
import PageLayoutNote from "@/components/layouts/pages/note";
import { getAllDocs } from "@/libs/firebase/firestore";
import { ErrorLayout, LoadingLayout } from "@/components/layouts";

type LoaderData = {
  res: Promise<[NoteDoc, Array<NoteContentDoc>, Array<NoteCommentDoc>]>;
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const noteLoader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const authorUID = url.searchParams.get("authorUID");
  const noteID = params.noteID;

  const res = Promise.all([
    getAllDocs<NoteDoc>(`users/${authorUID}/notes`).then((res) =>
      res.find((note) => note.id === noteID),
    ),
    getAllDocs<Array<NoteContentDoc>>(
      `users/${authorUID}/notes/${noteID}/contents`,
    ),
    getAllDocs<Array<NoteCommentDoc>>(
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
        {(res: [NoteDoc, Array<NoteContentDoc>, Array<NoteCommentDoc>]) => (
          <PageLayoutNote
            noteData={res[0]}
            noteContents={res[1]}
            noteComments={res[2]}
          />
        )}
      </Await>
    </Suspense>
  );
}
