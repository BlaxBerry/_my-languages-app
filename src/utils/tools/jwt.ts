interface JWTDecoded {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
}

export const decodeJWT = (jwt: string): JWTDecoded => {
  const base64URL = jwt.split(".");
  const header = JSON.parse(atob(base64URL[0]));
  const payload = JSON.parse(
    decodeURIComponent(
      escape(window.atob(base64URL[1].replace(/-/g, "+").replace(/_/g, "/"))),
    ),
  );
  return { header, payload };
};

function escape(str: string) {
  return str.replace(/[^a-zA-Z0-9@*_+\-./]/g, (m) => {
    const code = m.charCodeAt(0);
    if (code <= 0xff) {
      return "%" + ("00" + code.toString(16)).slice(-2).toUpperCase();
    } else {
      return "%u" + ("0000" + code.toString(16)).slice(-4).toUpperCase();
    }
  });
}
