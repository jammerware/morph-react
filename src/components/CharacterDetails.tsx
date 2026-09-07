import { Link } from "react-router";
import type { ApiCharacter } from "../api/models/character";
import Character from "./Character";
import characterGet from "../api/character";
import CharacterFrequency from "./CharacterFrequency";
import ContentLabel from "./ContentLabel";
import Loading from "./Loading";
import { translateAllPost } from "../api/translation";
import useAsync from "../hooks/useAsync";

export type CharacterDetailsProps = { character: string; fromWord?: string };

export default function CharacterDetails(props: CharacterDetailsProps) {
  const { data: character, isLoading: isLoadingCharacter } =
    useAsync<ApiCharacter>(
      () =>
        characterGet(props.character).catch(() => {
          throw new Error(
            `Couldn't load character details for ${props.character}`,
          );
        }),
      [props.character],
    );

  const { data: translations, isLoading: isLoadingTranslations } = useAsync(
    async (): Promise<Record<string, string>> => {
      if (!character) return {};

      try {
        const result = await translateAllPost({
          text: character.commonWords.map((w) => w.word),
        });
        return Object.fromEntries(
          result.translations.map((r) => [r.translation, r.l1]),
        );
      } catch (err) {
        throw new Error(
          `Couldn't load translations for ${character.character}: ${err}`,
        );
      }
    },
    [character],
  );

  const isLoading = isLoadingCharacter || isLoadingTranslations;

  const markup = {
    meanings: (
      <ul className="flex items-center gap-2">
        {(character?.definitions ?? []).map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    ),
    commonWords: (
      <ul className="flex items-center gap-2">
        {(character?.commonWords ?? []).map((w) => (
          <li key={w.word}>
            <Link className="btn btn-xsmall" to={`/word/${w.word}`}>
              <span className="text-primary">
                {w.word}

                {translations?.[w.word] && (
                  <span> ({translations[w.word]})</span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    ),
  };

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
            <dd>{markup.meanings}</dd>

            <dt className="mt-8">
              <ContentLabel text="Common Words" />
            </dt>
            <dd>{markup.commonWords}</dd>

            <dt className="mt-8">
              <ContentLabel text="Stroke Count" />
            </dt>
            <dd>{character.strokeCount}</dd>

            <dt className="mt-8">
              <ContentLabel text="Frequency" />
            </dt>
            <dd>
              <CharacterFrequency freqRank={character.freqRank} />
            </dd>
          </dl>
        </div>
      )}
    </>
  );
}
