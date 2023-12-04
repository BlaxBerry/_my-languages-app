/* eslint-disable react-refresh/only-export-components */
import { Suspense } from "react";
import {
  Await,
  defer,
  redirect,
  useLoaderData,
  type LoaderFunction,
} from "react-router-dom";
import type { NoteDoc, UserNoteCommentDoc } from "@/types/db/notes";
import { ErrorLayout, LoadingLayout } from "@/layouts/common";
import { PageLayoutNotes } from "@/layouts/pages";
import { getAllDocs } from "@/libs/firebase/firestore";
import { COOKIE_NAMES, decodeJWT, getCookie } from "@/utils/tools";

type LoaderData = {
  res: Promise<Array<NoteDoc>>;
};

export const notesLoader: LoaderFunction = async ({ request }) => {
  const { pathname } = new URL(request.url);
  const accessToken = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
  if (!accessToken) {
    return redirect(`/login?redirect_from=${pathname}`);
  }

  const jwtDecoded = decodeJWT(accessToken);
  const uid = jwtDecoded.payload.user_id;
  const res = getAllDocs<UserNoteCommentDoc>(`users/${uid}/notes`);
  return defer({
    res,
  });
};

export default function NotesPage() {
  const { res } = useLoaderData() as LoaderData;

  return (
    <Suspense fallback={<LoadingLayout message="Fetching..." />}>
      <Await
        resolve={res}
        errorElement={
          <ErrorLayout message={`notes route data loading error`} />
        }
      >
        {(res: Array<NoteDoc>) => <PageLayoutNotes notes={res} />}
      </Await>
    </Suspense>
  );
}
