import { Suspense } from "react";
import {
  Await,
  defer,
  useLoaderData,
  type LoaderFunction,
} from "react-router-dom";
import type { NoteCommentDoc, NoteContentDoc, NoteDoc } from "@/types/db/notes";
import { getAllDocs } from "@/libs/firebase/firestore";
import PageLayoutNote from "@/components/layouts/pages/note";
import { ErrorLayout, LoadingLayout } from "@/components/layouts";

type LoaderData = {
  res: Promise<[Array<NoteDoc>, Array<NoteContentDoc>, Array<NoteCommentDoc>]>;
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const topicLoader: LoaderFunction = async ({ params }) => {
  const topicNoteID = params.noteID;
  const res = Promise.all([
    getAllDocs<NoteDoc>("topics").then((res) =>
      res.find((note) => note.id === topicNoteID),
    ),
    getAllDocs<Array<NoteContentDoc>>(`topics/${topicNoteID}/contents`),
    getAllDocs<Array<NoteCommentDoc>>(`topics/${topicNoteID}/comments`),
  ]);
  return defer({
    res,
  });
};

export default function TopicNotePage() {
  const { res } = useLoaderData() as LoaderData;

  return (
    <Suspense fallback={<LoadingLayout message="Fetching..." />}>
      <Await
        resolve={res}
        errorElement={
          <ErrorLayout message={`topic/[id] route data loading error`} />
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
