import type { ApiDecompositionGetResponse } from "../api/models/decomposition-get-response";
import { Link } from "react-router";
import Character from "./Character";
import CharacterFrequency from "./CharacterFrequency";
import WordActionButton from "./WordActionButton";
import { decompositionGet } from "../api/decomposition";
import useAsync from "../hooks/useAsync";

export default function Word(props: { wordL1: string }) {
  if (!props.wordL1) {
    throw new Error("Props 'wordL1' required");
  }

  const { data: decomposition, isLoading } = useAsync<ApiDecompositionGetResponse>(
    () =>
      decompositionGet(props.wordL1).catch(() => {
        throw new Error(`Couldn't load decomposition for word "${props.wordL1}".`);
      }),
    [props.wordL1],
  );

  const charactersMarkup =
    decomposition &&
    decomposition.characters.map((c) => (
      <div className="flex-1 flex flex-col items-center" key={c.character}>
        <Link
          to={`/character/${c.character}?fromWord=${decomposition?.word?.translation}`}
          className="text-primary"
        >
          <Character character={c.character} pinyin={c.pinyin} />
        </Link>

        <ul className="flex gap-4">
          {c.definitions.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>

        <dt></dt>
        <dd>
          <span className="text-primary">
            <CharacterFrequency freqRank={c.freqRank} />{" "}
          </span>
          most common character
        </dd>

        <dt></dt>
        <dd>
          <span className="text-primary">{c.strokeCount} </span>
          strokes
        </dd>
      </div>
    ));

  return (
    <>
      <div className="card">
        <div className="card-title">
          {decomposition?.word?.translation}
          {decomposition?.word?.l1 && (
            <span className="text-base-content/60">({decomposition?.word?.l1})</span>
          )}
        </div>

        <div className="card-body">
          {isLoading && <progress className="progress progress-primary w-full"></progress>}

          {!isLoading && (
            <>
              <div className="flex">{charactersMarkup}</div>
            </>
          )}
        </div>

        <div className="card-actions justify-end pt-4">
          <div className="tooltip" data-tip="View on Google Translate">
            <Link
              to={`https://translate.google.com/?sl=zh-CN&text=${decomposition?.word?.translation}&tl=en`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-primary btn-circle material-icons">g_translate</button>
            </Link>
          </div>

          <WordActionButton
            copyText={decomposition?.word.pinyin}
            materialIcon="font_download"
            tooltip="Copy Pinyin"
          />

          <WordActionButton
            copyText={decomposition?.word.translation}
            materialIcon="content_copy"
            tooltip="Copy Characters"
          ></WordActionButton>
        </div>
      </div>
    </>
  );
}
