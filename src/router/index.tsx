import { createBrowserRouter } from "react-router-dom";

import Root from "@/pages/root";
import List, { listLoader } from "@/pages/list";
import About from "@/pages/about";
import Login, { loginLoader } from "@/pages/login";
import Profile, { profileLoader } from "@/pages/profile";
import Community from "@/pages/community";
import CommunityList from "@/pages/community/list";
import CommunityLanguage from "@/pages/community/[language]";
import Notes from "@/pages/notes";
import ErrorUnknown from "@/pages/errors/unknown";
import Error404 from "@/pages/errors/404";
import Error500 from "@/pages/errors/500";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorUnknown />,
    children: [
      {
        index: true,
        element: <List />,
        loader: listLoader,
      },
      {
        path: "list",
        element: <List />,
        loader: listLoader,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
        loader: loginLoader,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
      },

      {
        path: "community",
        element: <Community />,
        children: [
          {
            index: true,
            element: <CommunityList />,
          },
          {
            path: "list",
            element: <CommunityList />,
          },
          {
            path: ":language",
            element: <CommunityLanguage />,
          },
        ],
      },

      {
        path: "notes",
        element: <Notes />,
      },

      {
        path: "404",
        element: <Error404 />,
      },
      {
        path: "500",
        element: <Error500 />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);
