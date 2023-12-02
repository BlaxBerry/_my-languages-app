import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getAllDocs } from "@/libs/firebase/firestore";
import {
  ErrorLayout,
  LoadingLayout,
  PageLayoutTopics,
} from "@/components/layouts";
import type { NoteDoc } from "@/types/db/notes";

type LoaderData = {
  res: Promise<Array<NoteDoc>>;
};

/* eslint-disable-next-line react-refresh/only-export-components */
export async function topicsLoader() {
  const result = getAllDocs<Array<NoteDoc>>("topics");
  return defer({
    res: result,
  });
}

export default function TopicsPage() {
  const { res } = useLoaderData() as LoaderData;

  return (
    <Suspense fallback={<LoadingLayout message="Fetching..." />}>
      <Await
        resolve={res}
        errorElement={
          <ErrorLayout message={`topics route data loading error`} />
        }
      >
        {(res: Array<NoteDoc>) => <PageLayoutTopics notes={res} />}
      </Await>
    </Suspense>
  );
}
