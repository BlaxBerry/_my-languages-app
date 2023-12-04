/* eslint-disable react-refresh/only-export-components */
import { Suspense, useCallback } from "react";
import {
  redirect,
  type LoaderFunction,
  useOutletContext,
  useNavigate,
  Await,
  defer,
  useLoaderData,
} from "react-router-dom";
import { signOut, updateProfile, type User } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { getAllDocs } from "@/libs/firebase/firestore";
import {
  getCookie,
  COOKIE_NAMES,
  removeCookie,
  decodeJWT,
} from "@/utils/tools";
import type { UserNoteDoc } from "@/types/db/notes";
import { PageLayoutProfile } from "@/layouts/pages";
import { ErrorLayout, LoadingLayout } from "@/layouts/common";

type LoaderData = {
  res: Promise<[Array<UserNoteDoc>]>;
};

export const profileLoader: LoaderFunction = async ({ request }) => {
  const { pathname } = new URL(request.url);
  const accessToken = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
  if (!accessToken) {
    return redirect(`/login?redirect_from=${pathname}`);
  }
  const jwtDecoded = decodeJWT(accessToken);
  const uid = jwtDecoded.payload.user_id;
  const res = Promise.all([getAllDocs<UserNoteDoc>(`users/${uid}/notes`)]);
  return defer({
    res,
  });
};

export default function ProfileIndex() {
  const navigate = useNavigate();
  const { res } = useLoaderData() as LoaderData;
  const { user } = useOutletContext<{ user: User | null }>();

  const logout = useCallback(() => {
    signOut(auth)
      .then(() => {
        removeCookie(COOKIE_NAMES.ACCESS_TOKEN);
        navigate("/login");
      })
      .catch((err) => {
        /* eslint-disable-next-line  no-console */
        console.log(err.code, err.message);
      });
  }, [navigate]);

  const update = useCallback(
    (params: { displayName: string; photoURL: string }) => {
      if (auth?.currentUser) {
        updateProfile(auth.currentUser, params)
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            /* eslint-disable-next-line  no-console */
            console.log(err.code, err.message);
          });
      }
    },
    [],
  );

  return (
    <Suspense fallback={<LoadingLayout message="Fetching..." />}>
      <Await
        resolve={res}
        errorElement={
          <ErrorLayout message={`profile route data loading error`} />
        }
      >
        {(res: [Array<UserNoteDoc>]) => (
          <PageLayoutProfile {...{ user, logout, update }} userNotes={res[0]} />
        )}
      </Await>
    </Suspense>
  );
}
