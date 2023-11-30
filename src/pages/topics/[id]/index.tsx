import { Suspense } from "react";
import {
  Await,
  defer,
  useLoaderData,
  type LoaderFunction,
} from "react-router-dom";
import type {
  TopicCommentsDoc,
  TopicContentsDoc,
  TopicsDoc,
} from "@/types/db/topics";
import { getAllDocs } from "@/libs/firebase/firestore";
import { PageLayoutTopic } from "@/components/layouts";

type LoaderData = {
  res: Promise<[TopicsDoc, TopicContentsDoc, TopicCommentsDoc]>;
  topicDocId: string;
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const topicLoader: LoaderFunction = async ({ params }) => {
  const topicDocId = params.id;
  const res = Promise.all([
    getAllDocs<TopicsDoc>("topics"),
    getAllDocs<TopicContentsDoc>(`topics/${topicDocId}/contents`),
    getAllDocs<TopicCommentsDoc>(`topics/${topicDocId}/comments`),
  ]);
  return defer({
    res,
    topicDocId: topicDocId,
  });
};

export default function TopicPage() {
  const { res, topicDocId } = useLoaderData() as LoaderData;

  return (
    <Suspense fallback={<>Loading...</>}>
      <Await resolve={res} errorElement={<>Error loading package location!</>}>
        {(res: [TopicsDoc, TopicContentsDoc, TopicCommentsDoc]) => (
          <PageLayoutTopic
            topicData={res[0].find((doc) => doc.id === topicDocId)}
            topicContents={res[1]}
            topicComments={res[2]}
          />
        )}
      </Await>
    </Suspense>
  );
}
