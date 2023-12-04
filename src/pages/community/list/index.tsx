/* eslint-disable react-refresh/only-export-components */
import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getAllDocs } from "@/libs/firebase/firestore";
import type { NoteDoc } from "@/types/db/notes";
import { ErrorLayout, LoadingLayout } from "@/layouts/common";
import { PageLayoutCommunity } from "@/layouts/pages";

type LoaderData = {
  res: Promise<Array<NoteDoc>>;
};

export async function communityListLoader() {
  const res = getAllDocs<NoteDoc>(`notes`);
  return defer({
    res,
  });
}

export default function CommunityListIndex() {
  const { res } = useLoaderData() as LoaderData;

  return (
    <Suspense fallback={<LoadingLayout message="Fetching..." />}>
      <Await
        resolve={res}
        errorElement={
          <ErrorLayout message={`community/list route data loading error`} />
        }
      >
        {(res: Array<NoteDoc>) => <PageLayoutCommunity notes={res} />}
      </Await>
    </Suspense>
  );
}
