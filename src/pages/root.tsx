import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { type User, onAuthStateChanged } from "firebase/auth";
import RootLayout from "@/layouts/rootLayout";
import { auth } from "@/libs/firebase";
import { COOKIE_NAMES, getCookie, removeCookie } from "@/utils/tools";

export default function HomeIndex() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        return;
      }

      // 正在登陆or已经登陆使用中的用户突然被超级管理员远端销户了
      const accessToken = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
      if (accessToken && user === null) {
        removeCookie(COOKIE_NAMES.ACCESS_TOKEN);
        return navigate(`/login`);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <RootLayout>
      <Outlet context={{ user }} />
    </RootLayout>
  );
}
