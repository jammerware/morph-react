import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { type ApiDecompositionGetResponse } from "../../api/models/decomposition-get-response";
import { decompositionGet } from "../../api/decomposition";
import WordActionButton from "../../components/WordActionButton";

export default function Word() {
  const params = useParams<{ word: string }>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [decomposition, setDecomposition] = useState<ApiDecompositionGetResponse | null>(null);

  useEffect(() => {
    if (!params.word) {
      throw new Error("Param 'word' required");
    }

    let isLoading = true;

    decompositionGet(params.word)
      .then((result) => {
        if (isLoading) setDecomposition(result);
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
  }, [params.word]);

  const charactersMarkup =
    decomposition &&
    decomposition.characters.map((c) => (
      <dl className="flex-1" key={c.character}>
        <dt></dt>
        <dd className="text-6xl">{c.character}</dd>

        <dt></dt>
        <dd className="text-accent-content">{c.pinyin}</dd>

        <dt></dt>
        {c.definitions.map((d) => (
          <dd key={d}>{d}</dd>
        ))}

        <dt></dt>
        <dd>
          <span className="text-accent-content">{c.freqRank}</span>
          th most common character
        </dd>

        <dt></dt>
        <dd>
          <span className="text-accent-content">{c.strokeCount} </span>
          strokes
        </dd>
      </dl>
    ));

  const handleCopy = (text: string) => {
    copy(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  return (
    <>
      <title>{`${decomposition?.word?.translation ?? `Translating "${params.word}"...`}`}</title>
      <div className="card">
        <div className="card-title">
          {decomposition?.word?.l1}
          <span className="text-accent-content">{decomposition?.word?.translation}</span>
        </div>

        <div className="card-body">
          {isLoading && <progress className="progress progress-primary w-full"></progress>}

          {!isLoading && (
            <>
              <div className="flex items-center">{charactersMarkup}</div>
            </>
          )}
        </div>

        <div className="card-actions justify-end">
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
