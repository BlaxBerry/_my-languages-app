import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { AxiosInstanceOthers } from "@/libs/httpClient";

type LoaderData = {
  res: Promise<Array<object>>;
};

/* eslint-disable-next-line react-refresh/only-export-components */
export async function listLoader() {
  const res = AxiosInstanceOthers.get(
    "https://api.github.com/users/BlaxBerry/repos",
  );

  return defer({
    res: res,
    // resNotDeferred: await res,
  });
}

export default function ListIndex() {
  const { res } = useLoaderData() as LoaderData;

  return (
    <Suspense fallback={<>Loading...</>}>
      <Await resolve={res} errorElement={<>Error loading package location!</>}>
        {(res) => (
          <>
            <div>ListIndex</div>
            <div>{res.data.length}</div>
          </>
        )}
      </Await>
    </Suspense>
  );
}
