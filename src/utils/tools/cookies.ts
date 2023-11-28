import Cookies from "universal-cookie";

const cookies = new Cookies();

export const COOKIE_NAMES = {
  FIREBASE_AUTH_TOKEN: "blaxberry-dashboard-auth-token",
  ACCESS_TOKEN: "blaxberry-dashboard-access-token",
};

export const setCookie = (name: string, value: unknown) => {
  cookies.set(name, value);
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  cookies.remove(name);
};
