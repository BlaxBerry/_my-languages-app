import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { type User, onAuthStateChanged } from "firebase/auth";
import RootLayout from "@/layouts/rootLayout";
import { EmptyLayout } from "@/layouts/common";
import { auth } from "@/libs/firebase";
import { COOKIE_NAMES, getCookie, removeCookie } from "@/utils/tools";
import { isMobileDevice } from "@/utils/helpers";

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

  if (isMobileDevice()) {
    return (
      <EmptyLayout
        content={
          <>
            <h1>
              <strong>Mobile Is Not Supported</strong>
            </h1>
            <h3>
              <strong>Please Use PC Device</strong>
            </h3>
            <small>Latest Update 2023.12</small>
          </>
        }
      />
    );
  }

  return (
    <RootLayout>
      <Outlet context={{ user }} />
    </RootLayout>
  );
}
