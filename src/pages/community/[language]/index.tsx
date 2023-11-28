import { Link, useParams } from "react-router-dom";

export default function CommunityLanguageIndex() {
  const { language } = useParams();

  return (
    <div>
      language: {language}
      <br />
      <Link to={`/notes?userId=xxx&language=${language}`}>Mr xxx note</Link>
    </div>
  );
}
