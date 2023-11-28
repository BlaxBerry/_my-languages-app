import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Error404Index() {
  return (
    <div>
      error 404
      <Button>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
}
