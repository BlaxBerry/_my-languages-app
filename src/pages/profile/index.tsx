import { redirect, type LoaderFunction } from "react-router-dom";
import { getCookie, COOKIE_NAMES } from "@/utils/tools";

/* eslint-disable-next-line react-refresh/only-export-components */
export const profileLoader: LoaderFunction = ({ request }) => {
  const accessToken = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
  if (!accessToken) {
    const { pathname } = new URL(request.url);
    return redirect(`/login?redirect_from=${pathname}`);
  }

  return {
    accessToken,
  };
};

export default function ProfileIndex() {
  return <div>Profile</div>;
}
