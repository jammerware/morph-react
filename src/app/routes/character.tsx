import { useParams, useSearchParams } from "react-router";
import CharacterDetails from "../../components/CharacterDetails";
import AppTitle from "../AppTitle";

export default function CharacterRoute() {
  const params = useParams<{ character: string }>();
  const [searchParams] = useSearchParams();

  return (
    <>
      <AppTitle title={params.character} />
      {params.character && (
        <CharacterDetails
          character={params.character}
          fromWord={searchParams.get("fromWord") || undefined}
        />
      )}
    </>
  );
}
