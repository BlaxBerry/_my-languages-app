import { createBrowserRouter } from "react-router-dom";

import Root from "@/pages/root";
import Topics, { topicsLoader } from "@/pages/topics";
import Topic, { topicLoader } from "@/pages/topics/[id]";
import About from "@/pages/about";
import Login, { loginLoader } from "@/pages/login";
import Profile, { profileLoader } from "@/pages/profile";
import Note, { noteLoader } from "@/pages/notes/[id]";
import Community from "@/pages/community";
import CommunityList from "@/pages/community/list";
import CommunityLanguage from "@/pages/community/[language]";
import ErrorRoute from "@/pages/errors/errorRoute";
import Error404 from "@/pages/errors/404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorRoute />,
    children: [
      {
        index: true,
        element: <Topics />,
        loader: topicsLoader,
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

      // topic
      {
        path: "topics",
        element: <Topics />,
        loader: topicsLoader,
      },
      {
        path: "topics/:noteID",
        element: <Topic />,
        loader: topicLoader,
      },

      // profile
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
      },

      // note
      {
        path: "notes/:noteID",
        element: <Note />,
        loader: noteLoader,
      },

      // community
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
        path: "404",
        element: <Error404 />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);
