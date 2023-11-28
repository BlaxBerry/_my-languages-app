import { redirect, useNavigate, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { COOKIE_NAMES, getCookie, setCookie } from "@/utils/tools";
import { useCallback } from "react";

/* eslint-disable-next-line react-refresh/only-export-components */
export async function loginLoader() {
  const accessToken = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
  if (accessToken) {
    return redirect("/");
  }

  return {
    accessToken,
  };
}

export default function LoginIndex() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const login = useCallback(() => {
    setCookie(COOKIE_NAMES.ACCESS_TOKEN, "MOCK");

    const redirectFrom = searchParams.get("redirect_from");
    const path = redirectFrom || "";
    navigate(path, { replace: true });
  }, [navigate, searchParams]);

  return (
    <div>
      Login
      <Box>
        <Button variant="contained" onClick={login}>
          Login
        </Button>
      </Box>
    </div>
  );
}
