import { useParams } from "react-router";
import AppTitle from "../../app/AppTitle";
import Word from "../../components/Word";

export default function WordRoute() {
  const params = useParams<{ word: string }>();

  return (
    <>
      <AppTitle title={params.word ?? `Translating "${params.word}"...`} />

      {params.word && <Word wordL1={params.word!} />}
    </>
  );
}
