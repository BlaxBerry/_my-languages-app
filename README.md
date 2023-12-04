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
        |- pages
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
    |- main.tsx
    |- vite-env.d.ts
|- index.html
|- ...
```

## PathNames & Pages

| pathname                          | description                                               |
| --------------------------------- | --------------------------------------------------------- |
| `/about`                          | About this app                                            |
| `/login`                          | Login                                                     |
| `/login?redirect_from=[pathname]` | ( login then navigate to ( go back to ) `redirect_from` ) |
| `/profile`                        | Current User's Profile                                    |
| `/notes`                          | Current User's All Notes                                  |
| `/notes/[noteID]?authorUID=[uid]` | Specific User's Specific Note                             |
| `/notes/create`                   | Create A New Note                                         |
| `/community`                      | Community List                                            |
| `/community/list`                 | Community List                                            |
