import { useEffect, useState } from "react";
import { Link } from "react-router";
import { arrayShuffle } from "../util/array-shuffle";
import { recommendedSearchTermsGet } from "../api/recommended-search-terms";
import RotatingPrompt from "./RotatingPrompt";

export default function WordSuggester() {
  const [isLoading, setIsLoading] = useState(true);
  const [terms, setTerms] = useState<string[]>([]);

  useEffect(() => {
    let isActive = true;

    recommendedSearchTermsGet()
      .then((result) => {
        if (isActive) {
          setTerms(arrayShuffle(result));
        }
      })
      .catch(() => {
        if (isActive) throw new Error("Couldn't load recommended searches.");
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <>
      {isLoading && (
        <progress className="progress progress-primary w-full"></progress>
      )}

      {terms.length && (
        <div className="flex gap-2">
          <div className="text-3xl">Try </div>
          <RotatingPrompt className="h-10 grow">
            {terms.map((t) => (
              <Link key={t} to={`/word/${t}`} className="btn btn-primary">
                {t}
              </Link>
            ))}
          </RotatingPrompt>
        </div>
      )}
    </>
  );
}
