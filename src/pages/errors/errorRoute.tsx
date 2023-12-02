import { useRouteError } from "react-router-dom";
import { ErrorLayout } from "@/components/layouts";

export default function ErrorRouteIndex() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <ErrorLayout
        message={
          <>
            <strong>react-router</strong> has error.
          </>
        }
        subMessage={(error as { error: Error })?.error?.message}
      />
    </div>
  );
}
