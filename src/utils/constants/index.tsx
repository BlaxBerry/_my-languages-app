import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import AccountIcon from "@mui/icons-material/AccountCircle";
import type { Language } from "@/types/client";

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
    label: "Profile",
    path: "/profile",
    icon: <AccountIcon fontSize="small" />,
  },
  {
    label: "About",
    path: "/about",
    icon: <InfoIcon fontSize="small" />,
  },
];

export const LANGUAGES: Language[] = ["en", "ja", "ko", "fr", "de", "it", "ru"];

export const MARKDOWN_EDITOR_DEFAULT_VALUE = `
Sample Text Content

# level1
## level2
### level3
#### level4
##### level5
###### level6

#
---
***

aaa
bbb
😀
&#x1f600;

**xxxxx**<br/>
*xxxxx*<br/>
~xxxxx~
> xxx

[Link](https://static1.dualshockersimages.com/wordpress/wp-content/uploads/2020/11/Genshin-Impact-Avatars.jpg)

**[Link](https://static1.dualshockersimages.com/wordpress/wp-content/uploads/2020/11/Genshin-Impact-Avatars.jpg)**

![](https://static1.dualshockersimages.com/wordpress/wp-content/uploads/2020/11/Genshin-Impact-Avatars.jpg)


- [x] xx
- [ ] xxx
- aa
- bb
  - cc
  - dd

|a |b |
|--|--|
|x |x |
|x |x |
|x |x |

`;
