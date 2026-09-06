import { useParams } from "react-router";
import CharacterDetails from "../../components/CharacterDetails";

export default function CharacterRoute() {
  const params = useParams<{ character: string }>();

  return <>{params.character && <CharacterDetails character={params.character} />}</>;
}
