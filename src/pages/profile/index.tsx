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
import {
  getCookie,
  COOKIE_NAMES,
  removeCookie,
  decodeJWT,
} from "@/utils/tools";
import { PageLayoutProfile } from "@/components/layouts";
import { getAllDocs } from "@/libs/firebase/firestore";
import type { NoteDoc } from "@/types/db/notes";

type LoaderData = {
  res: Promise<[NoteDoc[], NoteDoc[], NoteDoc[]]>;
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const profileLoader: LoaderFunction = async ({ request }) => {
  const { pathname } = new URL(request.url);
  const accessToken = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
  if (!accessToken) {
    return redirect(`/login?redirect_from=${pathname}`);
  }
  const jwtDecoded = decodeJWT(accessToken);
  const uid = jwtDecoded.payload.uid;
  const res = Promise.all([
    getAllDocs(`users/${uid}/notes`),
    getAllDocs(`users/${uid}/notes`),
  ]);
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
    <Suspense fallback={<>Loading...</>}>
      <Await resolve={res} errorElement={<>Error loading package location!</>}>
        {(res) => <PageLayoutProfile {...{ user, logout, update, res }} />}
      </Await>
    </Suspense>
  );
}
