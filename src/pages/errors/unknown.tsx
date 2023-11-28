import { Link, useRouteError } from "react-router-dom";
import Button from "@mui/material/Button";

export default function ErrorUnknownIndex() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>

      <p>Something wrong with react-router</p>
      <p>{(error as { error: Error })?.error?.message}</p>

      <Button>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
}
