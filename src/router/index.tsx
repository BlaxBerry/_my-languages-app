import { createBrowserRouter } from "react-router-dom";

import Root from "@/pages/root";
import About from "@/pages/about";
import Login, { loginLoader } from "@/pages/login";
import Profile, { profileLoader } from "@/pages/profile";
import Notes, { notesLoader } from "@/pages/notes";
import Note, { noteLoader } from "@/pages/notes/[id]";
import Community from "@/pages/community";
import CommunityList, { communityListLoader } from "@/pages/community/list";
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
        element: <CommunityList />,
        loader: communityListLoader,
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

      // profile
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
      },

      // notes
      {
        path: "notes",
        element: <Notes />,
        loader: notesLoader,
      },
      // user note
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
            loader: communityListLoader,
          },
          {
            path: "list",
            element: <CommunityList />,
            loader: communityListLoader,
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
