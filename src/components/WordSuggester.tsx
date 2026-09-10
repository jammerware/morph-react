import { Link } from "react-router";
import { arrayShuffle } from "../util/array-shuffle";
import { recommendedSearchTermsGet } from "../api/recommended-search-terms";
import RotatingPrompt from "./RotatingPrompt";
import useAsync from "../hooks/useAsync";

export default function WordSuggester() {
  const { data: terms, isLoading } = useAsync(
    () =>
      recommendedSearchTermsGet()
        .then(arrayShuffle)
        .catch(() => {
          throw new Error("Couldn't load recommended searches.");
        }),
    [],
  );

  return (
    <>
      {isLoading && <progress className="progress progress-primary w-full"></progress>}

      {terms && terms.length > 0 && (
        <div className="flex gap-2">
          <div className="text-3xl">Try </div>
          <RotatingPrompt className="h-10 grow">
            {terms.map((t) => (
              <Link key={t} to={`/word/${t}`} className="btn btn-primary">
                <span className="text-primary-content">{t}</span>
              </Link>
            ))}
          </RotatingPrompt>
        </div>
      )}
    </>
  );
}
