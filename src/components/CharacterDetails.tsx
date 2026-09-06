import { useEffect, useState } from "react";
import type { ApiCharacter } from "../api/models/character";
import Character from "./Character";
import characterGet from "../api/character";
import ContentLabel from "./ContentLabel";
import Loading from "./Loading";
import { Link } from "react-router";
import CharacterFrequency from "./CharacterFrequency";

export type CharacterDetailsProps = { character: string };

export default function CharacterDetails(props: CharacterDetailsProps) {
  const [character, setCharacter] = useState<ApiCharacter | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const markup = {
    meanings: (character?.definitions ?? []).map((d) => <dd>{d}</dd>),
    commonWords: (character?.commonWords ?? []).map((w) => (
      <dd>
        <Link className="btn btn-xsmall" to={`/word/${w.word}`}>
          {w.word}
        </Link>
      </dd>
    )),
  };

  useEffect(() => {
    let isLoading = true;

    characterGet(props.character)
      .then((result) => {
        if (isLoading) setCharacter(result);
      })
      .catch(() => {
        if (isLoading) setError("Couldn't load recommended searches.");
      })
      .finally(() => {
        if (isLoading) setIsLoading(false);
      });

    return () => {
      isLoading = false;
    };
  }, [props.character]);

  return (
    <>
      <Loading isLoading={isLoading} />
      {character && (
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
          <div className="p-8">
            <Character character={character.character} pinyin={character.pinyin} />
          </div>

          <dl className="p-8">
            <dt>
              <ContentLabel text="Meanings" />
            </dt>
            {markup.meanings}

            <dt className="mt-8">
              <ContentLabel text="Common Words" />
            </dt>
            {markup.commonWords}

            <dt className="mt-8">
              <ContentLabel text="Stroke Count" />
            </dt>
            <dd>{character.strokeCount}</dd>

            <dt className="mt-8">
              <ContentLabel text="Frequency" />
              <CharacterFrequency freqRank={character.freqRank} />
            </dt>
          </dl>
        </div>
      )}
    </>
  );
}
