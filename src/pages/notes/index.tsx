import { useSearchParams } from "react-router-dom";

export default function NotesIndex() {
  const [searchParams] = useSearchParams();

  /* /notes?userId=xxx&language=xxx */
  const userId = searchParams.get("userId") ?? null;
  const language = searchParams.get("language") ?? null;

  return (
    <div>
      Notes
      <div>
        userId: {userId}
        <br />
        language: {language ?? "null"}
      </div>
    </div>
  );
}
