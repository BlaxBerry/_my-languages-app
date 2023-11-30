import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import type { TopicsDoc } from "@/types/db/topics";
import { getAllDocs } from "@/libs/firebase/firestore";
import { PageLayoutTopics } from "@/components/layouts";

type LoaderData = {
  res: Promise<TopicsDoc>;
};

/* eslint-disable-next-line react-refresh/only-export-components */
export async function topicsLoader() {
  const result = getAllDocs<TopicsDoc>("topics");

  return defer({
    res: result,
  });
}

export default function TopicsPage() {
  const { res } = useLoaderData() as LoaderData;

  return (
    <Suspense fallback={<>Loading...</>}>
      <Await resolve={res} errorElement={<>Error loading package location!</>}>
        {(res: TopicsDoc) => <PageLayoutTopics topics={res} />}
      </Await>
    </Suspense>
  );
}
