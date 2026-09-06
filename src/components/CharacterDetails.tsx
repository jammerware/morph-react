import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { ApiCharacter } from "../api/models/character";
import Character from "./Character";
import characterGet from "../api/character";
import CharacterFrequency from "./CharacterFrequency";
import ContentLabel from "./ContentLabel";
import Loading from "./Loading";

export type CharacterDetailsProps = { character: string; fromWord?: string };

export default function CharacterDetails(props: CharacterDetailsProps) {
  const [character, setCharacter] = useState<ApiCharacter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const markup = {
    meanings: (
      <ul className="flex items-center gap-2">
        {(character?.definitions ?? []).map((d) => (
          <li>{d}</li>
        ))}
      </ul>
    ),
    commonWords: (
      <ul className="flex items-center gap-2">
        {(character?.commonWords ?? []).map((w) => (
          <li>
            <Link className="btn btn-xsmall" to={`/word/${w.word}`}>
              <span className="text-primary">{w.word}</span>
            </Link>
          </li>
        ))}
      </ul>
    ),
  };

  useEffect(() => {
    let isLoading = true;

    characterGet(props.character)
      .then((result) => {
        if (isLoading) setCharacter(result);
      })
      .catch(() => {
        if (isLoading)
          throw new Error(
            `Couldn't load character details for ${props.character}`,
          );
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
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {props.fromWord && (
            <li>
              <Link to={`/word/${props.fromWord}`}>{props.fromWord}</Link>
            </li>
          )}
          <li>{props.character}</li>
        </ul>
      </div>
      <Loading isLoading={isLoading} />
      {character && (
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
          <div className="p-8">
            <Character
              character={character.character}
              pinyin={character.pinyin}
            />
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
