# Personal Languages App

Personal practice, SPA based on react.

Developing...

## Tech Stacks

- [vite]() v5
- [typescript]() v5
- [react]() v18
- [react-router-dom]() v6
- [redux-toolkit]() v1
- [material ui]() v5
- [sass]() v1
- [axios]() v1
- [firebase]() v10

## Project Structure

```txt
|- public
|- src
    |- __mocks__
    |- __tests__
    |- assets
    |- components
    |- layouts
        |- common
        |- rootLayout
        |- pagesLayout
    |- libs
    |- pages
        |- [...]
            |- index.tsx
        |- root.tsx
    |- router
    |- styles
    |- types
    |- utils
        |- constants
        |- helpers
        |- hooks
        |- stores
        |- tools
|- index.html
|- ...
```

## PathNames & Pages

| pathname                                           | description                                                                                            |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `/about`                                           | About this app                                                                                         |
| `/login`                                           | Login                                                                                                  |
| `/login?redirect_from=[pathname]`                  | ( login then navigate to ( go back to ) `redirect_from` )                                              |
| `/profile`                                         | User Profile                                                                                           |
| `/topics`                                          | Popular Topics Note List                                                                               |
| `/topics/[id]`                                     | Specific Topic Note                                                                                    |
| `/topics/[id]?index=[contentIndex]authorUID=null`  | Specific Topic Note's Specific Content Note ID ( index start from 1, public note has no author's uid ) |
| `/notes/[id]?index=[contentIndex]&authorUID=[uid]` | Specific User's Specific Note                                                                          |
