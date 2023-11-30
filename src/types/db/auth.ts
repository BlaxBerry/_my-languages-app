export interface AccessTokenDecoded {
  [key: string]: string;

  /* uid */
  user_id: string;
}

/*
{
    "name": "BlaxBerry",
    "picture": "https://upload-os-bbs.mihoyo.com/upload/2021/01/29/91203388/92df49b186f1f7de589fedfd6b41b4af_465665552097978013.jpg",
    "iss": "https://securetoken.google.com/blaxberry-languages-app",
    "aud": "blaxberry-languages-app",
    "auth_time": 1701326487,
    "user_id": "81tWZuOAXTXSIpec7gbj0ySmu0b2",
    "sub": "81tWZuOAXTXSIpec7gbj0ySmu0b2",
    "iat": 1701326487,
    "exp": 1701330087,
    "email": "2647323828@qq.com",
    "email_verified": false,
    "firebase": {
      "identities": {
        "email": [
          "2647323828@qq.com"
        ]
      },
      "sign_in_provider": "password"
    }
}
*/
