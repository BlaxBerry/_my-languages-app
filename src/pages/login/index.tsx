import { useCallback, useState } from "react";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type AuthError,
  type User,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/libs/firebase";
import { COOKIE_NAMES, getCookie, setCookie } from "@/utils/tools";

/* eslint-disable-next-line react-refresh/only-export-components */
export async function loginLoader() {
  const accessToken = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
  if (accessToken) return redirect("/");
  return {
    accessToken,
  };
}

export default function LoginIndex() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const [errorMessage, setErrorMEssage] = useState<string>("");

  const saveCookieThenRedirect = useCallback(
    (accessToken: string) => {
      setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken);
      const redirectFrom = searchParams.get("redirect_from");
      const path = redirectFrom || "";
      navigate(path, { replace: true });
    },
    [searchParams, navigate],
  );

  const login = useCallback(() => {
    const { email, password } = formData;
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user as User & { accessToken: string };
        saveCookieThenRedirect(user.accessToken);
      })
      .catch((err) => {
        setErrorMEssage(`【${err.code}】${err.message}`);
      });
  }, [formData, saveCookieThenRedirect, setErrorMEssage]);

  const signUp = useCallback(async () => {
    const { email, password } = formData;
    try {
      // 1. create account & signIn
      const signInResult = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = signInResult.user as User & { accessToken: string };
      // 2. send verify email
      if (auth?.currentUser) {
        await sendEmailVerification(auth.currentUser);
        // 3. save cookie then navigate
        saveCookieThenRedirect(user.accessToken);
      }
    } catch (error) {
      const { code, message } = error as AuthError;
      setErrorMEssage(`【${code}】${message}`);
    }
  }, [formData, saveCookieThenRedirect, setErrorMEssage]);

  return (
    <Box>
      <Container
        maxWidth="sm"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card sx={{ py: 6, px: 4 }}>
          <Typography variant="h4" fontWeight={700} sx={{ px: 2, mb: 2 }}>
            Login
          </Typography>
          <CardContent>
            <Box component="form">
              <TextField
                size="small"
                sx={{ display: "flex", mb: 1 }}
                name="email"
                label="Email:"
                error={formData.email.trim() === ""}
                helperText={formData.email.trim() === "" ? "Required" : "　"}
                value={formData.email}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, email: e.target.value }))
                }
              />
              <TextField
                size="small"
                sx={{ display: "flex", mb: 1 }}
                name="password"
                label="Password:"
                error={formData.password.trim() === ""}
                helperText={formData.password.trim() === "" ? "Required" : "　"}
                value={formData.password}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, password: e.target.value }))
                }
              />
            </Box>

            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          </CardContent>

          <CardActions>
            <Button variant="contained" onClick={login}>
              Login
            </Button>
            <Button variant="contained" color="secondary" onClick={signUp}>
              Register
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setFormData({ email: "", password: "" })}
            >
              CLEAR
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
}
