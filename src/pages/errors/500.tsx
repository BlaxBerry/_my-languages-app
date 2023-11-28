import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Error500Index() {
  return (
    <div>
      error 500
      <Button>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
}
