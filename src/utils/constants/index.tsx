import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/InfoOutlined";

export const CLIENT_NAVIGATION = [
  {
    label: "Home",
    path: "/",
    icon: <HomeIcon fontSize="small" />,
  },
  {
    label: "Community",
    path: "/community",
    icon: <CategoryIcon fontSize="small" />,
  },
  {
    label: "About",
    path: "/about",
    icon: <InfoIcon fontSize="small" />,
  },
];
